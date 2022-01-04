import * as ko from 'knockout';
import { CalendarComponent } from '../../../components/calendar/calendar.component';

import { HelperUtil } from '../../../HelperUtil';
import { BasePageComponent } from '../../BasePageComponent';
import { CalDashboardServices } from './cal-dashboard.services';
import './cal-dashboard.css';

export class CalendarDashboardComponent extends BasePageComponent {
    events: ko.ObservableArray<any> = ko.observableArray<any>([]);
    constructor(params: any) {
        super(params.data);

        setTimeout(() => {
            this.events([{
                title: 'ICM Event', start: new Date()
            }, {
                title: 'Nationals Event', start: new Date()
            }]);

        }, 1000);
    }

    eventClick(info: any) {
        console.log(info);
    }

    onDateRangeChange(start: Date, end: Date) {
        CalDashboardServices.getItemsAsync(start, end).then(result => {
            this.events(result);
        });
    }

    static registerPage() {

        CalendarComponent.register();

        return HelperUtil.registerPage('calendar-dashboard-page', {
            viewModel: CalendarDashboardComponent,
            template: `      
                <div class="app-page-container">                    
                    <div class="app-page-container-header">Sticky</div>
                    <div class="app-page-container-body" >
                        <calendar params="events: events, 
                                      eventClick: $component.eventClick.bind($component),
                                      onDateRangeChange: $component.onDateRangeChange.bind($component)">
                        </calendar>
                    </div>
                </div>
            `});
    }
}
