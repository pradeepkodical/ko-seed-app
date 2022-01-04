import * as ko from 'knockout';
import { HelperUtil } from '../../../HelperUtil';
import { DataGridComponent } from './../../../components/data-grid/data-grid.component';


export class OrdersDashboardComponent {

    constructor() {


    }

    static registerPage() {

        DataGridComponent.register();

        return HelperUtil.registerPage('orders-dashboard-page', {
            viewModel: OrdersDashboardComponent,
            template: `      
                <style>
                    .orders-dashboard-container{
                        width: 100%;
                        display: grid;
                        grid: 1fr / 1fr; 
                    }
                </style>
                <div class="app-page-container">                    
                    <div class="app-page-container-header">Sticky</div>
                    <div class="app-page-container-body" >
                        <div class="orders-dashboard-container">
                            <data-grid params="">
                            </data-grid>
                        </div>
                    </div>
                </div>                                
            `});
    }
}
