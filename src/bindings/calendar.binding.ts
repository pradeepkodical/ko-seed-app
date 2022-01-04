import * as ko from 'knockout';
import { Calendar, DatesSetArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';


export class CalendarBinding {
    static register() {

        ko.bindingHandlers['calendar-binding'] = {
            init: (elm: any, va: () => {
                events: ko.ObservableArray<any>;
                eventClick: (evt: any) => void;
                onDateRangeChange: (start: Date, end: Date) => void;
            }, all: () => any, vm: any) => {
                const v = va();
                const calendar = new Calendar($(elm)[0], {
                    themeSystem: 'bootstrap',
                    plugins: [dayGridPlugin, bootstrapPlugin],
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth'
                    },
                    dayMaxEvents: true, // allow "more" link when too many events
                    eventClick: (info: EventClickArg) => {
                        if (v.eventClick) {
                            v.eventClick(info.event.toJSON());
                        }
                    },
                    datesSet: (arg: DatesSetArg) => {
                        if (v.onDateRangeChange) {
                            v.onDateRangeChange(arg.start, arg.end);
                        }
                    }
                });
                calendar.render();
                ko.utils.domNodeDisposal.addDisposeCallback(elm, () => {
                    calendar.destroy();
                });

                v.events.subscribe((value: Array<any>) => {
                    calendar.removeAllEventSources();
                    calendar.addEventSource({
                        events: value
                    });
                    calendar.refetchEvents();
                });
            },
            update: (elm: any, va: () => any, all: () => any, vm: any) => {
                //$(elm).val(va());
            }
        };

    }
}