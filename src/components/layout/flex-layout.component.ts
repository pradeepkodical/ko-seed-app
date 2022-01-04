import * as ko from 'knockout';
import { HelperUtil } from '../../HelperUtil';
import { SideNavComponent } from './side-nav.component';
import './flex-layout.css';

export class FlexLayoutComponent {

    collapsed: ko.Observable<boolean> = ko.observable<boolean>(false);
    size: ko.Observable<number> = ko.observable(0);
    url: ko.Observable<string>;
    constructor(params: { url: ko.Observable<string> }) {
        window.addEventListener('resize', () => {
            this.size(window.innerWidth);
            this.collapsed((window.innerWidth < 768));
        });

        this.url = params.url;
        this.size(window.innerWidth);
        this.collapsed((window.innerWidth < 768));
    }

    onContentClick() {
        if (this.size() < 768) {
            this.collapsed(true);
        }
    }

    toggleMenu(src: any, evt: any) {
        this.collapsed(!this.collapsed());
        evt.stopPropagation();
    }

    static register() {

        SideNavComponent.register();

        HelperUtil.register('flex-main-layout', {
            viewModel: FlexLayoutComponent,
            template: `      
                <div class="main-layout" data-bind="css: {collapsed: collapsed}">
                    <div class="main-overlay" data-bind="click: onContentClick"></div>
                    <div class="main-sidenav">
                        <div class="sidenav">
                            <side-nav params="url: url, size: size"></side-nav>
                        </div>
                    </div>
                    <div class="main-container" data-bind="click: onContentClick">                        
                        <div class="main-header navbar navbar-light bg-light"
                                style="backdrop-filter: blur(6px)">                                
                            <button class="btn btn-primary btn-sm" data-bind="click: toggleMenu">
                                <i class="bi bi-list"></i>
                            </button>                            
                            <div style="flex: 1"></div>
                            <a href='#/logout'>Logout</a>
                        </div>
                        
                        <div class="main-content">
                            <div data-bind="template: { nodes: $componentTemplateNodes, data: $data }"></div>
                        </div>
                        <footer>
                            <div style="text-align: center; padding: 15px 5px;">
                                <span>
                                    © 2021 by Renatus, LLC. All rights reserved. 
                                    2011-2021 | 1312 W 75 N Centerville, UT 84014 | 
                                </span>
                                <span><a href="mailto:customerservice@myrenatus.com">customerservice@myrenatus.com</a> | </span>
                                <span>(801) 701-7337 Weekdays 8:30am-5pm MST</span>
                            </div>
                        </footer>
                    </div>
                </div>
        `});
    }
}


