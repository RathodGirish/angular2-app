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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var Rx_1 = require('rxjs/Rx');
var router_1 = require('@angular/router');
var index_1 = require('../../services/index');
var static_variable_1 = require('../../services/static-variable');
var app_component_1 = require('../../app.component');
var map_component_1 = require('../../components/map/map.component');
var multiselect_component_1 = require('../../components/custom/multiselect/multiselect.component');
var core_2 = require("angular2-google-maps/core");
exports.iconUrl = "assets/public/img/pin-purple.png";
var HomeComponent = (function () {
    function HomeComponent(route, router, renderer, accountService, propertyService, commonAppService, _mapApiWrapper, _markerManager, _infoWindowManager, _mapComponent, mapsAPILoader, multiselect, sebmGoogleMap, ngZone) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.renderer = renderer;
        this.accountService = accountService;
        this.propertyService = propertyService;
        this.commonAppService = commonAppService;
        this._mapApiWrapper = _mapApiWrapper;
        this._markerManager = _markerManager;
        this._infoWindowManager = _infoWindowManager;
        this._mapComponent = _mapComponent;
        this.mapsAPILoader = mapsAPILoader;
        this.multiselect = multiselect;
        this.sebmGoogleMap = sebmGoogleMap;
        this.ngZone = ngZone;
        this.properties = [];
        this.allFullProperties = [];
        this.loading = false;
        this._map = null;
        this.mapChanged = new core_1.EventEmitter();
        this.isBoundJustChanged = false;
        this.isInfowindowOpen = false;
        this.limitListingCount = 300;
        this.markers = [];
        this.previousMarkers = [];
        this.currentIconUrl = exports.iconUrl;
        this._selectedItems = [];
        this.moreFilterText = "More";
        this.isMoreFilter = true;
        this.valuedate = "";
        this.ListedWithin = "";
        this.Bath = [];
        this.Pet = [];
        this.Smoking = "";
        this._beds = [];
        this._propertyTypeItems = [];
        this.beds = Rx_1.Observable.of(this._beds);
        this.beds.subscribe(function (res) {
            _this.watchedBedsItems = res;
        });
        this.propertyTypeItems = Rx_1.Observable.of(this._propertyTypeItems);
        this.propertyTypeItems.subscribe(function (res) {
            _this.watchedPropertyTypeItems = res;
        });
        this.initFilterQueryObject();
    }
    Object.defineProperty(HomeComponent.prototype, "map", {
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
    HomeComponent.prototype.initFilterQueryObject = function () {
        this.filterQueryObject = {
            PropertyType: [],
            Min: "",
            Max: "",
            Bed: [],
            Bath: [],
            Keywords: "",
            Pet: [],
            Smoking: "",
            ListedWithin: "",
            DateAvailable: ""
        };
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.currentIconUrl = exports.iconUrl;
        this._beds.push({ label: "Studio", value: "Studio" });
        this._beds.push({ label: "1", value: "1" });
        this._beds.push({ label: "2", value: "2" });
        this._beds.push({ label: "3", value: "3" });
        this._beds.push({ label: "4", value: "4" });
        this._beds.push({ label: "5+", value: "5+" });
        this._propertyTypeItems.push({ label: "Apartment", value: "Apartment" });
        this._propertyTypeItems.push({ label: "House", value: "House" });
        this._propertyTypeItems.push({ label: "Room", value: "Room" });
        this._propertyTypeItems.push({ label: "Other", value: "Other" });
        //set google maps defaults
        this.zoom = 9;
        this.latitude = 49.895136;
        this.longitude = -97.13837439999998;
        // this.callGetPropertiesByLatLng(this.latitude, this.longitude);
        //create search FormControl
        this.searchControl = new forms_1.FormControl();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            //THIS.mmap = new google.maps.Map(document.getElementById('googleMap1'),{zoom: 6, center: new google.maps.LatLng(49.895136, -97.13837439999998)});
            // google.maps.event.addListenerOnce(mmap,"click", function() {
            //    console.log("hhhprojection:"+mmap.getProjection());
            // });
            // let overlay = new google.maps.OverlayView(); 
            // overlay.draw = function() {};
            // overlay.setMap(mmap);
            // var Projection = overlay.getProjection(); 
            // console.log("projection:"+Projection);
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"],
                componentRestrictions: {
                    country: "ca"
                }
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.zoom = 12;
                });
            });
        });
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        // const baseAddEventListeners = (<any>SebmGoogleMapMarker.prototype)._addEventListeners;
        // (<any>SebmGoogleMapMarker.prototype)._addEventListeners = function() {
        //     this._markerManager.createEventObservable('mouseover', this)
        //     .subscribe(() => {
        //         this.infoWindow.open();  
        //         this.currentIconUrl = 'assets/public/img/pin-red.png';
        //         this.isInfowindowOpen = true;
        //         console.log(' this.isInfowindowOpen ' + this.isInfowindowOpen);
        //     });
        //     this._markerManager.createEventObservable('mouseout', this)
        //      .subscribe(() => { 
        //         //this.infoWindow.close(); 
        //         //this.isInfowindowOpen = false;
        //         this.currentIconUrl = 'assets/public/img/pin-purple.png';
        //     });
        //     baseAddEventListeners.call(this);
        // }
    };
    HomeComponent.prototype.callGetPropertiesByLatLng = function (lat, lng) {
        var _this = this;
        // this.propertyService.getAllProperties()
        this.propertyService.getAllPropertiesByGeoLatLong(lat, lng, this.limitListingCount)
            .subscribe(function (data) {
            _this.loading = false;
            console.log(' TOTAL FETCH DATA ' + JSON.stringify(data.length));
            _this.allFullProperties = [];
            data.map(function (property, index) {
                if (property && _this.checkMarkerVisible(property.Latitude, property.Longitude) && property.Id != "0" && index < _this.limitListingCount && property.Pictures.length > 0) {
                    _this.allFullProperties.push(property);
                }
            });
            // console.log(' his.allFullProperties.length ' + JSON.stringify(this.allFullProperties.length));
            _this.filterListing(data);
        }, function (error) {
            _this.loading = false;
            console.log(' Error while  getAllPropertiesByLatLong : ' + JSON.stringify(error));
        });
    };
    HomeComponent.prototype.setMapManager = function (map) {
        this._mapApiWrapper = map;
        console.log(' this._mapApiWrapper ' + this._mapApiWrapper);
        this.map = map;
    };
    HomeComponent.prototype.setMarkerManager = function (markerManager) {
        this._markerManager = markerManager;
    };
    HomeComponent.prototype.setInfoWindowManager = function (infoWindowManager) {
        this._infoWindowManager = infoWindowManager;
    };
    HomeComponent.prototype.checkMarkerAlreadyExist = function (checkMarker) {
        for (var key in this.previousMarkers) {
            if (this.previousMarkers.hasOwnProperty(key)) {
                var markerItem = this.previousMarkers[key];
                if (markerItem.latitude == checkMarker.latitude && markerItem.longitude == checkMarker.longitude) {
                    return true;
                }
            }
        }
        return false;
    };
    HomeComponent.prototype.addMarkers = function (markers) {
        var _this = this;
        var THIS = this;
        for (var key in markers) {
            if (markers.hasOwnProperty(key)) {
                var markerItem = markers[key];
                this.currentMarker = new core_2.SebmGoogleMapMarker(this._markerManager);
                this.currentMarker.iconUrl = static_variable_1.GlobalVariable.PIN_PURPLE;
                this.currentMarker.latitude = markerItem.Latitude;
                this.currentMarker.longitude = markerItem.Longitude;
                this.currentMarker.title = markerItem.Title;
                this.currentMarker.zIndex = parseInt(key);
                this.currentMarker.label = markerItem.Title;
                this.currentInfowindow = new core_2.SebmGoogleMapInfoWindow(this._infoWindowManager, this.infoWindowDiv);
                this.currentInfowindow.latitude = markerItem.Latitude;
                this.currentInfowindow.longitude = markerItem.Longitude;
                var node = document.createElement('div');
                node.innerHTML = "<div id='' class='col-xs-12 col-sm-12 col-md-12 pad0' >" +
                    "<button class='closeWindowButton btn btn-danger'>X</button>" +
                    "<a href='/propertyDetails;Id=" + markerItem.Id + "' (click)=propertyDetails($event, markerItem.Id) class='list_rental_inforwindow' id='markerItem.Id' >" +
                    "<div class='col-xs-12 col-sm-12 pad0'>" +
                    "<div class='item'>" +
                    "<img src='" + markerItem.PicUrl + "' alt='' class='infowindow-property-pic thumbnail'>" +
                    "</div>" +
                    "</div>" +
                    "<span class='col-xs-12 infowindow-caption col-sm-12'>" +
                    "<div class='col-xs-4 col-sm-4'>" +
                    "<h4 class='text-white'>$" + markerItem.MonthlyRent + "</h4>" +
                    "</div>" +
                    "<div class='col-xs-5 col-sm-5 text-right'>" +
                    "<h6 class='price text-white'>" + markerItem.PropertyType + "</h6>" +
                    "</div>" +
                    "<div class='col-xs-3 col-sm-3 text-right'>" +
                    "<h6 class='price text-white'>" + markerItem.Bed + "</h6>" +
                    "</div>" +
                    "</span>" +
                    "</a>" +
                    "</div>";
                this.currentInfowindow.content = node;
                var flag = this.checkMarkerVisible(markerItem.Latitude, markerItem.Longitude);
                //console.log(' this.currentMarker addMarker flag ' + flag);
                if (!flag) {
                    this._markerManager.deleteMarker(this.currentMarker);
                }
                else {
                    var isMarkerExists = this.checkMarkerAlreadyExist(this.currentMarker);
                    //console.log(' isMarkerExists ' + isMarkerExists);
                    //THIS.mmap = new google.maps.Map(document.getElementById('googleMap1'),{zoom: 6, center: new google.maps.LatLng(49.895136, -97.13837439999998)});
                    // google.maps.event.addListenerOnce(THIS.mmap,"projection_changed", function() {
                    //    console.log("hhhprojection:"+THIS.mmap.getProjection());
                    // });
                    if (!isMarkerExists) {
                        this._markerManager.addMarker(this.currentMarker);
                        this.previousMarkers.push(this.currentMarker);
                        this._infoWindowManager.addInfoWindow(this.currentInfowindow);
                        this._markerManager.createEventObservable('mouseover', this.currentMarker)
                            .subscribe(function (position) {
                            console.log(' THIS._mapApiWrapper ' + THIS._mapApiWrapper + ' THIS._mapApiWrapper.getCenter() ' + THIS._mapApiWrapper.getCenter());
                            // let projection = THIS.map.getProjection();
                            // let center = projection.fromLatLngToPoint(THIS._mapApiWrapper.getCenter()),
                            //     point = projection.fromLatLngToPoint(position.latLng),
                            //     quadrant = "",
                            //     offset: any;
                            // console.log('point ' + point);
                            // quadrant += (point.y > center.y) ? "b" : "t";
                            // quadrant += (point.x < center.x) ? "l" : "r";
                            // if (quadrant == "tr") {
                            //     offset = new google.maps.Size(-140, 235);
                            //     //offset = new google.maps.Size(-70, 185);
                            // } else if (quadrant === "tl") {
                            //     //offset = new google.maps.Size(70, 185);
                            //     offset = new google.maps.Size(160, 235);
                            // } else if (quadrant === "br") {
                            //     offset = new google.maps.Size(-145, 20);
                            // } else if (quadrant === "bl") {
                            //     offset = new google.maps.Size(165, 20);
                            // }
                            // let offset: any;
                            // offset = new google.maps.Size(160, 250);
                            //console.log(' offset ' + offset);
                            //this.currentMarker.iconUrl = 'GlobalVariable.PIN_RED';
                            //this._markerManager.updateIcon(this.currentMarker);
                            _this.currentInfowindow.latitude = position.latLng.lat();
                            _this.currentInfowindow.longitude = position.latLng.lng();
                            _this._infoWindowManager.setPosition(_this.currentInfowindow);
                            //this._infoWindowManager.setOptions(this.currentInfowindow, { pixelOffset: offset});
                            _this._infoWindowManager.open(_this.currentInfowindow);
                            // this._infoWindowManager.createEventObservable('mouseover', this.currentInfowindow)
                            // .subscribe((position: any) => {
                            //     console.log(' _infoWindowManager click ');
                            // });
                        });
                    }
                }
            }
        }
    };
    HomeComponent.prototype.removeMarkers = function (prevMarkers) {
        console.log(' removeMarkers this.previousMarkers ' + JSON.stringify(this.previousMarkers.length));
        for (var markerKey in this.previousMarkers) {
            if (this.previousMarkers.hasOwnProperty(markerKey)) {
                var removeMarkerItem = this.previousMarkers[markerKey];
                var flag = this.checkMarkerVisible(removeMarkerItem.Latitude, removeMarkerItem.Longitude);
                if (flag == false) {
                    console.log(' this.currentMarker removeMarkers flag ' + flag);
                    // this.removeMarker = new SebmGoogleMapMarker(this._markerManager);
                    // this.removeMarker.latitude = removeMarkerItem.Latitude;
                    // this.removeMarker.longitude = removeMarkerItem.Longitude;
                    // this.removeMarker.title = removeMarkerItem.Title;
                    // this.removeMarker.iconUrl = GlobalVariable.PIN_PURPLE;
                    // this.removeMarker.zIndex = parseInt(markerKey);
                    // this.removeMarker.label = removeMarkerItem.Title;
                    this._markerManager.deleteMarker(removeMarkerItem);
                    this.previousMarkers.splice(this.previousMarkers.indexOf(removeMarkerItem), 1);
                }
            }
        }
    };
    HomeComponent.prototype.editProperty = function (event, Id) {
        event.stopPropagation();
        this.router.navigate([
            'manageProperty', { Id: Id }
        ]);
    };
    HomeComponent.prototype.propertyDetails = function (event, Id) {
        console.log(' propertyDetails clicked ');
        event.stopPropagation();
        this.router.navigate([
            'propertyDetails', { Id: Id }
        ]);
    };
    HomeComponent.prototype.toggleMore = function () {
        this.isMoreFilter = !this.isMoreFilter;
        this.moreFilterText = (this.isMoreFilter) ? "More" : "Less";
    };
    HomeComponent.prototype.closeInforwindow = function () {
        this.infoWindow.close();
    };
    HomeComponent.prototype.updateResultCounter = function () {
        var _this = this;
        this.resultCounter = this.properties.filter(function (value) {
            return (value.PicUrl != '' && (_this.checkMarkerVisible(value.Latitude, value.Longitude)));
        }).length;
    };
    /*------ Filter Property ------- */
    HomeComponent.prototype.propTypeSelected = function (event, filterQueryObject) {
        var propertyTypeItems = this.commonAppService.getSelectedFromMultiselect(this.watchedPropertyTypeItems);
        this.filterQueryObject.PropertyType = propertyTypeItems;
        this.filterListing(this.allFullProperties);
    };
    HomeComponent.prototype.propMinChange = function (value) {
        if (value != this.filterQueryObject.Min) {
            this.filterQueryObject.Min = value;
            this.filterListing(this.allFullProperties);
        }
    };
    HomeComponent.prototype.propMaxChange = function (value) {
        if (value != this.filterQueryObject.Max) {
            this.filterQueryObject.Max = value;
            this.filterListing(this.allFullProperties);
        }
    };
    HomeComponent.prototype.propBedSelected = function (event, filterQueryObject) {
        var propertyBedItems = this.commonAppService.getSelectedFromMultiselect(this.watchedBedsItems);
        this.filterQueryObject.Bed = propertyBedItems;
        this.filterListing(this.allFullProperties);
    };
    HomeComponent.prototype.propAvailableDateChange = function () {
        var selectedDate = $('#AvailableBefore').val();
        this.filterQueryObject.DateAvailable = selectedDate;
        this.filterListing(this.allFullProperties);
    };
    HomeComponent.prototype.propKeywordsChange = function (value) {
        if (value.length > 3 || value.length == 0) {
            this.filterQueryObject.Keywords = value;
            this.filterListing(this.allFullProperties);
        }
    };
    HomeComponent.prototype.propListedWithinChange = function (event) {
        console.log(' propListedWithinChange event.target.value ' + event.target.value);
        $('input[type=checkbox][name=listedWithin].listedWithin').each(function () {
            if ($(this).data('val') != event.target.value) {
                $(this).prop("checked", false);
            }
        });
        this.ListedWithin = (event.target.checked == true) ? event.target.value : "";
        this.filterQueryObject.ListedWithin = this.ListedWithin;
        this.filterListing(this.allFullProperties);
    };
    HomeComponent.prototype.propBathChange = function (event) {
        if (event.target.checked == true) {
            this.Bath.push(event.target.value);
        }
        else {
            this.Bath.splice(this.Bath.indexOf(event.target.value), 1);
        }
        this.filterQueryObject.Bath = this.Bath;
        this.filterListing(this.allFullProperties);
    };
    HomeComponent.prototype.propPetChange = function (event) {
        if (event.target.checked == true) {
            this.Pet.push(event.target.value);
        }
        else {
            this.Pet.splice(this.Pet.indexOf(event.target.value), 1);
        }
        console.log(' this.Pet ' + JSON.stringify(this.Pet));
        this.filterQueryObject.Pet = this.Pet;
        this.filterListing(this.allFullProperties);
    };
    HomeComponent.prototype.propSmokingChange = function (event) {
        $('input[type=checkbox][name=smoking].smoking').each(function () {
            if ($(this).data('val') != event.target.value) {
                $(this).prop("checked", false);
            }
        });
        this.Smoking = (event.target.checked == true) ? event.target.value : "";
        this.filterQueryObject.Smoking = this.Smoking;
        this.filterListing(this.allFullProperties);
    };
    HomeComponent.prototype.filterListing = function (data) {
        var _this = this;
        console.log(' this.filterQueryObject ' + JSON.stringify(this.filterQueryObject));
        // let filteredListing = Object.assign([], this.allFullProperties);
        var filteredListing = [];
        this.allFullProperties.map(function (property) {
            if (property && property.Id != 0) {
                filteredListing.push(property);
            }
        });
        console.log(' filteredListing ' + JSON.stringify(filteredListing.length));
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var rentalItem = data[key];
                var dataKey = key;
                for (var filterkey in this.filterQueryObject) {
                    if (this.filterQueryObject.hasOwnProperty(filterkey)) {
                        if (filterkey == 'PropertyType') {
                            var propertyTypeValue = this.filterQueryObject[filterkey];
                            if (propertyTypeValue.length == 1 && propertyTypeValue.indexOf('Other') != -1) {
                                if (propertyTypeValue.length == 1 && propertyTypeValue.indexOf('Other') != -1) {
                                    if (rentalItem.propertyType == 'Apartment' || rentalItem.propertyType == 'House' || rentalItem.propertyType == 'Room') {
                                        filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                    }
                                }
                            }
                            else if (propertyTypeValue.length > 0 && (!this.commonAppService.isUndefined(rentalItem.PropertyType)) && propertyTypeValue.indexOf('Other') != -1 && propertyTypeValue.indexOf(rentalItem.PropertyType) == -1) {
                                if (rentalItem.PropertyType == 'Apartment' && propertyTypeValue.indexOf('Apartment') == -1) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                                if (rentalItem.PropertyType == 'House' && propertyTypeValue.indexOf('House') == -1) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                                if (rentalItem.PropertyType == 'Room' && propertyTypeValue.indexOf('Room') == -1) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                            }
                            else if (propertyTypeValue.length > 0 && !this.commonAppService.isUndefined(rentalItem.PropertyType) && propertyTypeValue.indexOf(rentalItem.PropertyType) == -1) {
                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                            }
                        }
                        if (filterkey == 'Min') {
                            var minValue = this.filterQueryObject[filterkey];
                            if (minValue != '' && (!this.commonAppService.isUndefined(rentalItem.MonthlyRent)) && parseInt(minValue) >= parseInt(rentalItem.MonthlyRent)) {
                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                            }
                        }
                        if (filterkey == 'Max') {
                            var maxValue = this.filterQueryObject[filterkey];
                            if (maxValue != '' && (!this.commonAppService.isUndefined(rentalItem.MonthlyRent)) && parseInt(maxValue) < parseInt(rentalItem.MonthlyRent)) {
                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                            }
                        }
                        if (filterkey == 'Bed') {
                            var bedsValue = this.filterQueryObject[filterkey];
                            if (bedsValue.length > 0 && !this.commonAppService.isUndefined(rentalItem.Bed)) {
                                if (bedsValue.indexOf(rentalItem.Bed) == -1 && rentalItem.Bed < 5) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                                if (bedsValue.indexOf('Studio') == -1 && (rentalItem.Bed == 'Studio')) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                                if (bedsValue.indexOf('5+') == -1 && rentalItem.Bed >= 5) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                            }
                        }
                        if (filterkey == 'DateAvailable') {
                            var dateAvailableValue = this.filterQueryObject[filterkey];
                            if (this.commonAppService.isUndefined(dateAvailableValue)) {
                            }
                            else if (!this.commonAppService.isUndefined(dateAvailableValue) && (this.commonAppService.isUndefined(rentalItem.DateAvailable)) || rentalItem.IsImmediateAvailable == true) {
                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                            }
                            else if (!this.commonAppService.isUndefined(dateAvailableValue) && (!this.commonAppService.isUndefined(rentalItem.DateAvailable))) {
                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                            }
                        }
                        if (filterkey == 'Keywords') {
                            var keywords = this.filterQueryObject[filterkey];
                            if (keywords != '' && (this.commonAppService.isUndefined(rentalItem.Title))) {
                                delete filteredListing[dataKey];
                            }
                            else if (keywords != '' && (!this.commonAppService.isUndefined(rentalItem.Title)) && (rentalItem.Title.toLowerCase().indexOf(keywords.toLowerCase()) < 0)) {
                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                            }
                        }
                        if (filterkey == 'ListedWithin') {
                            var listedWithinValue = this.filterQueryObject[filterkey];
                            var thisDateCreated = rentalItem.DateCreated;
                            // 
                            var DAYDIFF = this.commonAppService.getDayDiffFromTwoDate(new Date(thisDateCreated), new Date());
                            if (listedWithinValue != '' && this.commonAppService.isUndefined(thisDateCreated)) {
                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                            }
                            else if (listedWithinValue.length != '' && !this.commonAppService.isUndefined(thisDateCreated)) {
                                if (listedWithinValue == 'Month' && DAYDIFF > 30) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                                else if (listedWithinValue == 'Week' && DAYDIFF > 7) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                                else if (listedWithinValue == '48h' && DAYDIFF > 2) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                            }
                        }
                        if (filterkey == 'Bath') {
                            var bathsValue = this.filterQueryObject[filterkey];
                            var bathsNumber = parseFloat(rentalItem.Bath);
                            if (bathsValue.length >= 3 && !this.commonAppService.isUndefined(bathsNumber)) {
                            }
                            else if (bathsValue.length == 2 && !this.commonAppService.isUndefined(bathsNumber)) {
                                if (bathsValue.indexOf('1') == -1 && bathsNumber <= 1) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                                else if (bathsValue.indexOf('2') == -1 && (bathsNumber > 1 || bathsNumber <= 2)) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                                else if (bathsValue.indexOf('3+') == -1 && bathsNumber > 2) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                            }
                            else if (bathsValue.length == 1 && !this.commonAppService.isUndefined(bathsNumber)) {
                                if (bathsValue.indexOf('1') != -1 && bathsNumber > 1) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                                else if (bathsValue.indexOf('2') != -1 && (bathsNumber <= 1 || bathsNumber > 2)) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                                else if (bathsValue.indexOf('3+') != -1 && bathsNumber <= 2) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                            }
                        }
                        if (filterkey == 'Pet') {
                            var petsValue = this.filterQueryObject[filterkey];
                            if (petsValue.length > 0 && !this.commonAppService.isUndefined(rentalItem.Pet) && petsValue.indexOf(rentalItem.Pet) == -1) {
                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                            }
                        }
                        if (filterkey == 'Smoking') {
                            var smokingValue = this.filterQueryObject[filterkey];
                            if (smokingValue != '' && ((rentalItem.Smoking == true && smokingValue == 'Yes') || (rentalItem.Smoking == false && smokingValue == 'No'))) {
                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                            }
                        }
                    }
                }
            }
        }
        console.log(' filteredListing ' + JSON.stringify(filteredListing.length));
        console.log(' this.allFullProperties.length ' + JSON.stringify(this.allFullProperties.length));
        this.properties = Object.assign([], filteredListing);
        this.markers = [];
        this.properties.map(function (property) {
            if (property && property.Id != 0) {
                // console.log(' property ' + JSON.stringify(property));
                var markerObj = {
                    Latitude: property.Latitude,
                    Longitude: property.Longitude,
                    Id: property.Id + "",
                    PicUrl: property.Pictures[0].Url,
                    Bed: property.Bed,
                    MonthlyRent: property.MonthlyRent,
                    PropertyType: property.PropertyType,
                    draggable: false
                };
                _this.markers.push(markerObj);
            }
        });
        if (this.previousMarkers && this.previousMarkers.length > 0) {
            this.removeMarkers(this.previousMarkers);
        }
        this.addMarkers(this.markers);
        console.log(' this.properties ' + JSON.stringify(this.properties.length));
        console.log(' this.markers ' + JSON.stringify(this.markers.length));
        console.log(' this.previousMarkers ' + JSON.stringify(this.previousMarkers.length));
        this.resultCounter = filteredListing.length;
        //this.updateResultCounter();
    };
    HomeComponent.prototype.mapClicked = function () {
        //infoWindow.close();
        if (this.markers.length > 0) {
            $('.gm-style-iw').next('div').find('img').click();
        }
    };
    HomeComponent.prototype.markerHover = function (index, infoWindow, marker) {
        console.log(' displayUserMapInfo ' + index);
        $('.gm-style-iw').next('div').find('img').click();
    };
    HomeComponent.prototype.mapBoundsChanged = function (bounds) {
        if (!this.commonAppService.isUndefined(bounds)) {
            if (!this.commonAppService.isUndefined(bounds) && !this.commonAppService.isUndefined(this.centerBounds)) {
            }
            var center = bounds.getCenter();
            this.currentBounds = bounds;
            this.centerBounds = center;
            var lat = center.lat();
            var lng = center.lng();
            if (this.isBoundJustChanged == false) {
                this.isBoundJustChanged = true;
            }
        }
    };
    HomeComponent.prototype.mapIdle = function (event, infoWindow) {
        var lat = this.centerBounds.lat();
        var lng = this.centerBounds.lng();
        this.callGetPropertiesByLatLng(lat, lng);
    };
    HomeComponent.prototype.mapCenterChanged = function (event) {
        // console.log(' this.isInfowindowOpen ' + this.isInfowindowOpen );
        // if(this.isInfowindowOpen == false){
        //     console.log(' mapCenterChanged call zoom ' + this.zoom);
        //     let lat = this.centerBounds.lat();
        //     let lng = this.centerBounds.lng();
        //     //this.callGetPropertiesByLatLng(lat, lng);
        // }
    };
    HomeComponent.prototype.mapZoomChange = function (zoom) {
        console.log(' mapZoomChange ' + zoom);
        this.zoom = zoom;
        this.limitListingCountUpdate(this.zoom);
        var lat = this.centerBounds.lat();
        var lng = this.centerBounds.lng();
        //this.callGetPropertiesByLatLng(lat, lng);
    };
    HomeComponent.prototype.checkMarkerVisible = function (lat, lng) {
        var lat1 = this.currentBounds.getSouthWest().lat();
        var lng1 = this.currentBounds.getSouthWest().lng();
        var lat2 = this.currentBounds.getNorthEast().lat();
        var lng2 = this.currentBounds.getNorthEast().lng();
        if ((lat >= lat1 && lat <= lat2) && (lng >= lng1 && lng <= lng2)) {
            // return this.currentBounds.contains({'lat': lat, 'lng': lng});
            return true;
        }
        else {
            return false;
        }
    };
    HomeComponent.prototype.limitListingCountUpdate = function (currentZoom) {
        if (currentZoom <= 5) {
            this.limitListingCount = 120;
        }
        else if (currentZoom > 5 && currentZoom <= 8) {
            this.limitListingCount = 150;
        }
        else if (currentZoom > 8 && currentZoom <= 12) {
            this.limitListingCount = 200;
        }
        else if (currentZoom > 12 && currentZoom <= 15) {
            this.limitListingCount = 230;
        }
        else if (currentZoom > 15 && currentZoom <= 20) {
            this.limitListingCount = 250;
        }
        else if (currentZoom > 20) {
            this.limitListingCount = 350;
        }
    };
    HomeComponent.prototype.onResize = function (event) {
        console.log('event.target.innerWidth ' + event.target.innerWidth);
        console.log('event.target.innerHeight ' + event.target.innerHeight);
        this.windowHeight = (event.target.innerHeight - 145) + 'px';
        $("#rentalsItems").css("height", this.windowHeight);
        $("#searchPropertyListing").css("height", this.windowHeight);
        $("#googleMap").css("height", this.windowHeight);
    };
    HomeComponent.prototype.isNumberKey = function (event) {
        var pattern = /[0-9\+\-\ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    __decorate([
        core_1.Output('map'), 
        __metadata('design:type', core_1.EventEmitter)
    ], HomeComponent.prototype, "mapChanged", void 0);
    __decorate([
        core_1.ViewChild('infoWindowDiv'), 
        __metadata('design:type', core_1.ElementRef)
    ], HomeComponent.prototype, "infoWindowDiv", void 0);
    __decorate([
        core_1.ViewChild('googleMap'), 
        __metadata('design:type', core_1.ElementRef)
    ], HomeComponent.prototype, "googleMap", void 0);
    __decorate([
        core_1.ViewChild("SearchTop"), 
        __metadata('design:type', core_1.ElementRef)
    ], HomeComponent.prototype, "searchElementRef", void 0);
    __decorate([
        core_1.ViewChild('infoWindow'), 
        __metadata('design:type', Object)
    ], HomeComponent.prototype, "infoWindow", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            styles: ["\n        .sebm-google-map-container {\n            height: 100%;\n        }\n    "],
            providers: [core_2.SebmGoogleMap, core_2.GoogleMapsAPIWrapper, core_2.MarkerManager, multiselect_component_1.Multiselect, map_component_1.MapComponent, core_2.InfoWindowManager],
            templateUrl: 'home.component.html'
        }),
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, core_2.MarkerManager, core_2.SebmGoogleMapMarker],
            declarations: [app_component_1.AppComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, core_1.Renderer, index_1.AccountService, index_1.PropertyService, index_1.CommonAppService, core_2.GoogleMapsAPIWrapper, core_2.MarkerManager, core_2.InfoWindowManager, map_component_1.MapComponent, core_2.MapsAPILoader, multiselect_component_1.Multiselect, core_2.SebmGoogleMap, core_1.NgZone])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map