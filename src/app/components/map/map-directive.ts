import { Directive, Output, EventEmitter, AfterViewInit, ContentChildren, QueryList } from '@angular/core';
import { GoogleMapsAPIWrapper, MarkerManager, SebmGoogleMapMarker } from 'angular2-google-maps/core';

@Directive({
  selector: 'get-map-objects',
})
export class GetMapObjectsDirective implements AfterViewInit {

  /**
   * Get native map object
   */
  public _map: any = null;
  @Output('map') mapChanged: EventEmitter<any> = new EventEmitter<any>();
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
    public googleMarkerManager: MarkerManager
  ) { }

  ngAfterViewInit() {
    // get native map
    this.googleMapsWrapper.getNativeMap().then(map => {
      this.map = map;
    }, error => {
      throw error;
    })

    // get marker manager
    this.markerManager = this.googleMarkerManager;

    // get markers
    this.markerChildren.changes.subscribe(markers => {
      this.markers = markers._results;
    })
  }
}