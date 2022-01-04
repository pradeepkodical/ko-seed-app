import { Section, Point } from "../items";
import { SelectionTool } from "./SelectionTool";


export class PointSelectionTool extends SelectionTool {
    lastPoint: Point | null = new Point(0, 0);
    constructor(meshes: Array<Section>) {
        super(meshes);
        this.name = 'Move Corners';
    }
    draw(ctx: CanvasRenderingContext2D): void {
    }
    onMouseDown(event: MouseEvent) {
        super.onMouseDown(event);
        if (this.selectedSection) {
            const p = this.getMouseCoordinates(event);
            this.lastPoint = this.selectedSection.getHit(p.x, p.y) as Point;
            if (this.lastPoint) {
                this.lastPoint.selected = true;
            }
        }
    }
    onMouseUp(event: MouseEvent) {
        if (this.lastPoint) {
            this.lastPoint.selected = false;
        }
        this.lastPoint = null;
        super.onMouseUp(event);
    }
    onMouseMove(event: MouseEvent) {
        const p = this.getMouseCoordinates(event);
        if (this.lastPoint && this.selectedSection) {
            this.lastPoint.x = p.x;
            this.lastPoint.y = p.y;
            return true;
        }
        return false;
    }
}