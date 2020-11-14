import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeBackground]'
})
export class ChangeBackgroundDirective {

  toggle: boolean = false;
  color: string = '#F0F9F0';

  constructor(private el: ElementRef) { }

  @HostListener('click') onClick(){
    this.toggle = !this.toggle;
    if(this.toggle){
      this.el.nativeElement.style.backgroundColor = this.color;
    }else{
      this.el.nativeElement.style.backgroundColor = 'white';
    }
  }

  

}
