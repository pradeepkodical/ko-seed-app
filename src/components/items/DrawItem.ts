import { Rectangle } from "../shapes/Rectangle";
import { Point } from "./Point";

export abstract class DrawItem {
    static idx: number = 1;
    items: Array<DrawItem> = [];
    moving: boolean = false;
    visible: boolean = true;
    selected: boolean = false;
    boundingBox: Rectangle | null = null;
    id: number = 0;
    constructor() {
        this.id = DrawItem.idx++;
    }

    setMoving() {
        this.moving = true;
        this.items.forEach((item) => item.setMoving());
    }
    setVisible(visible: boolean) {
        this.visible = visible;
    }
    setSelected(selected: boolean) {
        this.selected = selected;
    }
    drawBoundingbox(ctx: CanvasRenderingContext2D) {
        const rect = this.getBoundingBox();
        if (rect) {
            const l = ctx.strokeStyle;
            const lw = ctx.lineWidth;
            ctx.strokeStyle = "green";
            ctx.lineWidth = 0.8;
            ctx.rect(rect.x1, rect.y1, rect.x2 - rect.x1, rect.y2 - rect.y1);
            ctx.stroke();
            ctx.strokeStyle = l;
            ctx.lineWidth = lw;
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        if (this.visible) {
            this.items.forEach((item) => item.draw(ctx));
        }
    }
    move(deltaX: number, deltaY: number) {
        this.items.forEach((item) => item.move(deltaX, deltaY));
        this.moving = false;
        this.boundingBox = null;
        return this;
    }
    rotate(center: Point, angle: number) {
        this.items.forEach((item) => item.rotate(center, angle));
        this.moving = false;
        this.boundingBox = null;
        return this;
    }

    getHit(x: number, y: number): DrawItem | null {
        for (let a of this.items) {
            const h = a.getHit(x, y);
            if (h) {
                return h;
            }
        }
        return null;
    }

    hit(x: number, y: number) {
        if (this.visible) {
            this.items.forEach((item) => item.hit(x, y));
        }
    }

    getBoundingBox(): Rectangle | null {
        if (this.items.length > 0 && !this.boundingBox) {
            const rect = this.items[0].getBoundingBox()?.clone();
            this.items.forEach((i) => {
                if (rect) {
                    rect.merge(i.getBoundingBox());
                }
            });
            this.boundingBox = rect || null;
        }
        return this.boundingBox;
    }

    toObject(): Array<any> | any {
        return this.items.map(x => x.toObject());
    }
}