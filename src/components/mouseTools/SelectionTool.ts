import { Section, Point } from "../items";
import { MouseSelectionTool } from "./MouseSelectionTool";

export abstract class SelectionTool extends MouseSelectionTool {
    selectedSection: Section | null = null;
    onSectionSelected: (section: Section | null) => void = (section: Section | null) => { };
    constructor(private sections: Array<Section>) {
        super();
    }
    draw(ctx: CanvasRenderingContext2D): void {
    }

    isPointInside(points: Array<Point>, testPoint: Point) {
        let i, j, c = false;
        for (i = 0, j = points.length - 1; i < points.length; j = i++) {
            if (((points[i].y > testPoint.y) != (points[j].y > testPoint.y)) &&
                (testPoint.x < (points[j].x - points[i].x) * (testPoint.y - points[i].y) / (points[j].y - points[i].y) + points[i].x))
                c = !c;
        }
        return c;
    }

    onMouseDown(event: MouseEvent) {
        const p = this.getMouseCoordinates(event);
        this.sections.forEach(x => x.setSelected(false));

        for (let section of this.sections) {
            if (section.visible) {
                if (section.getBoundingBox()?.contains(p.x, p.y)) {
                    if (this.isPointInside(section.items.map(x => x as Point), new Point(p.x, p.y))) {
                        section.setMouseTool(this);
                        this.selectedSection = section;
                        if (this.onSectionSelected) {
                            this.onSectionSelected(section);
                        }
                        break;
                    }
                }
            }
        }
        if (this.selectedSection) {
            this.selectedSection.setSelected(true);
        }
    }
    onMouseUp(event: MouseEvent) {
        if (this.selectedSection) {
            this.selectedSection.boundingBox = null;
            this.selectedSection.resetCenter();
        }
    }
    onMouseWheel(event: WheelEvent) {
    };

    abstract onMouseMove(event: MouseEvent): boolean;
}