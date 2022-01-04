import { Point } from "../items";
import { MouseSelectionTool } from "./MouseSelectionTool";

export class MouseZoomPanTool extends MouseSelectionTool {
    dragStart: any;
    dragPoint: any;
    dragging: boolean = false;

    constructor() {
        super();
        this.name = 'Pan/Zoom';
    }

    draw(ctx: CanvasRenderingContext2D) {
    }

    onMouseWheel(event: WheelEvent) {
        const p = this.getMouseCoordinates(event);
        const zoom = event.deltaY < 0 ? 1.1 : 0.9;
        this.ctx?.translate(p.x, p.y);
        this.ctx?.scale(zoom, zoom);
        this.ctx?.translate(-p.x, -p.y);
        const t = this.ctx?.getTransform();
        this.ctx!.font = `${11 / (t?.a || 1)}px Verdana`;
        event.preventDefault();
    }

    onMouseDown(event: MouseEvent) {
        this.dragging = true;
        this.dragPoint = this.dragStart = this.getMouseCoordinates(event);
    }
    onMouseUp(event: MouseEvent) {
        this.dragging = false;
    }
    onMouseMove(event: MouseEvent) {
        if (this.dragging) {
            const p = this.getMouseCoordinates(event);
            this.dragPoint = p;
            this.ctx?.translate((p.x - this.dragStart.x), (p.y - this.dragStart.y));
            return true;
        }
        return false;
    }
}