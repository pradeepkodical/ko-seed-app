import * as ko from 'knockout';
import { CalendarBinding } from '../../bindings/calendar.binding';
import { HelperUtil } from '../../HelperUtil';
import './calendar.css';

export class CalendarComponent {
    events: ko.ObservableArray<any>;
    eventClick: (evt: any) => void;
    onDateRangeChange: (start: Date, end: Date) => void
    constructor(params: {
        events: ko.ObservableArray<any>;
        eventClick: (evt: any) => void;
        onDateRangeChange: (start: Date, end: Date) => void;
    }) {
        this.events = params.events;
        this.eventClick = params.eventClick;
        this.onDateRangeChange = params.onDateRangeChange;
    }

    static register() {
        CalendarBinding.register();
        return HelperUtil.register('calendar', {
            viewModel: CalendarComponent,
            template: `      
                <div class="cal-container">
                    <div data-bind="calendar-binding: {
                        events: events,
                        eventClick: eventClick,
                        onDateRangeChange: onDateRangeChange
                    }"></div>
                </div>
            `});
    }
}
