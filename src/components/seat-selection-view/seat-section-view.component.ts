import { SeatServices } from './../../SeatServices';
import * as ko from 'knockout';
import { SeatDTO, SeatSectionDTO } from '../../SeatServices';
import { SeatContainer } from '../seat-selection/SectionContainer';
import { HelperUtil } from '../../HelperUtil';

export class SeatSectionViewComponent {

  section: ko.Observable<SeatSectionDTO>;
  selectedSeats: ko.ObservableArray<SeatContainer> = ko.observableArray<SeatContainer>([]);
  allSeats: ko.ObservableArray<Array<SeatContainer>> = ko.observableArray<Array<SeatContainer>>([]);
  onCancel: () => void;
  constructor(params: { section: ko.Observable<SeatSectionDTO>, onCancel: () => void }) {
    this.onCancel = params.onCancel;
    this.section = params.section;
    const rows: Array<Array<SeatContainer>> = [];
    params.section().seats.forEach((x: SeatDTO) => {
      if (!rows[x.row]) rows[x.row] = new Array<SeatContainer>();
      rows[x.row].push(SeatContainer.fromObject(x));
    });
    this.allSeats(rows);
  }

  goBack() {
    this.onCancel();
  }

  onSelectSeat(seat: SeatContainer) {
    SeatServices.reserveSeat({ eventId: '', sessionId: '', seatNo: seat.number() }).then(result => {
      seat.available(false);
      seat.reservationId(result.seatReservationId);
      this.selectedSeats.push(seat);
    });
  }

  doRemove(seat: SeatContainer) {
    SeatServices.releaseSeat({ seatReservationId: seat.reservationId() }).then(result => {
      seat.available(true);
      this.selectedSeats.remove(seat);
    });
  }

  static register() {
    HelperUtil.register('seat-section-view', {
      viewModel: SeatSectionViewComponent,
      template: `
      <style>
        .main-seats {
          height: 100%;
        }
        .main-seats .main-toolbar {
          padding: 15px 5px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .main-seats .main-content {
          height: calc(100% - 40px);
          flex: 1;
          position: relative;
          background: #fff;
        }

      .main-seats .main-canvas {
          overflow: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: calc(100% - 300px);
          padding: 10px;
        }
      .main-seats .main-properties{
        border: 1px solid #dedede;
          padding: 0 5px;
          overflow: auto;
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          height: 100%;
      }
      .main-seats .seat {
        width: 40px;
        height: 40px;
        border: 1px solid #eee;
        margin: 1px;
        cursor: pointer;
        
        display: flex;
        justify-content: center;
        align-items: center;
        border-color: #aaa;
        background: #bbb;
        padding: 2px;
        border-radius: 5px;
      }
      .main-seats .seat:hover {
        background: #ccf5ff;
        border-color: rgba(0, 0, 0, 0.54);        
      }
      .main-seats .seat-available {
        background: #1ab394;
        color: #fff;
        border-color: #aaa;
      }
      .main-seats .seat-img {
        border: 3px solid #eee;
        border-radius: 5px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      </style>
      <div class="main-seats">
        <div class="main-toolbar">
          <button class="btn btn-primary btn-sm" data-bind="click: $component.goBack.bind($component)">Go Back</button>
        </div>
        <div class="main-content" >          
          <div class="main-canvas"          >
              <div data-bind="with: section">
                <h3 class="text-center" data-bind='text: footNote'></h3>
              </div>
              <div data-bind="foreach: allSeats" style="display: flex; flex-direction: column; align-items: center;">
                <div style="display: flex; flex-wrap: nowrap" data-bind="foreach: $data">
                  <div class="seat"
                    data-bind="css: {'seat-available': $data.available},
                              click: $component.onSelectSeat.bind($component, $data)">
                    <div class="seat-img" data-bind="text: $data.number"></div>
                  </div>
                </div>
              </div>
          </div>
          <div class="main-properties">
            <div data-bind="foreach: selectedSeats">
              <button
                class="btn btn-close btn-danger btn-sm"
                data-bind="click: $component.doRemove.bind($component)">
                  <span data-bind="text: $data.number()"></span>
                  <i class="glyphicon glyphicon-remove"></i>
                </button>
            </div>
          </div>
        </div>
      </div>
      `
    })
  }
}


