import * as ko from 'knockout';

import { SeatSectionDTO } from '../../SeatServices';
import { HelperUtil } from '../../HelperUtil';

export class SeatSectionsViewComponent {

  items: ko.ObservableArray<SeatSectionDTO> = ko.observableArray<SeatSectionDTO>([]);
  imageUrl: ko.Observable<string> = ko.observable('');
  onShowSection: (item: any) => void;

  constructor(params: {
    sections: ko.ObservableArray<SeatSectionDTO>;
    imageUrl: ko.Observable<string>;
    onShowSection: (item: any) => void
  }) {

    this.items = params.sections;
    this.imageUrl = params.imageUrl;

    this.onShowSection = params.onShowSection;

    setTimeout(() => {

      var allGroups = $("svg > g");

      allGroups.on("click", function () {
        allGroups.removeClass("on");
        $(this).addClass("on");
      });

    }, 1000)
  }

  selectSection(section: SeatSectionDTO) {
    this.onShowSection(section);
  }

  getString(items: any) {
    let s = '';
    items.forEach((p: any) => {
      s += `${p.x},${p.y} `
    });
    return s;
  }

  getLocation(items: any) {

    const xMin = items.reduce((p: number, c: any) => Math.min(p, c.x), 10000);
    const yMin = items.reduce((p: number, c: any) => Math.min(p, c.y), 10000);
    const xMax = items.reduce((p: number, c: any) => Math.max(p, c.x), -10000);
    const yMax = items.reduce((p: number, c: any) => Math.max(p, c.y), -10000);

    return {
      x: `${xMin + (xMax - xMin) / 2}px`,
      y: `${yMin + (yMax - yMin) / 2}px`
    };
  }

  static register() {
    HelperUtil.register('seat-sections-view', {
      viewModel: SeatSectionsViewComponent,
      template: `
      <style>
        svg {          
          width: 100%;
          height: 100%;
          background-color: #fff;
          background-repeat: no-repeat;
        }
        .on {
          stroke: blue;
          stroke-width: 1;
        }
        svg g:hover polygon{          
          stroke: blue;
          stroke-width: 3;
        }        
      </style>
      <svg data-bind="style: {'background-image': 'url(' + imageUrl() + ')'}">
          <!-- ko foreach: items -->
            <g data-bind='click: $component.selectSection.bind($component, $data)'>
              <polygon data-bind="attr: {points: $component.getString($data.points)}" style="fill: #1ab394; opacity: 0.5;" />
              <text fill="blue"
                    dominant-baseline="middle"
                    text-anchor="middle"
                    data-bind="attr: $component.getLocation($data.points), text: $data.title"></text>
            </g>
          <!-- /ko -->
      </svg>
`
    })
  }
}


