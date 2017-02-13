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
var core_2 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/throttleTime');
require('rxjs/add/observable/fromEvent');
var forms_1 = require('@angular/forms');
var FilterPipe = (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (items, filter) {
        if (filter && Array.isArray(items)) {
            var filterKeys_1 = Object.keys(filter);
            return items.filter(function (item) {
                return filterKeys_1.reduce(function (memo, keyName) {
                    return (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "";
                }, true);
            });
        }
        else {
            return items;
        }
    };
    FilterPipe = __decorate([
        core_2.Pipe({
            name: 'filter'
        }), 
        __metadata('design:paramtypes', [])
    ], FilterPipe);
    return FilterPipe;
}());
exports.FilterPipe = FilterPipe;
var Multiselect = (function () {
    function Multiselect(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.isOpen = false;
        this._header = "Select value";
        this.filterInput = new forms_1.FormControl();
        // ControlValueAccessor Intercace and mutator
        this.propagateChange = function (_) { };
    }
    Object.defineProperty(Multiselect.prototype, "selectedItems", {
        get: function () {
            return this._selectedItems;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Multiselect.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this._selectedItems = value;
        }
        else {
            this._selectedItems = [];
        }
    };
    Multiselect.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    Multiselect.prototype.select = function (item) {
        item.checked = !item.checked;
    };
    Multiselect.prototype.toggleSelect = function () {
        console.log(' toggleSelect call');
        this.isOpen = !this.isOpen;
    };
    Multiselect.prototype.openSelect = function () {
        this.isOpen = true;
    };
    Multiselect.prototype.closeSelect = function () {
        this.isOpen = false;
    };
    Multiselect.prototype.clearFilter = function () {
        this.filterText = "";
    };
    Multiselect.prototype.ngOnInit = function () {
        var _this = this;
        this._subscription = this.items.subscribe(function (res) { return _this._items = res; });
        if (this._items[0].label == "Apartment") {
            this._header = "Property Types";
        }
        else if (this._items[0].label == "Studio") {
            this._header = "Beds";
        }
        this.enableFilter = false;
        this.filterText = "";
        this.filterPlaceholder = "Filter..";
        this.filterInput
            .valueChanges
            .debounceTime(200)
            .distinctUntilChanged()
            .subscribe(function (term) {
            _this.filterText = term;
            _this.changeDetectorRef.markForCheck();
            console.log(term);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Rx_1.Observable)
    ], Multiselect.prototype, "items", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Rx_1.Observable)
    ], Multiselect.prototype, "header", void 0);
    Multiselect = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'multiselect',
            templateUrl: './multiselect.component.html'
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], Multiselect);
    return Multiselect;
}());
exports.Multiselect = Multiselect;
//# sourceMappingURL=multiselect.component.js.map