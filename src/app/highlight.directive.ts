import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input('appHighlight') highlightColor: string;
  constructor(
    private el: ElementRef
  ) { }
  @HostListener('mouseenter') onmouseenter() {
    this.el.nativeElement.style.backgroundColor = this.highlightColor;
    this.el.nativeElement.style.padding = "2px";
  }
  @HostListener('mouseleave') onmouseleave() {
    this.el.nativeElement.style.backgroundColor = null;
  }
}
