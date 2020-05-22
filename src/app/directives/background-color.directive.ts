import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBackgroundColor]'
})
export class BackgroundColorDirective {

  @Input('appBackgroundColor') backgroundColor: string;

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeColor(this.color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeColor(null);  
  }

  get color() {
    return this.backgroundColor || 'red';
  }

  private changeColor(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}