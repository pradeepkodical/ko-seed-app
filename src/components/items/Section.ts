import { MouseSelectionTool } from "../mouseTools";
import { DrawItem } from "./DrawItem";
import { Point } from "./Point";

export class Section extends DrawItem {
    center: Point = new Point(0, 0);
    text: string = "";
    tool: MouseSelectionTool | null = null;

    constructor(points: Array<Point>, text: string) {
        super();
        points.forEach(p => this.items.push(p));
        this.text = text;
    }

    setMouseTool(tool: MouseSelectionTool) {
        this.setSelected(true);
        this.tool = tool;
        this.resetCenter();
    }

    resetCenter() {
        const rect = this.getBoundingBox();
        if (rect) {
            this.center.set(
                rect.x1 + (rect.x2 - rect.x1) / 2,
                rect.y1 + (rect.y2 - rect.y1) / 2
            );
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        super.draw(ctx);

        if (this.items.length > 0) {
            ctx.strokeStyle = 'blue';
            ctx.fillStyle = "rgba(200, 200, 100, 0.5)";

            ctx.beginPath();
            ctx.moveTo((this.items[0] as Point).x, (this.items[0] as Point).y);

            this.items.forEach(di => {
                const p = di as Point;
                if (p) {
                    ctx.lineTo(p.x, p.y);
                }
            });

            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }

        ctx.fillStyle = "red";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        const rect = this.getBoundingBox();
        if (rect) {
            const x = rect.x1 + (rect.x2 - rect.x1) / 2;
            const y = rect.y1 + (rect.y2 - rect.y1) / 2;
            ctx.fillText(this.text, x, y);
        }

        if (this.selected) {
            this.drawBoundingbox(ctx);
        }

        ctx.restore();
    }

    move(deltaX: number, deltaY: number) {
        this.center.setMoving();
        this.center.move(deltaX, deltaY);
        super.setMoving();
        return super.move(deltaX, deltaY);
    }

    rotate(center: Point, angle: number) {
        this.center.setMoving();
        this.center.rotate(center, angle);
        super.setMoving();
        return super.rotate(center, angle);
    }

    toObject() {
        return {
            id: this.id,
            type: this.constructor.name,
            data: {
                text: this.text,
                items: super.toObject()
            }
        }
    }

    static create(corners: number) {
        const points = Array<Point>();
        const center = new Point(0, 0);
        const alpha = 2 * Math.PI / Math.max(corners, 3);

        for (let i = 0; i < 2 * Math.PI; i += alpha) {
            const p = new Point(50, 50);
            p.setMoving();
            p.rotate(center, i);
            console.log(i);
            console.log(`${p.x}, ${p.y}`);
            points.push(p);
        }

        const section = new Section(points, '<New Section>');
        section.center = center;
        section.resetCenter();
        return section;
    }
}

