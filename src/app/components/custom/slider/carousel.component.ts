import {Component, OnDestroy, Input} from '@angular/core';
import {Slide} from './slide.component';

export enum Direction {UNKNOWN, NEXT, PREV}

@Component({
    moduleId: "carouselModule",
    selector: 'carousel',
    templateUrl: './carousel.component.html'
})

export class Carousel {
  
  public slides: Array<Slide> = [];
  public currentInterval: any;
  public isPlaying: boolean;
  public destroyed: boolean = false;
  public currentSlide: Slide;
  public _interval: number;

  @Input() public noWrap: boolean;
  @Input() public noPause: boolean;
  @Input() public noTransition: boolean;

  @Input() public get interval(): number {
    return this._interval;
  }

    constructor() {
         console.log("Carousel created");       
    }

  public set interval(value: number) {
    this._interval = value;
    this.restartTimer();
  }

  public getInstance() {
    return this;
  }
  
  public select(nextSlide: Slide, direction: Direction = Direction.UNKNOWN) {
    let nextIndex = nextSlide.index;
    if (direction === Direction.UNKNOWN) {
      direction = nextIndex > this.getCurrentIndex() ? Direction.NEXT : Direction.PREV;
    }

    // Prevent this user-triggered transition from occurring if there is already one in progress
    if (nextSlide && nextSlide !== this.currentSlide) {
      this.goNext(nextSlide, direction);
    }
  }

  public goNext(slide: Slide, direction: Direction) {
    if (this.destroyed) {
      return;
    }

    slide.direction = direction;
    slide.active = true;

    if (this.currentSlide) {
      this.currentSlide.direction = direction;
      this.currentSlide.active = false;
    }

    this.currentSlide = slide;

    // every time you change slides, reset the timer
    this.restartTimer();
  }

  public getSlideByIndex(index: number) {
    let len = this.slides.length;
    for (let i = 0; i < len; ++i) {
      if (this.slides[i].index === index) {
        return this.slides[i];
      }
    }
  }

  public getCurrentIndex() {
    return !this.currentSlide ? 0 : this.currentSlide.index;
  }

  public next() {
    let newIndex = (this.getCurrentIndex() + 1) % this.slides.length;

    if (newIndex === 0 && this.noWrap) {
      this.pause();
      return;
    }

    return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
  }

  public prev() {
    let newIndex = this.getCurrentIndex() - 1 < 0 ? this.slides.length - 1 : this.getCurrentIndex() - 1;

    if (this.noWrap && newIndex === this.slides.length - 1) {
      this.pause();
      return;
    }

    return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
  }

  public restartTimer() {
    this.resetTimer();
    let interval = +this.interval;
    if (!isNaN(interval) && interval > 0) {
      this.currentInterval = setInterval(() => {
        let nInterval = +this.interval;
        if (this.isPlaying && !isNaN(this.interval) && nInterval > 0 && this.slides.length) {
          this.next();
        } else {
          this.pause();
        }
      }, interval);
    }
  }

  public resetTimer() {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = null;
    }
  }

  public play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.restartTimer();
    }
  }

  public pause() {
    if (!this.noPause) {
      this.isPlaying = false;
      this.resetTimer();
    }
  }

  public addSlide(slide: Slide) {
    slide.index = this.slides.length;
    this.slides.push(slide);
    if (this.slides.length === 1 || slide.active) {
      this.select(this.slides[this.slides.length - 1]);
      if (this.slides.length === 1) {
        this.play();
      }
    } else {
      slide.active = false;
    }
  }
}

