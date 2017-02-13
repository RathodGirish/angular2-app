import { Component, ViewChild, NgModule, OnInit, Output, AfterViewInit, EventEmitter, OnDestroy, ElementRef, NgZone, Renderer, Directive, ContentChildren, QueryList} from '@angular/core';

import { AppComponent } from '../../app.component';

import { GoogleMapsAPIWrapper, MarkerManager, AgmCoreModule, MapsAPILoader, NoOpMapsAPILoader, MouseEvent, InfoWindowManager, SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';

@Directive({
  selector: 'get-map-objects'
})

@NgModule({
    imports: [MarkerManager, SebmGoogleMapMarker, SebmGoogleMap],
    declarations: [AppComponent],
    bootstrap: [ AppComponent ]
})

export class MapComponent implements AfterViewInit {

  /**
   * Get native map object
   */
  public _map: any = null;
  @Output('map') mapChanged: EventEmitter<SebmGoogleMap> = new EventEmitter<SebmGoogleMap>();
  set map(val){
    this._map = val;
    this.mapChanged.emit(val);
  }
  get map(){
    return this._map;
  }

  /**
   * Get marker manager
   */
  public _markerManager: any = null;
  @Output('markerManager') markerManagerChanged: EventEmitter<MarkerManager> = new EventEmitter<MarkerManager>();
  set markerManager(val){
    this._markerManager = val;
    this.markerManagerChanged.emit(val);
  }
  get markerManager(){
    return this._markerManager;
  }

  /**
   * Get infowindow manager
   */
  public _infoWindowManager: any = null;
  @Output('infoWindowManager') infoWindowManagerChanged: EventEmitter<InfoWindowManager> = new EventEmitter<InfoWindowManager>();
  set infoWindowManager(val){
    this._infoWindowManager = val;
    this.infoWindowManagerChanged.emit(val);
  }
  get infoWindowManager(){
    return this._infoWindowManager;
  }

  /**
   * Get sebm markers
   */
  public _markers: any = null;
  @Output('markers') markersChanged: EventEmitter<SebmGoogleMapMarker[]> = new EventEmitter<SebmGoogleMapMarker[]>();
  set markers(val){
    this._markers = val;
    this.markersChanged.emit(val);
  }
  get markers(){
    return this._markers;
  }
  @ContentChildren(SebmGoogleMapMarker) markerChildren: QueryList<SebmGoogleMapMarker>;

  constructor(
    public googleMapsWrapper: GoogleMapsAPIWrapper,
    public googleMarkerManager: MarkerManager,
    public googleInfoWindowManager: InfoWindowManager,
    public sebmGoogleMap: SebmGoogleMap
  ) { }

  ngOnInit() {
    // this.googleMapsWrapper.getNativeMap()
    //   .then((map)=> {
    //       this._map = map;
    //       console.log('map.getZoom() ' + map.getZoom());
    //       console.log('this._map 1112' + this._map);

    //   });

      // this.content = this._el.nativeElement.querySelector('.sebm-google-map-info-window-content');
  }

  ngAfterViewInit() {
    // get native map
    this.googleMapsWrapper.getNativeMap().then(map => {
      this._map = map;
    }, error => {
      throw error;
    })

    // get marker manager
    this.markerManager = this.googleMarkerManager;
    this.infoWindowManager = this.googleInfoWindowManager;
    this.map = this.googleMapsWrapper;

    // get markers
    this.markerChildren.changes.subscribe(markers => {
      this.markers = markers._results;
    })
    
  }
}