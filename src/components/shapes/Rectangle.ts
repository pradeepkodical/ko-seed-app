export class Rectangle {
    x1: number = 0;
    y1: number = 0;
    x2: number = 0;
    y2: number = 0;

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    clone() {
        return new Rectangle(this.x1, this.y1, this.x2, this.y2);
    }

    merge(rect: Rectangle | null) {
        if (rect) {
            this.x1 = Math.min(this.x1, rect.x1);
            this.y1 = Math.min(this.y1, rect.y1);
            this.x2 = Math.max(this.x2, rect.x2);
            this.y2 = Math.max(this.y2, rect.y2);
        }
        return this;
    }

    contains(x: number, y: number) {
        return (this.x1 <= x && this.x2 >= x && this.y1 <= y && this.y2 >= y);
    }
}