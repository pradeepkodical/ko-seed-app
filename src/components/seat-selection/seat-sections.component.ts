import * as ko from 'knockout';

import { Section } from "../items";
import {
  MouseSelectionTool,
  PointSelectionTool,
  MoveTool,
  RotateTool,
  MouseZoomPanTool,
  SelectionTool
} from "../mouseTools";
import { SectionContainer } from './SectionContainer';
import { HelperUtil } from '../../HelperUtil';

export class SeatSectionsComponent {

  ctx: CanvasRenderingContext2D | null = null;

  onShowSection: (section: SectionContainer) => void = () => { };
  onSaveAll: () => void = () => { };
  selectionTool: ko.Observable<MouseSelectionTool | null> = ko.observable(null);

  selectedSection: ko.Observable<Section | null> = ko.observable(null);

  sections: ko.ObservableArray<SectionContainer> = ko.observableArray<SectionContainer>([]);
  imageUrl: ko.Observable<string> = ko.observable('');
  corners: ko.Observable<number> = ko.observable(4);

  background: any;


  constructor(params: {
    sections: ko.ObservableArray<SectionContainer>,
    imageUrl: ko.Observable<string>,
    onSaveAll: () => void,
    onShowSection: (section: SectionContainer) => void
  }) {

    this.sections = params.sections;
    this.imageUrl = params.imageUrl;
    this.onShowSection = params.onShowSection;
    this.onSaveAll = params.onSaveAll;

    const canvas = document.getElementById("game") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    this.ctx = ctx;

    canvas.width = $('.main-canvas').width() || 800;
    canvas.height = $('.main-canvas').height() || 600;

    canvas.addEventListener("mousedown", (event) => {
      if (this.selectionTool()) {
        this.selectionTool()?.onMouseDown(event);
        this.redraw();
      }
    });
    canvas.addEventListener("mousemove", (event) => {
      if (this.selectionTool()) {
        if (this.selectionTool()?.onMouseMove(event)) {
          this.redraw();
        }
      }
    });
    canvas.addEventListener("mouseup", (event) => {
      if (this.selectionTool()) {
        this.selectionTool()?.onMouseUp(event);
        this.redraw();
      }
    });

    canvas.addEventListener("wheel", (event) => {
      if (this.selectionTool()) {
        this.selectionTool()?.onMouseWheel(event);
        this.redraw();
      }
    });

    setTimeout(() => {
      this.loadImage(this.imageUrl())
      setTimeout(() => this.redraw(), 100);
      this.selectMoveTool();
    }, 100);

    this.imageUrl.subscribe(() => {
      this.loadImage(this.imageUrl())
      setTimeout(() => this.redraw(), 100);
      this.selectMoveTool();
    });
  }

  loadImage(url: string) {
    const ctx = this.ctx;
    const img = new Image();
    this.background = img;
    img.src = url;
    // Make sure the image is loaded first otherwise nothing will draw.
    img.onload = function () {
      ctx!.clearRect(0, 0, ctx!.canvas.clientWidth, ctx!.canvas.clientHeight);
      ctx!.globalAlpha = 0.2;
      ctx!.drawImage(img, 0, 0);
      ctx!.globalAlpha = 1;
    };

    this.background = img;
  }

  redraw() {
    requestAnimationFrame(() => {
      this.ctx!.save();
      this.ctx!.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx!.clearRect(0, 0, this.ctx!.canvas.clientWidth, this.ctx!.canvas.clientHeight);
      this.ctx!.restore();

      this.ctx!.globalAlpha = 0.2;
      this.ctx!.drawImage(this.background, 0, 0);
      this.ctx!.globalAlpha = 1;
      this.sections().forEach(mesh => {
        if (mesh.visible()) { mesh.section.draw(this.ctx!) }
      });
      this.selectionTool()?.draw(this.ctx!);
    });
  }

  clearSelection() {
    this.sections().forEach(mesh => mesh.selected(false));
  }

  selectTool(tool: MouseSelectionTool) {
    this.selectionTool(tool);
    tool.set2DContext(this.ctx!);
    this.redraw();
  }

  selectSectionTool(tool: SelectionTool) {
    tool.onSectionSelected = (mesh: Section | null) => {
      this.selectedSection(mesh);
    };
    this.selectTool(tool);
  }

  selectVertexTool() {
    this.ctx!.canvas.style.cursor = 'crosshair';
    this.selectSectionTool(new PointSelectionTool(this.sections().map(x => x.section)));
  }

  selectMoveTool() {
    this.ctx!.canvas.style.cursor = 'move';
    this.selectSectionTool(new MoveTool(this.sections().map(x => x.section)));
  }


  selectRotateTool() {
    this.ctx!.canvas.style.cursor = 'move';
    this.selectSectionTool(new RotateTool(this.sections().map(x => x.section)));
  }

  selectPanTool() {
    this.ctx!.canvas.style.cursor = 'grab';
    this.selectTool(new MouseZoomPanTool());
  }

  cloneSection(section: SectionContainer) {
    const newSection = SectionContainer.fromObject(section.toObject())
    if (newSection) {
      newSection.section.setMoving();
      const rect = newSection.section.getBoundingBox();
      if (rect) {
        newSection.section.move(rect.x2 - rect.x1, 0);
      }
      this.sections().forEach(x => x.section.setSelected(false));
      this.sections.push(newSection);
      this.selectMoveTool();
      newSection.section.setSelected(true);
      this.selectedSection(newSection.section);
    }
  }

