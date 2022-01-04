import { SeatSectionDTO } from './../../SeatServices';
import * as ko from 'knockout';

import { SeatSectionsViewComponent } from './seat-sections-view.component';
import { SeatSectionViewComponent } from './seat-section-view.component';
import { SeatServices } from '../../SeatServices';
import { HelperUtil } from '../../HelperUtil';

export class SeatSelectionViewComponent {

  sections: ko.ObservableArray<SeatSectionDTO> = ko.observableArray<SeatSectionDTO>([]);
  selectedSection: ko.Observable<SeatSectionDTO | null> = ko.observable(null);
  imageUrl: ko.Observable<string> = ko.observable('');

  eventId: ko.Observable<string> = ko.observable('');
  sessionId: ko.Observable<string> = ko.observable('');

  constructor() {

    SeatServices.getSeatSelection().then(obj => {
      this.sections(obj.sections);
      this.imageUrl(obj.imageUrl);
      this.eventId(obj.eventId);
      this.sessionId(obj.sessionId);
    });

    setTimeout(() => {

      var allGroups = $("svg > g");

      allGroups.on("click", function () {
        allGroups.removeClass("on");
        $(this).addClass("on");
      });

    }, 1000)
  }

  onShowSection(section: any) {
    this.selectedSection(section);
  }

  onShowSections() {
    this.selectedSection(null);
  }

  static registerPage() {

    SeatSectionsViewComponent.register();
    SeatSectionViewComponent.register();

    return HelperUtil.registerPage('seat-selection-view', {
      viewModel: SeatSelectionViewComponent,
      template: `
      
    <style>
        .seat-selection,
        .seat-selection > div {
          height: 100%;
        }
      </style>
    <div class="seat-selection">
      <!--ko ifnot: selectedSection -->
      <seat-sections-view
          params="sections: sections,
                  imageUrl: imageUrl,
                  eventId: eventId,
                  sessionId: sessionId,
                  onShowSection: onShowSection.bind($data)"></seat-sections-view>
      <!--/ko-->      

      <!--ko if: selectedSection -->
        <seat-section-view
          params="section: selectedSection,
                  eventId: eventId,
                  sessionId: sessionId,
                  onCancel: onShowSections.bind($data)"></seat-section-view>
      <!--/ko-->
    </div>
`
    })
  }
}


