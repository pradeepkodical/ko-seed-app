import * as ko from 'knockout';
import { HelperUtil } from '../../HelperUtil';

import { SeatSectionDTO, SeatSelectionDTO, SeatServices } from './../../SeatServices';
import { SeatSectionComponent } from './seat-section.component';
import { SeatSectionsComponent } from './seat-sections.component';
import { SectionContainer } from './SectionContainer';

export class SeatSelectionComponent {

  imageUrl: ko.Observable<string> = ko.observable('');
  sections: ko.ObservableArray<SectionContainer> = ko.observableArray<SectionContainer>([]);
  selectedSection: ko.Observable<SectionContainer | null> = ko.observable(null);
  seatSelection: SeatSelectionDTO = {
    imageUrl: '',
    sections: [],
    eventId: '',
    sessionId: ''
  };

  constructor() {
    setTimeout(() => {
      this.loadLast();
    }, 100)
  }

  onShowSection(section: SectionContainer) {
    this.selectedSection(section);
  }

  onShowSections() {
    this.selectedSection(null);
  }

  onSaveAll() {
    SeatServices.saveSeatSelection({
      ...this.seatSelection,
      sections: this.sections().map(s => s.toObject()),
      imageUrl: this.imageUrl()
    });
  }

  loadLast() {
    SeatServices.getSeatSelection().then(obj => {
      this.seatSelection = obj;
      this.imageUrl(obj.imageUrl || 'http://localhost:1234/seatingcircularchart.png');
      this.sections(obj.sections.map((x: SeatSectionDTO) => SectionContainer.fromObject(x)));
    });
  }

  static registerPage() {

    SeatSectionsComponent.register();
    SeatSectionComponent.register();


    return HelperUtil.registerPage('seat-selection', {
      viewModel: SeatSelectionComponent,
      template: `
      <style>
        .seat-selection-editor,
        .seat-selection-editor > div {
          height: 100%;
        }
      </style>
    <div class="seat-selection-editor">
      <!--ko ifnot: selectedSection -->
        <seat-sections params="sections: sections,
                              imageUrl: imageUrl,
                              onShowSection: onShowSection.bind($data),
                              onSaveAll: onSaveAll.bind($data)"></seat-sections>
      <!--/ko-->

      <!--ko if: selectedSection -->      
        <seat-section params="section: selectedSection, onCancel: onShowSections.bind($data)"></seat-section>
      <!--/ko-->
    </div>
`})
  }
}


