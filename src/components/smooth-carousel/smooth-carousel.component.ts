import * as ko from 'knockout';
import { HelperUtil } from '../../HelperUtil';
import './smooth-carousel.css';

export class SmoothCarouselComponent {

    items: ko.ObservableArray<any> = ko.observableArray<any>([]);
    transitioning: ko.Observable<boolean> = ko.observable<boolean>(false);
    selectedIndex: ko.Observable<number> = ko.observable<number>(0);
    constructor() {
        const items = [{
            imgUrl: 'https://helioseventstoreprodv1.blob.core.windows.net/profilepictures/03e9b06a-7564-495c-8d7a-a8ed014c7e84_Main?u=0'
        }, {
            imgUrl: 'https://helioseventstoreprodv1.blob.core.windows.net/profilepictures/c8afb3f1-e8e4-4c33-aa90-a8ed0173cadb_Main?u=0'
        }, {
            imgUrl: 'https://helioseventstoreprodv1.blob.core.windows.net/profilepictures/64670df4-d0ee-4604-90c2-a8ed01583547_Main?u=0'
        }, {
            imgUrl: 'https://helioseventstoreprodv1.blob.core.windows.net/profilepictures/f619024b-c25c-4cb5-ba40-a8ed015ef96a_Main?u=0'
        }, {
            imgUrl: 'https://helioseventstoreprodv1.blob.core.windows.net/profilepictures/6be5e687-c3f0-4de9-8105-a8ed0165e27d_Main?u=2'
        }, {
            imgUrl: 'https://helioseventstoreprodv1.blob.core.windows.net/profilepictures/03e9b06a-7564-495c-8d7a-a8ed014c7e84_Main?u=0'
        }, {
            imgUrl: 'https://helioseventstoreprodv1.blob.core.windows.net/profilepictures/c8afb3f1-e8e4-4c33-aa90-a8ed0173cadb_Main?u=0'
        }, {
            imgUrl: 'https://helioseventstoreprodv1.blob.core.windows.net/profilepictures/64670df4-d0ee-4604-90c2-a8ed01583547_Main?u=0'
        }, {
            imgUrl: 'https://helioseventstoreprodv1.blob.core.windows.net/profilepictures/f619024b-c25c-4cb5-ba40-a8ed015ef96a_Main?u=0'
        }, {
            imgUrl: 'https://helioseventstoreprodv1.blob.core.windows.net/profilepictures/6be5e687-c3f0-4de9-8105-a8ed0165e27d_Main?u=2'
        }, {
            imgUrl: 'https://helioseventstoreprodv1.blob.core.windows.net/profilepictures/03e9b06a-7564-495c-8d7a-a8ed014c7e84_Main?u=0'
        }, {
            imgUrl: 'https://helioseventstoreprodv1.blob.core.windows.net/profilepictures/c8afb3f1-e8e4-4c33-aa90-a8ed0173cadb_Main?u=0'
        }, {
            imgUrl: 'https://helioseventstoreprodv1.blob.core.windows.net/profilepictures/64670df4-d0ee-4604-90c2-a8ed01583547_Main?u=0'
        }, {
            imgUrl: 'https://helioseventstoreprodv1.blob.core.windows.net/profilepictures/f619024b-c25c-4cb5-ba40-a8ed015ef96a_Main?u=0'
        }, {
            imgUrl: 'https://helioseventstoreprodv1.blob.core.windows.net/profilepictures/6be5e687-c3f0-4de9-8105-a8ed0165e27d_Main?u=2'
        }];

        items.forEach((x: any) => {
            //x.left = ko.observable(0);
            //x.zIndex = ko.observable(0);
            x.active = ko.observable(false);
        });

        this.items(items);
        this.updatePositions();
    }

    selectItem(item: any) {
        this.selectedIndex(this.items.indexOf(item));
        this.items().forEach(x => x.active(false));
        item.active(true);
    }

    updatePositions() {
        //let left = 0;
        const items = this.items();
        items.forEach((x: any, i: number) => {
            //x.left(left);
            //x.zIndex(left);
            x.active(i === this.selectedIndex());
            //left += 110;
        });
    }

    moveLeft() {
        if (this.transitioning()) return;
        if (this.selectedIndex() - 1 > 0) {
            this.selectedIndex(this.selectedIndex() - 1);
        }
        //this.items().push(this.items().splice(0, 1)[0]);
        this.updatePositions();
    }

    moveRight() {
        if (this.transitioning()) return;
        if (this.selectedIndex() + 1 < this.items().length) {
            this.selectedIndex(this.selectedIndex() + 1);
        }
        //this.items().unshift(this.items().pop());
        this.updatePositions();
    }

    transitionstart() {
        this.transitioning(true);
    }

    transitionend() {
        this.transitioning(false);
    }

    static register() {
        HelperUtil.register('smooth-carousel', {
            viewModel: SmoothCarouselComponent,
            template: `      
                <div class="smooth-carousel-container panel">
                    <div class="left-handle">
                        <button class="btn btn-outline-primary" 
                                data-bind="click: $component.moveLeft.bind($component)">
                            <i class="bi bi-arrow-left-circle"></i>
                        </button>                        
                    </div>
                    <div style="flex: 1; overflow-x: auto;">                        
                            <div class="smooth-carousel" data-bind="foreach: items">
                                <div class="smooth-carousel-item" 
                                    data-bind="css: {'active': active},
                                            click: $component.selectItem.bind($component, $data),
                                            event: {
                                                    'transitionstart': $component.transitionstart.bind($component),
                                                    'transitionend': $component.transitionend.bind($component)
                                                }">
                                    <div class="img">
                                        <img data-bind='attr: {src: imgUrl}'/>
                                    </div>
                                </div>
                            </div>                        
                    </div>
                    <div class="right-handle">
                        <button class="btn btn-outline-primary" 
                                data-bind="click: $component.moveRight.bind($component)">
                            <i class="bi bi-arrow-right-circle"></i>
                        </button>                        
                    </div>
                </div>
            `});
    }
}


