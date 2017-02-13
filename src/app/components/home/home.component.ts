import { Component, ViewChild, NgModule, OnInit, Output, AfterViewInit, EventEmitter, OnDestroy, ElementRef, NgZone, Renderer, Directive} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormControl  } from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, AccountService, PropertyService, CommonAppService,  } from '../../services/index';
import { GlobalVariable } from '../../services/static-variable';
import { AppComponent } from '../../app.component';
import { MapComponent }  from '../../components/map/map.component';
import { Multiselect } from '../../components/custom/multiselect/multiselect.component'; 

import { GoogleMapsAPIWrapper, MarkerManager, AgmCoreModule, MapsAPILoader, NoOpMapsAPILoader, MouseEvent, InfoWindowManager, SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow  } from "angular2-google-maps/core";

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export var iconUrl: string="assets/public/img/pin-purple.png";

@Component({
    moduleId: "homeModule",
    selector: 'home',
    styles: [`
        .sebm-google-map-container {
            height: 100%;
        }
    `],
    providers:[SebmGoogleMap, GoogleMapsAPIWrapper, MarkerManager, Multiselect, MapComponent, InfoWindowManager],
    templateUrl: './home.component.html'
})

@NgModule({
    imports: [BrowserModule, FormsModule, MarkerManager, SebmGoogleMapMarker],
    declarations: [AppComponent],
    bootstrap: [ AppComponent ]
})

export class HomeComponent implements AfterViewInit { 
    public properties: any[] = [];
    public allFullProperties: any[] = [];
    public loading: boolean = false;

    public windowHeight: string;
    public latitude: number;
    public longitude: number;

    currentMarker: SebmGoogleMapMarker;
    removeMarker: SebmGoogleMapMarker;
    currentInfowindow: SebmGoogleMapInfoWindow;

    public _map: any = null;
    @Output('map') mapChanged: EventEmitter<any> = new EventEmitter<any>();
    set map(val){
        this._map = val;
        this.mapChanged.emit(val);
    }
    get map(){
        return this._map;
    }

    @ViewChild('infoWindowDiv') infoWindowDiv:ElementRef;

    public address: string;
    public searchControl: FormControl;
    public zoom: number;
    public isBoundJustChanged: boolean = false;
    public isInfowindowOpen: boolean = false;
    public limitListingCount: number = 300;
    public markers: marker[] = [];
    previousMarkers: any[] = [];

    public currentIconUrl: string = iconUrl; 
    public resultCounter: number;
    public centerBounds: any;
    public currentBounds: any;

    @ViewChild('googleMap') googleMap:ElementRef;
    public googleMaps: any;

    @ViewChild("SearchTop")
    public searchElementRef: ElementRef;

    public mmap : any;

    /*------ filter -------------*/
    public propertyTypeItems: Observable<Array<any>>;
    public beds: Observable<Array<any>>;
    public _propertyTypeItems: Array<any>;
    public _beds: Array<any>;
    public _selectedItems: Array<any> = [];
    public watchedPropertyTypeItems: Array<any>;
    public watchedBedsItems: Array<any>;

    public moreFilterText: string = "More";
    public isMoreFilter: boolean = true;

    public valuedate:string = "";

