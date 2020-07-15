import { Directive, ElementRef, Renderer2, Input } from '@angular/core';
import { DomController, IonInput } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '(ionScroll)': '(onContentScroll($event))'
  }
})
export class HideHeaderDirective {
  // tslint:disable-next-line: no-input-rename
  @Input('header') header: any;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private domCtrl: DomController
  ) {}
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.header = this.header.el;
    this.renderer.setStyle(this.header, 'transition', '400ms');
  }
  onContentScroll(event: any) {
    if (event.detail.scrollTop > 50 ) {
      this.renderer.setStyle(this.header, 'height', '45px');
    } else {
      this.renderer.setStyle(this.header, 'height', '0px');
    }
  }
}
