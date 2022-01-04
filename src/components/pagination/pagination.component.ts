import * as ko from 'knockout';
import { HelperUtil } from '../../HelperUtil';
import './pagination.css';

export class PaginationComponent {
    rowsPerPage: ko.Observable<number> = ko.observable<number>(5);
    pageSizes: ko.ObservableArray<number> = ko.observableArray<number>([]);
    itemsLabel: ko.Computed<string>;
    constructor(params: {
        rowsPerPage: number;
        pageSizes: Array<number>
    }) {
        this.rowsPerPage(params.rowsPerPage);
        this.pageSizes(params.pageSizes || [5, 10, 25, 50]);
        this.itemsLabel = ko.pureComputed(() => {
            return `${this.rowsPerPage()}`;
        });
    }

    static register() {
        return HelperUtil.register('app-pagination', {
            viewModel: PaginationComponent,
            template: `         
                    <div class="app-pagination">
                        <span>Rows per page</span>
                        <select class="form-select" 
                                data-bind="value: rowsPerPage, options: pageSizes">
                        </select>
                        <span data-bind="text: itemsLabel"></span>
                        <button class="btn btn-primary">
                            <i class="bi bi-arrow-left-short"></i>
                        </button>
                        <button class="btn btn-primary">
                        <i class="bi bi-arrow-right-short"></i>
                        </button>
                    </div>                    
        `});
    }
}

