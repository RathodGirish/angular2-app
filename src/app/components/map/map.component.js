"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var app_component_1 = require('../../app.component');
var core_2 = require('angular2-google-maps/core');
var MapComponent = (function () {
    function MapComponent(googleMapsWrapper, googleMarkerManager, googleInfoWindowManager, sebmGoogleMap) {
        this.googleMapsWrapper = googleMapsWrapper;
        this.googleMarkerManager = googleMarkerManager;
        this.googleInfoWindowManager = googleInfoWindowManager;
        this.sebmGoogleMap = sebmGoogleMap;
        /**
         * Get native map object
         */
        this._map = null;
        this.mapChanged = new core_1.EventEmitter();
        /**
         * Get marker manager
         */
        this._markerManager = null;
        this.markerManagerChanged = new core_1.EventEmitter();
        /**
         * Get infowindow manager
         */
        this._infoWindowManager = null;
        this.infoWindowManagerChanged = new core_1.EventEmitter();
        /**
         * Get sebm markers
         */
        this._markers = null;
        this.markersChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(MapComponent.prototype, "map", {
        get: function () {
            return this._map;
        },
        set: function (val) {
            this._map = val;
            this.mapChanged.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "markerManager", {
        get: function () {
            return this._markerManager;
        },
        set: function (val) {
            this._markerManager = val;
            this.markerManagerChanged.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "infoWindowManager", {
        get: function () {
            return this._infoWindowManager;
        },
        set: function (val) {
            this._infoWindowManager = val;
            this.infoWindowManagerChanged.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "markers", {
        get: function () {
            return this._markers;
        },
        set: function (val) {
            this._markers = val;
            this.markersChanged.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    MapComponent.prototype.ngOnInit = function () {
        // this.googleMapsWrapper.getNativeMap()
        //   .then((map)=> {
        //       this._map = map;
        //       console.log('map.getZoom() ' + map.getZoom());
        //       console.log('this._map 1112' + this._map);
        //   });
        // this.content = this._el.nativeElement.querySelector('.sebm-google-map-info-window-content');
    };
    MapComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // get native map
        this.googleMapsWrapper.getNativeMap().then(function (map) {
            _this._map = map;
        }, function (error) {
            throw error;
        });
        // get marker manager
        this.markerManager = this.googleMarkerManager;
        this.infoWindowManager = this.googleInfoWindowManager;
        this.map = this.googleMapsWrapper;
        // get markers
        this.markerChildren.changes.subscribe(function (markers) {
            _this.markers = markers._results;
        });
        var THIS = this;
        var baseAddEventListeners = core_2.SebmGoogleMapMarker.prototype._addEventListeners;
        core_2.SebmGoogleMapMarker.prototype._addEventListeners = function () {
            this._markerManager.createEventObservable('mouseover', this)
                .subscribe(function (position) {
                console.log(' mouseover call ');
                console.log('55555555555555 THIS.map ' + THIS._map + ' THIS.map.getCenter() ' + THIS._map.getCenter());
                console.log(' position.latLng ' + JSON.stringify(position.latLng));
                var projection = THIS.map.getProjection();
                // let center = projection.fromLatLngToPoint(THIS.map.getCenter()),
                //     point = projection.fromLatLngToPoint(position.latLng),
                //     quadrant = "",
                //     offset: any;
                // console.log('point ' + point);
                // quadrant += (point.y > center.y) ? "b" : "t";
                // quadrant += (point.x < center.x) ? "l" : "r";
                // if (quadrant == "tr") {
                //     offset = new google.maps.Size(-140, 250);
                //     //offset = new google.maps.Size(-70, 185);
                // } else if (quadrant === "tl") {
                //     //offset = new google.maps.Size(70, 185);
                //     offset = new google.maps.Size(160, 250);
                // } else if (quadrant === "br") {
                //     offset = new google.maps.Size(-140, 25);
                // } else if (quadrant === "bl") {
                //     offset = new google.maps.Size(160, 25);
                // }
                // console.log(' offset ' + offset);
                // //this.infoWindow.setOptions({ pixelOffset: offset});
                // // console.log(' getPosition ' + this.infoWindow.getPosition());
                // //this.infoWindow.setOptions({ pixelOffset: offset});
                // // this.infoWindow.content = "<p>yeesdfdsf</p>";
                // // this.infoWindow.pixelOffset = offset;
                // THIS._infoWindowManager.setOptions(this.infoWindow, { pixelOffset: offset});
                // // this._markerManager.updateIcon();
                // // THIS._infoWindowManager.addInfoWindow(this.infoWindow);
                // this.infoWindow.open();  
            });
            this.markerManager.createEventObservable('mouseout', this)
                .subscribe(function () {
                console.log(' mouseout call ');
                //this.infoWindow.close(); 
            });
            baseAddEventListeners.call(this);
        };
    };
    __decorate([
        core_1.Output('map'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MapComponent.prototype, "mapChanged", void 0);
    __decorate([
        core_1.Output('markerManager'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MapComponent.prototype, "markerManagerChanged", void 0);
    __decorate([
        core_1.Output('infoWindowManager'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MapComponent.prototype, "infoWindowManagerChanged", void 0);
    __decorate([
        core_1.Output('markers'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MapComponent.prototype, "markersChanged", void 0);
    __decorate([
        core_1.ContentChildren(core_2.SebmGoogleMapMarker), 
        __metadata('design:type', core_1.QueryList)
    ], MapComponent.prototype, "markerChildren", void 0);
    MapComponent = __decorate([
        core_1.Directive({
            selector: 'get-map-objects'
        }),
        core_1.NgModule({
            imports: [core_2.MarkerManager, core_2.SebmGoogleMapMarker, core_2.SebmGoogleMap],
            declarations: [app_component_1.AppComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [core_2.GoogleMapsAPIWrapper, core_2.MarkerManager, core_2.InfoWindowManager, core_2.SebmGoogleMap])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map