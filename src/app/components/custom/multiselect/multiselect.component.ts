import {Component,Input,Output,OnInit,ViewChild,EventEmitter,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any, filter: any): any {
      if (filter && Array.isArray(items)) {
          let filterKeys = Object.keys(filter);
          return items.filter(item =>
              filterKeys.reduce((memo, keyName) =>
                  (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
      } else {
          return items;
      }
    }
}

@Component({
    moduleId: 'multiselectModule',
    selector: 'multiselect',
    templateUrl: './multiselect.component.html'
})

export class Multiselect implements OnInit {
  public _items: Array<any>;
  public _selectedItems: Array<any>;
  public isOpen: boolean = false;
  public enableFilter: boolean;
  public _header: string = "Select value";
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  public _subscription: Subscription;
  @Input() items: Observable<any[]>;

  @Input() header: Observable<string>;
  
  // ControlValueAccessor Intercace and mutator
  propagateChange = (_: any) => {};
  
  get selectedItems(): any {
      return this._selectedItems;
  };
  
  writeValue(value: any) {
   if (value !== undefined) {
      this._selectedItems = value;
    } else  {
      this._selectedItems = [];
    }
  }
  
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  
  
  constructor(public changeDetectorRef: ChangeDetectorRef) {
  }
  
  select(item: any) {
    item.checked = !item.checked;
  }
  
  toggleSelect() {
    console.log(' toggleSelect call');
    this.isOpen = !this.isOpen;
  }

  openSelect() {
    this.isOpen = true;
  }

  closeSelect() {
    this.isOpen = false;
  }
  
  clearFilter() {
    this.filterText = "";
  }
  
  ngOnInit() {
    this._subscription = this.items.subscribe(res => this._items = res);

    if(this._items[0].label == "Apartment"){
        this._header = "Property Types";
    } else if(this._items[0].label == "Studio"){
        this._header = "Beds";
    }

    this.enableFilter = false;
    this.filterText = "";
    this.filterPlaceholder = "Filter..";

    
    this.filterInput
      .valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(term => {
        this.filterText = term;
        this.changeDetectorRef.markForCheck();
        console.log(term);
      });
  }
}
