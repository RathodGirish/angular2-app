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
var core_2 = require('angular2-google-maps/core');
var GetMapObjectsDirective = (function () {
    function GetMapObjectsDirective(googleMapsWrapper, googleMarkerManager) {
        this.googleMapsWrapper = googleMapsWrapper;
        this.googleMarkerManager = googleMarkerManager;
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
         * Get sebm markers
         */
        this._markers = null;
        this.markersChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(GetMapObjectsDirective.prototype, "map", {
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
    Object.defineProperty(GetMapObjectsDirective.prototype, "markerManager", {
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
    Object.defineProperty(GetMapObjectsDirective.prototype, "markers", {
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
    GetMapObjectsDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        // get native map
        this.googleMapsWrapper.getNativeMap().then(function (map) {
            _this.map = map;
        }, function (error) {
            throw error;
        });
        // get marker manager
        this.markerManager = this.googleMarkerManager;
        // get markers
        this.markerChildren.changes.subscribe(function (markers) {
            _this.markers = markers._results;
        });
    };
    __decorate([
        core_1.Output('map'), 
        __metadata('design:type', core_1.EventEmitter)
    ], GetMapObjectsDirective.prototype, "mapChanged", void 0);
    __decorate([
        core_1.Output('markerManager'), 
        __metadata('design:type', core_1.EventEmitter)
    ], GetMapObjectsDirective.prototype, "markerManagerChanged", void 0);
    __decorate([
        core_1.Output('markers'), 
        __metadata('design:type', core_1.EventEmitter)
    ], GetMapObjectsDirective.prototype, "markersChanged", void 0);
    __decorate([
        core_1.ContentChildren(core_2.SebmGoogleMapMarker), 
        __metadata('design:type', core_1.QueryList)
    ], GetMapObjectsDirective.prototype, "markerChildren", void 0);
    GetMapObjectsDirective = __decorate([
        core_1.Directive({
            selector: 'get-map-objects',
        }), 
        __metadata('design:paramtypes', [core_2.GoogleMapsAPIWrapper, core_2.MarkerManager])
    ], GetMapObjectsDirective);
    return GetMapObjectsDirective;
}());
exports.GetMapObjectsDirective = GetMapObjectsDirective;
//# sourceMappingURL=map-directive.js.map