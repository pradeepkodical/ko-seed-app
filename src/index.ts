import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import * as ko from 'knockout';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { SeatSelectionViewComponent } from './components/seat-selection-view/seat-selection-view.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FlexLayoutComponent } from './components/layout/flex-layout.component';
import { EducationDashboardComponent } from './pages/education/dashboard/edu-dashboard.component';
import { CourseLibraryComponent } from './pages/education/course-library/course-library.component';
import { CalendarDashboardComponent } from './pages/calendar/dashboard/cal-dashboard.component';
import { OrdersDashboardComponent } from './pages/orders/dashboard/order-dashboard.component';


FlexLayoutComponent.register();

class RootComponent {
    template: ko.Observable<string> = ko.observable('tplLoading');
    data: ko.Observable<any> = ko.observable({});
    url: ko.Observable<string> = ko.observable('');
    screenWidth: ko.Observable<number> = ko.observable(0);
    constructor() {
        window.addEventListener('resize', () => {
            this.screenWidth(window.innerWidth);
        });
        this.screenWidth(window.innerWidth);
    }
}

const viewModel = new RootComponent();

const app = $.sammy(function (context: Sammy.EventContext) {
    const app: Sammy.Application = this;
    app.get('#/', function () {
        context.redirect('#/dashboard');
    });
    app.get('#/dashboard', function () {
        viewModel.template(DashboardComponent.registerPage());
    });
    app.get('#/education/dashboard', () => {
        viewModel.template(EducationDashboardComponent.registerPage());
    });
    app.get('#/education/courselibrary', () => {
        viewModel.template(CourseLibraryComponent.registerPage());
    });

    app.get('#/calendar/dashboard', () => {
        viewModel.template(CalendarDashboardComponent.registerPage());
    });

    app.get('#/orders/dashboard', () => {
        viewModel.template(OrdersDashboardComponent.registerPage());
    });


    app.get('#/seatseditor', function () {
        viewModel.template(SeatSelectionComponent.registerPage());
    });
    app.get('#/seatsviewer', function () {
        viewModel.template(SeatSelectionViewComponent.registerPage());
    });
    app.notFound = () => {
        viewModel.url(window.location.hash);
        viewModel.template(DashboardComponent.registerPage());
    };
    app.before(() => {
        viewModel.url(window.location.hash);
    });
    viewModel.url(window.location.hash);
});

app.run('#/dashboard');

//pager.extendWithPage(viewModel);
ko.applyBindings(viewModel, $('body')[0]);
