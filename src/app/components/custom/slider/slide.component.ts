import {Component, OnInit, OnDestroy, Input, HostBinding } from '@angular/core';

import {Carousel, Direction} from  './carousel.component';

@Component({
    moduleId: "sildeModule",
    selector: 'slide',
    templateUrl: './slide.component.html'
})
export class Slide implements OnInit, OnDestroy {
  
    @Input() public index:number;
    @Input() public direction:Direction;

    @HostBinding('class.active')
    @Input() public active:boolean;

    @HostBinding('class.item')
    @HostBinding('class.carousel-item')
    public addClass:boolean = true;

    constructor(public carousel:Carousel) {
    }

    public ngOnInit() {
        this.carousel.addSlide(this);
    }

    public ngOnDestroy() {
    }
}
