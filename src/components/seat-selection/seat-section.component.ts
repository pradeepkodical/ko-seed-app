import * as ko from 'knockout';
import { HelperUtil } from '../../HelperUtil';

import { SeatContainer, SectionContainer } from './SectionContainer';

export class SeatSectionComponent {

  startNumber: ko.Observable<number> = ko.observable<number>(1);
  seatsInRow: ko.Observable<string> = ko.observable<string>('');
  allSeats: ko.ObservableArray<Array<SeatContainer>> = ko.observableArray<Array<SeatContainer>>([]);

  selectedSeat: ko.Observable<SeatContainer | null> = ko.observable<SeatContainer | null>(null);
  section: ko.Observable<SectionContainer | null> = ko.observable(null);
  onCancel: () => void = () => { };

  constructor(params: { section: ko.Observable<SectionContainer | null>, onCancel: () => void }) {
    this.section = params.section;
    this.onCancel = params.onCancel;
    this.seatsInRow('9, 9, 10, 10, 10');
    const rows: Array<Array<SeatContainer>> = [];

    this.section()?.seats().forEach(x => {
      if (!rows[x.row()]) rows[x.row()] = new Array<SeatContainer>();
      rows[x.row()].push(x);
    });
    this.allSeats(rows);
  }

  updateSeats() {
    let seatNo = this.startNumber();
    const allArr: Array<Array<SeatContainer>> = [];
    const allSeats: Array<SeatContainer> = [];
    const seats = this.seatsInRow().split(',').map(x => parseInt(x))
    seats.forEach((x: number, r: number) => {
      const arr: Array<SeatContainer> = [];
      for (let j = 1; j <= x; j++) {
        const seatContainer = new SeatContainer({ number: `${seatNo}`, row: r + 1, column: j, available: true });

        arr.push(seatContainer);
        allSeats.push(seatContainer);
        seatNo++;
      }
      allArr.push(arr);
    })
    this.allSeats(allArr);
    this.section()!.seats(allSeats);
  }

  onSelectSeat(seat: SeatContainer) {
    this.selectedSeat(seat);
  }

  static register() {
    HelperUtil.register('seat-section', {
      viewModel: SeatSectionComponent,
      template: `
    <style>
    .main-seats{
      height: 100%;
      display: flex;
      position: relative;
      flex-direction: column;
      background-color: #eee;
    }
    .main-seats .main-toolbar {
        padding: 15px 5px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

    .main-seats .main-toolbar > * {
        margin-left: 5px;
      }
    .main-seats .main-content {
        height: calc(100% - 80px);
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
    .main-seats .seat{
        width: 40px;
        height: 40px;
        border: 2px solid #eee;
        margin: 2px;
        cursor: pointer;
        background: #dcf5ff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    .main-seats .seat:hover{
        border-color: rgba(0, 0, 0, 0.54);
        background: rgb(78, 166, 250);
      }
    .main-seats .seat-unavailable,
    .main-seats .seat-unavailable:hover{
        border-color: #aaa;
        background: #bbb;
      }
      .main-seats .seat input{
        text-align: center;
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;
      }
    </style>
    <div class="main-seats">
      <div class="main-toolbar">
        <div class="form-inline">
            <div class="form-group">
              <input
                class="form-control"
                data-bind="value: startNumber"
                placeholder="Seat Start number"
                type="number"
                style="width: 100px"
              />
            </div>
            <div class="form-group">
              <input
                class="form-control"
                data-bind="value: seatsInRow"
                placeholder="Seats in rows"
              />
            </div>
            <button
              class="btn btn-primary btn-sm"
              data-bind="click: updateSeats"
            >
              Update Seats
            </button>            
        </div>
        <div style="flex: 1;"></div>
        <div class="form-inline" style="flex: 1;">
          <div class="form-group"
               style="width: 100%; display: flex; align-items: center;"
               data-bind="with: section">
            <span data-bind="text: name" class="p-l"></span>

            <input
              class="form-control"
              data-bind="value: footNote"
              placeholder="Foot notes"
              style="flex: 1"           
            />
          </div>
        </div>
        <button class="btn btn-primary btn-sm" data-bind="click: onCancel">X</button>
      </div>
      <div class="main-content">
        <div class="main-canvas"
            data-bind="foreach: allSeats">          
            <div style="display: flex; flex-wrap: nowrap" data-bind="foreach: $data">
              <div class="seat"
                data-bind="click: $component.onSelectSeat.bind($component),
                           css: {'seat-unavailable': !$data.available()}">
                           <input data-bind="value: $data.number"/>
              </div>
            </div>
        </div>
        <div class="main-properties">
          <div data-bind="with: selectedSeat">
            <div class="form-group">
              <label>Seat No:</label>
              <input class="form-control" data-bind="value: number"/>
            </div>
            <div class="form-group">
              <label>Available:</label>
              <input type="checkbox" data-bind="checked: available"/>
            </div>
          </div>
        </div>
      </div>
    </div>
`
    })
  }
}


