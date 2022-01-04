import { Section, Point } from "../items";
import { SelectionTool } from "./SelectionTool";

export class MoveTool extends SelectionTool {
    lastPoint: any;
    move: boolean = false;
    constructor(meshes: Array<Section>) {
        super(meshes);
        this.name = 'Move Section';
    }
    draw(ctx: CanvasRenderingContext2D): void {
    }

    onMouseDown(event: MouseEvent) {
        super.onMouseDown(event);
        this.lastPoint = this.getMouseCoordinates(event);
        if (this.selectedSection) {
            this.move = this.selectedSection.getBoundingBox()?.contains(this.lastPoint.x, this.lastPoint.y) || false;
        }
    }
    onMouseUp(event: MouseEvent) {
        this.lastPoint = undefined;
        super.onMouseUp(event);
    }
    onMouseMove(event: MouseEvent) {
        if (this.move && this.lastPoint) {
            const cPoint = this.getMouseCoordinates(event);
            if (this.selectedSection) {
                this.selectedSection.move(cPoint.x - this.lastPoint.x, cPoint.y - this.lastPoint.y);
            }
            this.lastPoint = cPoint;
            return true;
        }
        return false;
    }
}