    public filterQueryObject: filterQueryObject;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public renderer: Renderer,
        public accountService: AccountService,
        public propertyService: PropertyService,
        public commonAppService: CommonAppService,
        public _mapApiWrapper:GoogleMapsAPIWrapper,
        public _markerManager: MarkerManager, 
        public _infoWindowManager: InfoWindowManager,
        public _mapComponent: MapComponent,
        public mapsAPILoader: MapsAPILoader,
        public multiselect: Multiselect,
        public sebmGoogleMap: SebmGoogleMap,
        public ngZone: NgZone) { 
        this._beds = [];
        this._propertyTypeItems = [];

        this.beds = Observable.of(this._beds);
        this.beds.subscribe(res => { 
            this.watchedBedsItems = res; 
        });

        this.propertyTypeItems = Observable.of(this._propertyTypeItems);
        this.propertyTypeItems.subscribe(res => { this.watchedPropertyTypeItems = res; 
        });

        this.initFilterQueryObject();
    }

    initFilterQueryObject(){
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
        }
    }

    ngOnInit() {
        this.loading = true;
        this.currentIconUrl = iconUrl;

        this._beds.push({ label: "Studio", value: "Studio"});
        this._beds.push({ label: "1", value: "1"});
        this._beds.push({ label: "2", value: "2"});
        this._beds.push({ label: "3", value: "3"});
        this._beds.push({ label: "4", value: "4"});
        this._beds.push({ label: "5+", value: "5+"});

        this._propertyTypeItems.push({ label: "Apartment", value: "Apartment"});
        this._propertyTypeItems.push({ label: "House", value: "House"});
        this._propertyTypeItems.push({ label: "Room", value: "Room"});
        this._propertyTypeItems.push({ label: "Other", value: "Other"});

        //set google maps defaults
        this.zoom = 9;
        this.latitude = 49.895136;
        this.longitude = -97.13837439999998;

        // this.callGetPropertiesByLatLng(this.latitude, this.longitude);

        //create search FormControl
        this.searchControl = new FormControl();

        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {

            //THIS.mmap = new google.maps.Map(document.getElementById('googleMap1'),{zoom: 6, center: new google.maps.LatLng(49.895136, -97.13837439999998)});

            // google.maps.event.addListenerOnce(mmap,"click", function() {
            //    console.log("hhhprojection:"+mmap.getProjection());
            // });

            // let overlay = new google.maps.OverlayView(); 
            // overlay.draw = function() {};
            // overlay.setMap(mmap);

            // var Projection = overlay.getProjection(); 
            // console.log("projection:"+Projection);

            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"],
                componentRestrictions: {
                    country: "ca"
                }
            });

            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });
    }

    ngAfterViewInit() {

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
    }

    callGetPropertiesByLatLng(lat: number, lng: number){
        // this.propertyService.getAllProperties()
        this.propertyService.getAllPropertiesByGeoLatLong(lat, lng, this.limitListingCount)
        // this.propertyService.getAllPropertiesByLatLong(lat, lng, this.limitListingCount)
            .subscribe((data: any) => {
                this.loading = false;
                console.log(' TOTAL FETCH DATA ' + JSON.stringify(data.length));
                

                this.allFullProperties = [];
                data.map((property: any, index: any) => {
                    
                    if(property && this.checkMarkerVisible(property.Latitude, property.Longitude) && property.Id != "0" && index < this.limitListingCount && property.Pictures.length > 0){
                        this.allFullProperties.push(property); 
                    }
                });

                // console.log(' his.allFullProperties.length ' + JSON.stringify(this.allFullProperties.length));
                this.filterListing(data);

            },
            (error: any) => {
                this.loading = false;
                console.log(' Error while  getAllPropertiesByLatLong : ' + JSON.stringify(error));
            });
    }

    setMapManager(map: GoogleMapsAPIWrapper){
        this._mapApiWrapper = map;
        console.log(' this._mapApiWrapper ' + this._mapApiWrapper);
        this.map = map;

    }

    setMarkerManager(markerManager: MarkerManager){
        this._markerManager = markerManager;
    }

    setInfoWindowManager(infoWindowManager: InfoWindowManager){
        this._infoWindowManager = infoWindowManager;
    }

    checkMarkerAlreadyExist(checkMarker: any){
        for (let key in this.previousMarkers) {
            if (this.previousMarkers.hasOwnProperty(key)) {
                let markerItem = this.previousMarkers[key];
                if(markerItem.latitude == checkMarker.latitude && markerItem.longitude == checkMarker.longitude){
                    return true;
                }
            }
        }
        return false;
    }

    addMarkers(markers: any){
        let THIS = this;

        for (let key in markers) {
            if (markers.hasOwnProperty(key)) {
                let markerItem = markers[key];
                this.currentMarker = new SebmGoogleMapMarker(this._markerManager);
                this.currentMarker.iconUrl = GlobalVariable.PIN_PURPLE;
                this.currentMarker.latitude = markerItem.Latitude;
                this.currentMarker.longitude = markerItem.Longitude;
                this.currentMarker.title = markerItem.Title;
                this.currentMarker.zIndex = parseInt(key);
                this.currentMarker.label = markerItem.Title;

                this.currentInfowindow = new SebmGoogleMapInfoWindow(this._infoWindowManager, this.infoWindowDiv);

                this.currentInfowindow.latitude = markerItem.Latitude;
                this.currentInfowindow.longitude = markerItem.Longitude;
                let node=document.createElement('div');
                node.innerHTML = "<div id='' class='col-xs-12 col-sm-12 col-md-12 pad0' >"+
                        "<button class='closeWindowButton btn btn-danger'>X</button>"+
                        "<a href='/propertyDetails;Id="+markerItem.Id+"' (click)=propertyDetails($event, markerItem.Id) class='list_rental_inforwindow' id='markerItem.Id' >"+
                            "<div class='col-xs-12 col-sm-12 pad0'>"+
                                "<div class='item'>"+
                                    "<img src='"+ markerItem.PicUrl +"' alt='' class='infowindow-property-pic thumbnail'>"+
                                "</div>"+
                            "</div>"+
                            "<span class='col-xs-12 infowindow-caption col-sm-12'>"+
                                "<div class='col-xs-4 col-sm-4'>"+
                                    "<h4 class='text-white'>$"+ markerItem.MonthlyRent +"</h4>"+
                                "</div>"+
                                "<div class='col-xs-5 col-sm-5 text-right'>"+
                                    "<h6 class='price text-white'>"+ markerItem.PropertyType +"</h6>"+
                                "</div>"+
                                "<div class='col-xs-3 col-sm-3 text-right'>"+
                                    "<h6 class='price text-white'>"+ markerItem.Bed +"</h6>"+
                                "</div>"+
                            "</span>"+
                        "</a>"+
                    "</div>";
                        this.currentInfowindow.content = node;

                let flag: boolean = this.checkMarkerVisible(markerItem.Latitude, markerItem.Longitude);
                //console.log(' this.currentMarker addMarker flag ' + flag);

                if(!flag){
                    this._markerManager.deleteMarker(this.currentMarker);
                } else {
                    let isMarkerExists = this.checkMarkerAlreadyExist(this.currentMarker);
                    //console.log(' isMarkerExists ' + isMarkerExists);
                    //THIS.mmap = new google.maps.Map(document.getElementById('googleMap1'),{zoom: 6, center: new google.maps.LatLng(49.895136, -97.13837439999998)});

                    // google.maps.event.addListenerOnce(THIS.mmap,"projection_changed", function() {
                    //    console.log("hhhprojection:"+THIS.mmap.getProjection());
                    // });


                    if(!isMarkerExists){
                        this._markerManager.addMarker(this.currentMarker);

                        this.previousMarkers.push(this.currentMarker);

                        this._infoWindowManager.addInfoWindow(this.currentInfowindow);

                        this._markerManager.createEventObservable('mouseover', this.currentMarker)
                        .subscribe((position: any) => {
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

                            this.currentInfowindow.latitude = position.latLng.lat();
                            this.currentInfowindow.longitude = position.latLng.lng();

                            this._infoWindowManager.setPosition(this.currentInfowindow);
                            //this._infoWindowManager.setOptions(this.currentInfowindow, { pixelOffset: offset});
                            this._infoWindowManager.open(this.currentInfowindow);
                            // this._infoWindowManager.createEventObservable('mouseover', this.currentInfowindow)
                            // .subscribe((position: any) => {
                            //     console.log(' _infoWindowManager click ');
                            // });
                        }); 
                    }
                    
                }
            }
        }
    }

    removeMarkers(prevMarkers: any){
        console.log(' removeMarkers this.previousMarkers ' + JSON.stringify(this.previousMarkers.length));

        for (let markerKey in this.previousMarkers) {
            if (this.previousMarkers.hasOwnProperty(markerKey)) {
                let removeMarkerItem = this.previousMarkers[markerKey];
                let flag: boolean = this.checkMarkerVisible(removeMarkerItem.Latitude, removeMarkerItem.Longitude);
                if(flag == false){
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
    }

    editProperty(event: any, Id: string){
        event.stopPropagation();
        this.router.navigate( [
            'manageProperty', { Id: Id}
        ]);
    }

    propertyDetails(event: any, Id: string){
        console.log(' propertyDetails clicked ' );
        event.stopPropagation();
        this.router.navigate( [
            'propertyDetails', { Id: Id}
        ]);
    }

    toggleMore(){
        this.isMoreFilter = !this.isMoreFilter;
        this.moreFilterText = (this.isMoreFilter)? "More" : "Less";
    }

    closeInforwindow(){
        this.infoWindow.close();
    }

    updateResultCounter(){
        this.resultCounter = this.properties.filter(value => 
            (value.PicUrl != '' && (this.checkMarkerVisible(value.Latitude, value.Longitude)))).length;
    }

    /*------ Filter Property ------- */

    propTypeSelected(event: any, filterQueryObject: filterQueryObject){
        let propertyTypeItems: string[] = this.commonAppService.getSelectedFromMultiselect(this.watchedPropertyTypeItems);

        this.filterQueryObject.PropertyType = propertyTypeItems;
        this.filterListing(this.allFullProperties);
    }

    propMinChange(value: any){
        if(value != this.filterQueryObject.Min){
            this.filterQueryObject.Min = value;
            this.filterListing(this.allFullProperties);
        }
    }

    propMaxChange(value: any){
        if(value != this.filterQueryObject.Max){
            this.filterQueryObject.Max = value;
            this.filterListing(this.allFullProperties);
        }
    }

    propBedSelected(event: any, filterQueryObject: filterQueryObject){
        let propertyBedItems: string[] = this.commonAppService.getSelectedFromMultiselect(this.watchedBedsItems);

        this.filterQueryObject.Bed = propertyBedItems;
        this.filterListing(this.allFullProperties);
    }

    propAvailableDateChange(){
        let selectedDate = $('#AvailableBefore').val();
        this.filterQueryObject.DateAvailable = selectedDate;
        this.filterListing(this.allFullProperties);
    }

    propKeywordsChange(value: any){
        if(value.length > 3 || value.length == 0){
            this.filterQueryObject.Keywords = value;
            this.filterListing(this.allFullProperties);
        }
    }

    public ListedWithin: string = "";
    propListedWithinChange(event: any){
        console.log(' propListedWithinChange event.target.value ' + event.target.value);
        $('input[type=checkbox][name=listedWithin].listedWithin').each(function () {
            if ($(this).data('val') != event.target.value) {
                $(this).prop("checked", false);
            }
        });

        this.ListedWithin = (event.target.checked == true)? event.target.value : "";
        this.filterQueryObject.ListedWithin = this.ListedWithin;
        this.filterListing(this.allFullProperties);
    }

    public Bath: string[] = [];
    propBathChange(event: any){
        if(event.target.checked == true){
            this.Bath.push(event.target.value);
        } else {
            this.Bath.splice(this.Bath.indexOf(event.target.value), 1);
        }
        this.filterQueryObject.Bath = this.Bath;
        this.filterListing(this.allFullProperties);
    }

    public Pet: string[] = [];
    propPetChange(event: any){
        if(event.target.checked == true){
            this.Pet.push(event.target.value);
        } else {
            this.Pet.splice(this.Pet.indexOf(event.target.value), 1);
        }
        console.log(' this.Pet ' + JSON.stringify(this.Pet));
        this.filterQueryObject.Pet = this.Pet;
        this.filterListing(this.allFullProperties);
    }

    public Smoking: string = "";
    propSmokingChange(event: any){
        $('input[type=checkbox][name=smoking].smoking').each(function () {
            if ($(this).data('val') != event.target.value) {
                $(this).prop("checked", false);
            }
        });

        this.Smoking = (event.target.checked == true)? event.target.value : "";
        this.filterQueryObject.Smoking = this.Smoking;
        this.filterListing(this.allFullProperties);
    }

    filterListing(data: any){
        console.log(' this.filterQueryObject ' + JSON.stringify(this.filterQueryObject));
        // let filteredListing = Object.assign([], this.allFullProperties);
        let filteredListing: any[] = [];
        this.allFullProperties.map((property: any) => {
            if(property && property.Id != 0){
                filteredListing.push(property); 
            }
        });

        console.log(' filteredListing ' + JSON.stringify(filteredListing.length));
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let rentalItem = data[key];
                let dataKey = key;
                for (let filterkey in this.filterQueryObject) {
                    if (this.filterQueryObject.hasOwnProperty(filterkey)) {

                        if (filterkey == 'PropertyType') {
                            let propertyTypeValue = this.filterQueryObject[filterkey];
                            if (propertyTypeValue.length == 1 && propertyTypeValue.indexOf('Other') != -1) {
                                if (propertyTypeValue.length == 1 && propertyTypeValue.indexOf('Other') != -1) {
                                    if (rentalItem.propertyType == 'Apartment' || rentalItem.propertyType == 'House' || rentalItem.propertyType == 'Room') {
                                        filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                    }
                                }

                            } else if (propertyTypeValue.length > 0 && (!this.commonAppService.isUndefined(rentalItem.PropertyType)) && propertyTypeValue.indexOf('Other') != -1 && propertyTypeValue.indexOf(rentalItem.PropertyType) == -1) {
                                if (rentalItem.PropertyType == 'Apartment' && propertyTypeValue.indexOf('Apartment') == -1) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }

                                if (rentalItem.PropertyType == 'House' && propertyTypeValue.indexOf('House') == -1) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }

                                if (rentalItem.PropertyType == 'Room' && propertyTypeValue.indexOf('Room') == -1) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }

                            } else if (propertyTypeValue.length > 0 && !this.commonAppService.isUndefined(rentalItem.PropertyType) && propertyTypeValue.indexOf(rentalItem.PropertyType) == -1) {
                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                            }
                        }

                        if (filterkey == 'Min') {
                            let minValue = this.filterQueryObject[filterkey];
                            if (minValue != '' && (!this.commonAppService.isUndefined(rentalItem.MonthlyRent)) && parseInt(minValue) >= parseInt(rentalItem.MonthlyRent)) {
                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                            }
                        }

                        if (filterkey == 'Max') {
                            let maxValue = this.filterQueryObject[filterkey];
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
                            let dateAvailableValue = this.filterQueryObject[filterkey];

                            if(this.commonAppService.isUndefined(dateAvailableValue)){

                            } else  if(!this.commonAppService.isUndefined(dateAvailableValue) && (this.commonAppService.isUndefined(rentalItem.DateAvailable)) || rentalItem.IsImmediateAvailable == true){
                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                            } else  if(!this.commonAppService.isUndefined(dateAvailableValue) && (!this.commonAppService.isUndefined(rentalItem.DateAvailable))) {
                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                            }
                        }

                        if(filterkey == 'Keywords'){
                            let keywords = this.filterQueryObject[filterkey];
                            if (keywords != '' && (this.commonAppService.isUndefined(rentalItem.Title))) {
                                delete filteredListing[dataKey];
                            } else if (keywords != '' && (!this.commonAppService.isUndefined(rentalItem.Title)) && (rentalItem.Title.toLowerCase().indexOf(keywords.toLowerCase()) < 0)) {
                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                            }
                        }

                        if (filterkey == 'ListedWithin') {
                            let listedWithinValue = this.filterQueryObject[filterkey];
                            let thisDateCreated = rentalItem.DateCreated; 
                            // 
                            let DAYDIFF = this.commonAppService.getDayDiffFromTwoDate(new Date(thisDateCreated), new Date());

                            if (listedWithinValue != '' && this.commonAppService.isUndefined(thisDateCreated)) {
                                filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                            } else if (listedWithinValue.length != '' && !this.commonAppService.isUndefined(thisDateCreated)) {
                                
                                if (listedWithinValue == 'Month' && DAYDIFF > 30) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                } else if (listedWithinValue == 'Week' && DAYDIFF > 7) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                } else if (listedWithinValue == '48h' &&  DAYDIFF > 2) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                            } 
                        }

                        if (filterkey == 'Bath') {
                            var bathsValue = this.filterQueryObject[filterkey];

                            var bathsNumber = parseFloat(rentalItem.Bath);

                            if (bathsValue.length >= 3 && !this.commonAppService.isUndefined(bathsNumber)) {

                            } else if (bathsValue.length == 2 && !this.commonAppService.isUndefined(bathsNumber)) {
                                if (bathsValue.indexOf('1') == -1 && bathsNumber <= 1) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                } else if (bathsValue.indexOf('2') == -1 && (bathsNumber > 1 || bathsNumber <= 2)) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                } else if (bathsValue.indexOf('3+') == -1 && bathsNumber > 2) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                }
                            } else if (bathsValue.length == 1 && !this.commonAppService.isUndefined(bathsNumber)) {
                                if (bathsValue.indexOf('1') != -1 && bathsNumber > 1) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                } else if (bathsValue.indexOf('2') != -1 && (bathsNumber <= 1 || bathsNumber > 2)) {
                                    filteredListing.splice(filteredListing.indexOf(rentalItem), 1);
                                } else if (bathsValue.indexOf('3+') != -1 && bathsNumber <= 2) {
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
                            let smokingValue = this.filterQueryObject[filterkey];
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
        this.properties.map((property: any) => {
            if(property && property.Id != 0){
                // console.log(' property ' + JSON.stringify(property));
                let markerObj = {
                    Latitude: property.Latitude,
                    Longitude: property.Longitude,
                    Id: property.Id + "",
                    PicUrl: property.Pictures[0].Url,
                    Bed: property.Bed,
                    MonthlyRent: property.MonthlyRent,
                    PropertyType: property.PropertyType,
                    draggable: false
                };

                this.markers.push(markerObj); 
            }
        });

        if(this.previousMarkers && this.previousMarkers.length > 0){
            this.removeMarkers(this.previousMarkers);
        }
        this.addMarkers(this.markers);
        
        console.log(' this.properties '+ JSON.stringify(this.properties.length));
        console.log(' this.markers '+ JSON.stringify(this.markers.length));
        console.log(' this.previousMarkers '+ JSON.stringify(this.previousMarkers.length));
        this.resultCounter = filteredListing.length;
        //this.updateResultCounter();
    }

    @ViewChild('infoWindow') infoWindow: any;

    mapClicked() {
        //infoWindow.close();
        if(this.markers.length > 0){
            $('.gm-style-iw').next('div').find('img').click();
        }
    }

    markerHover(index: number, infoWindow: any, marker: any) {
        console.log(' displayUserMapInfo ' + index);
        $('.gm-style-iw').next('div').find('img').click();
    }  

    mapBoundsChanged(bounds: any){
        if(!this.commonAppService.isUndefined(bounds)){

            if(!this.commonAppService.isUndefined(bounds) && !this.commonAppService.isUndefined(this.centerBounds)){
            }

            let center = bounds.getCenter();
            this.currentBounds = bounds;
            this.centerBounds = center;
            let lat = center.lat();
            let lng = center.lng();
            
            if(this.isBoundJustChanged == false){
                this.isBoundJustChanged = true;
                //this.callGetPropertiesByLatLng(lat, lng);    
            } 
        }
    }

    mapIdle(event: any, infoWindow: any){
        let lat = this.centerBounds.lat();
        let lng = this.centerBounds.lng();
        this.callGetPropertiesByLatLng(lat, lng);
    }

    mapCenterChanged(event: any){
        // console.log(' this.isInfowindowOpen ' + this.isInfowindowOpen );
        // if(this.isInfowindowOpen == false){
        //     console.log(' mapCenterChanged call zoom ' + this.zoom);
        //     let lat = this.centerBounds.lat();
        //     let lng = this.centerBounds.lng();
        //     //this.callGetPropertiesByLatLng(lat, lng);
        // }
    }

    mapZoomChange(zoom: number){
        console.log(' mapZoomChange ' + zoom );
        this.zoom = zoom;
        this.limitListingCountUpdate(this.zoom);

        let lat = this.centerBounds.lat();
        let lng = this.centerBounds.lng();
        //this.callGetPropertiesByLatLng(lat, lng);
    }

    checkMarkerVisible(lat: number, lng: number){
        let lat1 = this.currentBounds.getSouthWest().lat();
        let lng1 = this.currentBounds.getSouthWest().lng();
        let lat2 = this.currentBounds.getNorthEast().lat();
        let lng2 = this.currentBounds.getNorthEast().lng();
        
        if((lat >= lat1 && lat <= lat2) && (lng >= lng1 && lng <= lng2)){
            // return this.currentBounds.contains({'lat': lat, 'lng': lng});
            return true;    
        } else {
            return false;
        }
        
    }

    limitListingCountUpdate(currentZoom: number) {
        if(currentZoom <=5 ){
            this.limitListingCount = 120;
        } else if(currentZoom > 5 && currentZoom <=8){
            this.limitListingCount = 150;
        } else if(currentZoom > 8 && currentZoom <=12){
            this.limitListingCount = 200;
        } else if(currentZoom > 12 && currentZoom <= 15){
            this.limitListingCount = 230;
        } else if(currentZoom > 15 && currentZoom <= 20){
            this.limitListingCount = 250;
        } else if(currentZoom > 20){
            this.limitListingCount = 350; 
        }
    }

    onResize(event: any) {
        console.log( 'event.target.innerWidth ' +  event.target.innerWidth); 
        console.log( 'event.target.innerHeight ' +  event.target.innerHeight);
        this.windowHeight = (event.target.innerHeight - 145) + 'px';
        $("#rentalsItems").css("height", this.windowHeight);
        $("#searchPropertyListing").css("height", this.windowHeight);
        $("#googleMap").css("height", this.windowHeight);
    }

    isNumberKey(event: any){
        const pattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
          event.preventDefault();
        }
    }

}

export interface marker {
    Latitude: number;
    Longitude: number;
    Id: string;
    PicUrl: string;
    Bed: string;
    MonthlyRent: string;
    PropertyType: string;
    draggable: boolean;
}

export interface filterQueryObject{
    PropertyType: string[];
    Min: string;
    Max: string;
    Bed: string[];
    Keywords: string;
    Bath: string[];
    Pet: string[];
    Smoking: string;
    ListedWithin: string;
    DateAvailable: string;
}