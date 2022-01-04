import * as ko from 'knockout';
import { HelperUtil } from '../../HelperUtil';
import { Menu, menu } from '../../menu';
import './side-nav.css';

export class SideNavComponent {

    menu: ko.ObservableArray<Menu> = ko.observableArray<Menu>([]);
    size: ko.Observable<number>;

    constructor(params: {
        url: ko.Observable<string>;
        size: ko.Observable<number>
    }) {

        menu.forEach(m => {
            m.opened = ko.observable(false);
            m.selected = ko.observable(false);
            m.menu?.forEach(cm => {
                cm.selected = ko.observable(false);
            })
        });

        this.menu(menu);

        params.url.subscribe(url => {
            this.selectMenu(url, this.menu());
        });
        this.selectMenu(params.url(), this.menu());
        this.size = params.size;
    }

    selectMenu(url: string, menu: Array<Menu>, mainMenu?: Menu) {
        menu.forEach(x => {
            if (x.selected) {
                x.selected(false);
                if (x.menu) {
                    x.menu?.forEach(y => {
                        if (y.selected) {
                            y.selected(false);
                        }
                    })
                }
            }
            if (x.link && x.link.indexOf(url) >= 0) {
                if (mainMenu && mainMenu.selected) {
                    mainMenu.selected(true);
                    if (mainMenu.opened) {
                        mainMenu.opened(true);
                    }
                }
                if (x.selected) x.selected(true);
            }
            if (x.menu) {
                this.selectMenu(url, x.menu, x);
            }
        });
    }

    toggleMenu(menu: Menu) {

        if (menu.menu) {
            this.menu().forEach(m => { if (m.opened && m !== menu) { m.opened(false) } });
            if (menu.opened) {
                menu.opened(!menu.opened());
            }
        } else if (menu.link) {
            window.location.hash = menu.link;
        }
    }

    static register() {

        HelperUtil.register('side-nav', {
            viewModel: SideNavComponent,
            template: `      
                <div class="side-nav-container">
                    <div
                        class="navbar navbar-light bg-light">
                        <h2>Helios KO</h2>
                    </div>
                    <div class="accordion accordion-flush" data-bind="foreach: menu">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" 
                                        type="button"
                                        data-bind="click: $component.toggleMenu.bind($component, $data), 
                                                    css: { 
                                                        collapsed: !opened(), 
                                                        'cannot-open': !$data.menu,
                                                        'text-light bg-primary': (!$data.menu && selected())
                                                    }">
                                    <div class="main-menu-header">
                                        <i data-bind="css: $data?.icon"></i>
                                        <span class="px-2" data-bind="text: title"></span>
                                    </div>
                                </button>
                            </h2>
                            <div class="accordion-collapse collapse" data-bind="if: $data?.menu, css: {show: opened()}">
                                <div class="accordion-body p-0">
                                    <div class="list-group" data-bind="foreach: menu">                                    
                                        <a class="list-group-item list-group-item-action ps-5 border-0" 
                                            data-bind="text: title, attr: {href: link}, css: {active: selected()}"></a>                                    
                                    </div>
                                </div>
                            </div>
                        </div>                    
                    </div>
                </div>
        `});
    }
}


