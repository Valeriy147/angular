import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})

export class TooltipDirective {
  @Input('appTooltip') tooltipInner!: string

  private tooltipElem!: Element
  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onEnter() {
    let x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2
    let y = this.el.nativeElement.getBoundingClientRect().top + this.el.nativeElement.offsetHeight + 15
    let element = document.createElement('div')
    element.innerHTML = this.tooltipInner
    element.style.top = `${y.toString()}px`
    element.style.left = `${x.toString()}px`
    element.setAttribute("class", "my-tooltip")
    document.body.appendChild(element)
    this.tooltipElem = element
  }

  @HostListener('mouseleave') onLeave() {
    this.tooltipElem ? this.tooltipElem.remove() : ''
  }
}
