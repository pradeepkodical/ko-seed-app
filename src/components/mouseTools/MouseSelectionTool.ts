import { Point } from "../items";

export abstract class MouseSelectionTool {

    name: string = '';
    type: string = '';

    ctx: CanvasRenderingContext2D | null = null;

    abstract onMouseDown(event: MouseEvent): void;
    abstract onMouseUp(event: MouseEvent): void;
    abstract onMouseMove(event: MouseEvent): boolean;
    abstract onMouseWheel(event: WheelEvent): void;
    abstract draw(ctx: CanvasRenderingContext2D): void;

    constructor() {
        this.type = `${this.constructor.name}`;
    }

    getTransformedPoint(x: number, y: number) {
        if (this.ctx) {
            const transform = this.ctx.getTransform();
            const inverseZoom = 1 / transform.a;

            const transformedX = inverseZoom * x - inverseZoom * transform.e;
            const transformedY = inverseZoom * y - inverseZoom * transform.f;
            return { x: transformedX, y: transformedY };
        }
        return { x, y };
    }

    getMouseCoordinates(event: MouseEvent): { x: number, y: number } {
        return this.getTransformedPoint(event.offsetX, event.offsetY);
    }

    set2DContext(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }
}
