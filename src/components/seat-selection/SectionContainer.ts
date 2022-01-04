import * as ko from 'knockout';
import { SeatDTO, SeatSectionDTO } from '../../SeatServices';
import { Point, Section } from '../items';

export class SeatContainer {
    number: ko.Observable<string> = ko.observable('0');
    row: ko.Observable<number> = ko.observable(0);
    column: ko.Observable<number> = ko.observable(0);
    available: ko.Observable<boolean> = ko.observable(false);

    reservationId: ko.Observable<string> = ko.observable('');

    constructor(seat: SeatDTO) {
        this.number(`${seat.number}`);
        this.row(seat.row);
        this.column(seat.column);
        this.available(seat.available === true);
    }

    toObject(): SeatDTO {
        return {
            number: this.number(),
            row: this.row(),
            column: this.column(),
            available: this.available()
        }
    }

    static fromObject(model: SeatDTO): SeatContainer {
        return new SeatContainer(model);
    }
}

export class SectionContainer {
    visible: ko.Observable<boolean> = ko.observable(true);
    selected: ko.Observable<boolean> = ko.observable(false);
    name: ko.Observable<string> = ko.observable('');
    footNote: ko.Observable<string> = ko.observable('');
    seats: ko.ObservableArray<SeatContainer> = ko.observableArray<SeatContainer>([]);

    constructor(public section: Section, seats: Array<SeatContainer>) {
        this.name(section.text);
        this.footNote('');
        this.name.subscribe(v => {
            this.section.text = v;
        })
        this.visible.subscribe(v => {
            this.section.visible = v;
        })
        this.selected.subscribe(v => {
            this.section.selected = v;
        })
        seats.forEach(seat => {
            this.seats.push(seat)
        })

    }
    toObject(): SeatSectionDTO {
        return {
            title: this.name(),
            footNote: this.footNote(),
            seats: this.seats().map(x => x.toObject()),
            points: this.section.items.map(x => {
                const p = x as Point;
                return {
                    x: parseFloat(p.x.toFixed(2)),
                    y: parseFloat(p.y.toFixed(2))
                };
            })
        }
    }

    static fromObject(model: SeatSectionDTO): SectionContainer {

        const points = model.points.map(p => new Point(p.x, p.y));
        const section = new Section(points, model.title);
        const seats = model.seats.map(s => SeatContainer.fromObject(s));
        const obj = new SectionContainer(section, seats);
        obj.footNote(model.footNote || '');

        return obj;
    }
}

export interface SeatSelectionContainer {
    imageUrl?: string;
    sections: Array<SectionContainer>;
}

