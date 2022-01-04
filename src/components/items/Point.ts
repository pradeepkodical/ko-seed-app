import { Rectangle } from "../shapes/Rectangle";
import { DrawItem } from "./DrawItem";

export class Point extends DrawItem {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        const l = ctx.strokeStyle;
        ctx.strokeStyle = "pink";
        const d = this.selected ? 5 : 0.5;
        ctx.rect(this.x - d, this.y - d, 2 * d, 2 * d);
        if (this.selected) {
            ctx.strokeStyle = "blue";
        }
        ctx.stroke();

        ctx.strokeStyle = l;
    }
    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    getBoundingBox(): Rectangle {
        return new Rectangle(this.x, this.y, this.x, this.y);
    }

    hit(x: number, y: number) {
        this.setSelected(this.getHit(x, y) === this);
    }

    getHit(x: number, y: number) {
        if (
            this.x >= x - 5 &&
            this.x <= x + 5 &&
            this.y >= y - 5 &&
            this.y <= y + 5
        )
            return this;
        return null;
    }

    move(deltaX: number, deltaY: number) {
        if (this.moving) {
            this.x += deltaX;
            this.y += deltaY;
        }
        return super.move(deltaX, deltaY);
    }

    rotate(center: Point, radians: number) {
        if (this.moving) {
            const x = this.x;
            const y = this.y;
            const cx = center.x;
            const cy = center.y;

            const
                cos = Math.cos(radians),
                sin = Math.sin(radians);
            const nx = cos * (x - cx) + sin * (y - cy) + cx;
            const ny = cos * (y - cy) - sin * (x - cx) + cy;
            this.x = nx;
            this.y = ny;
        }
        return super.rotate(center, radians);
    }

    toObject() {
        return {
            id: this.id,
            type: this.constructor.name,
            data: {
                x: this.x.toFixed(2),
                y: this.y.toFixed(2)
            }
        }
    }
}