  zoomReset() {
    this.ctx?.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx?.scale(1, 1);
    this.ctx!.font = `${11}px Verdana`;
    this.redraw();
  }

  deleteSection(section: SectionContainer) {
    this.sections.remove(section);
    this.redraw();
  }

  createNewSection() {
    this.sections.push(new SectionContainer(Section.create(this.corners()).move(100, 100), []));
    this.redraw();
    this.selectMoveTool();
  }

  selectSection(section: SectionContainer) {
    this.sections().forEach(s => s.selected(false));
    section.selected(true);
    this.selectedSection(section.section);
    this.redraw();
  }

  showSection(section: SectionContainer) {
    this.onShowSection(section);
  }

  saveAll() {
    this.onSaveAll();
  }

  static register() {
    HelperUtil.register('seat-sections', {
      viewModel: SeatSectionsComponent,
      template: `
    <style>
      .main-container {
        height: 100%;
        display: flex;
        position: relative;
        flex-direction: column;
        background-color: #eee;
      }
      .main-toolbar {
        padding: 15px 5px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .main-toolbar > * {
        margin-left: 5px;
      }

      .main-content {
        height: 100%;
        flex: 1;
        position: relative;
      }
      .main-canvas {
        overflow: auto;
        border: 1px solid #dedede;
        height: 100%;
        width: calc(100% - 250px);
        position: relative;
      }
      .main-layers {
        border: 1px solid #dedede;
        padding: 0 5px;
        overflow: auto;
        position: absolute;
        top: 0;
        right: 0;
        width: 250px;
        height: 100%;
      }
      .layer-item {
        display: flex;
        align-items: center;
        padding: 5px;
      }
      .layer-item input,
      .layer-item .btn {
        margin-left: 2px;
      }
      .active-section {
        background: rgb(7, 214, 241);
      }
    </style>
    <div class="main-container">
      <div class="main-toolbar">
        <div class="form-inline">
          <div class="form-group">
            <input
              class="form-control"
              type="number"
              data-bind="value: corners"
              placeholder="Section corners"
            />
          </div>          
          <button
            class="btn btn-primary btn-sm"
            data-bind="click: createNewSection"
          >
            Create Section
          </button>
        </div>

        <button
          class="btn btn-success btn-sm"
          data-bind="click: selectVertexTool, css: {active: selectionTool()?.type === 'PointSelectionTool'}"
        >
          <i class="glyphicon glyphicon-record"></i>
          Move Corners
        </button>
        <button
          class="btn btn-success btn-sm"
          data-bind="click: selectMoveTool, css: {active: selectionTool()?.type === 'MoveTool'}"
        >
          <span class="glyphicon glyphicon-move"></span> Move Section
        </button>
        <button
          class="btn btn-success btn-sm"
          data-bind="click: selectRotateTool, css: {active: selectionTool()?.type === 'RotateTool'}"
        >
          <span class="glyphicon glyphicon-refresh"></span>
          Rotate Section
        </button>

        <div class="btn-group">
          <button
            class="btn btn-success btn-sm"
            data-bind="click: selectPanTool, css: {active: selectionTool()?.type === 'MouseZoomPanTool'}"
          >
            <span class="glyphicon glyphicon-zoom-in"></span> Pan
          </button>
          <button class="btn btn-default btn-sm" data-bind="click: zoomReset">
            Reset
          </button>
        </div>

        <button class="btn btn-info btn-sm" data-bind="click: saveAll">
          Save All
        </button>

        <div style="flex: 1; text-align: right">
          Selected Tool:
          <span data-bind="text: selectionTool()?.name"></span>
        </div>
      </div>
      <div class="main-content">
        <div class="main-canvas">
          <canvas id="game" width="800" height="600"></canvas>
        </div>
        <div class="main-layers">
          <h4>Seat Layout Image</h4>
          <div class="layer-item">
            <input
                class="form-control input-sm"
                type="text"
                data-bind="value: imageUrl"
              />
          </div>
          <h4>Sections</h4>
          <div data-bind="foreach: sections">
            <div
              class="layer-item"
              data-bind="css: {'active-section': $data.section === $parent.selectedSection()}"
            >
              <input
                class="form-check-input"
                type="checkbox"
                data-bind="checked: visible"
              />

              <input
                class="form-control input-sm"
                type="text"
                data-bind="value: name, event: {focus: $component.selectSection.bind($component, $data)}"
              />
              <span
                class="btn btn-xs btn-primary btn-outline"
                data-bind="click: $parent.showSection.bind($parent)"
              >
                <i class="glyphicon glyphicon-edit"></i>
              </span>
              <span
                class="btn btn-xs btn-info btn-outline"
                data-bind="click: $parent.cloneSection.bind($parent)"
              >
                <i class="glyphicon glyphicon-copy"></i>
              </span>
              <span
                class="btn btn-xs btn-danger btn-outline"
                data-bind="click: $parent.deleteSection.bind($parent)"
              >
                <i class="glyphicon glyphicon-trash"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
`
    })
  }
}


