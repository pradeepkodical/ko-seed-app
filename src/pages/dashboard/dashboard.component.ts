import * as ko from 'knockout';
import { HelperUtil } from '../../HelperUtil';
import { SmoothCarouselComponent } from '../../components/smooth-carousel/smooth-carousel.component';
import './dashboard.css';

export class DashboardComponent {

    items: ko.ObservableArray<number> = ko.observableArray<number>([]);
    constructor() {
        this.items([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    }

    static registerPage() {
        SmoothCarouselComponent.register();

        return HelperUtil.registerPage('dashboard-page', {
            viewModel: DashboardComponent,
            template: `
                <div class="app-page-container">                    
                    <div class="app-page-container-header">Sticky</div>
                    <div class="app-page-container-body" >
                        <div class="dashboard-container" data-bind="foreach: items">
                            <div class="item">
                                <smooth-carousel></smooth-carousel>
                            </div>
                        </div>
                    </div>
                </div>                
            `});
    }
}
