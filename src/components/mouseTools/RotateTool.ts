import { Section, Point } from "../items";
import { SelectionTool } from "./SelectionTool";

export class RotateTool extends SelectionTool {
    lastPoint: any;
    constructor(meshes: Array<Section>) {
        super(meshes);
        this.name = 'Rotate Section';
    }
    draw(ctx: CanvasRenderingContext2D): void {
        const ss = ctx.strokeStyle;
        const fs = ctx.fillStyle;
        if (this.selectedSection) {
            if (this.lastPoint) {
                ctx.beginPath();
                ctx.strokeStyle = "green";
                const p1 = this.selectedSection.center;
                const p2 = this.lastPoint;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
            this.selectedSection.center.draw(ctx);

            if (this.lastPoint) {
                ctx.fillStyle = "red";
                ctx.strokeStyle = "orange";
                const angle = this.angleBetween(this.selectedSection.center, this.lastPoint);
                ctx.arc(this.selectedSection.center.x, this.selectedSection.center.y, 50, 0, angle);
                ctx.stroke();


                ctx.fillText(
                    `${Math.ceil((angle * 180) / Math.PI)}°`,
                    this.lastPoint.x,
                    this.lastPoint.y
                );
            }
        }
        ctx.fillStyle = fs;
        ctx.strokeStyle = ss;
    }

    onMouseDown(event: MouseEvent) {
        super.onMouseDown(event);
        this.lastPoint = this.getMouseCoordinates(event);
    }
    onMouseUp(event: MouseEvent) {
        this.lastPoint = undefined;
        super.onMouseUp(event);
    }
    angleBetween(p1: any, p2: any) {
        const deltaX = p2.x - p1.x;
        const deltaY = p2.y - p1.y;

        let angle = Math.atan2(deltaY, deltaX);

        if (angle > Math.PI) {
            angle -= 2 * Math.PI;
        } else if (angle <= -Math.PI) {
            angle += 2 * Math.PI;
        }
        return angle;
    }
    onMouseMove(event: MouseEvent) {
        if (this.lastPoint && this.selectedSection) {
            const cPoint = this.getMouseCoordinates(event);

            const a1 = this.angleBetween(this.selectedSection.center, cPoint);
            const a2 = this.angleBetween(this.selectedSection.center, this.lastPoint);
            this.selectedSection.rotate(this.selectedSection.center, a2 - a1);
            this.lastPoint = cPoint;
            return true;
        }
        return false;
    }
}
