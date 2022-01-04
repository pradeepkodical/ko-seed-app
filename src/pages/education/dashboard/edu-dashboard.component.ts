import * as ko from 'knockout';
import { HelperUtil } from '../../../HelperUtil';


export class EducationDashboardComponent {

    items: ko.ObservableArray<number> = ko.observableArray<number>([]);
    constructor() {
        this.items([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    }

    static registerPage() {

        return HelperUtil.registerPage('education-dashboard-page', {
            viewModel: EducationDashboardComponent,
            template: `      
                <style>
                    .dashboard-container{
                        width: 100%;
                        display: grid;
                        grid: auto / 1fr 1fr;   
                        
                    }
                    .item {                        
                        padding: 5px;
                        overflow: hidden;
                    }
                </style>
                <div class="app-page-container">                    
                    <div class="app-page-container-header">Course Library</div>
                    <div class="app-page-container-body">
                        <div class="dashboard-container" data-bind="foreach: items">
                            <div class="item">
                                <div class="card shadow-sm bg-body rounded">
                                    <div class="card-body">
                                        <h5 data-bind="text: $data">Card title</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="card-link">Card link</a>
                                        <a href="#" class="card-link">Another link</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            `});
    }
}
