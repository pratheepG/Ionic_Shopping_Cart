import { Component, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { ResourcedataService } from '../services/api/resourcedata.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController } from '@ionic/angular';
import { SearchModalPage } from '../search-modal/search-modal.page';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public Items = new Array(20);
  public cartItemCount: BehaviorSubject<number>;
  public bagItemCount: BehaviorSubject<number>;
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
  constructor(
    private renderer: Renderer2,
    private router:Router,
    private alertService:AlertService,
    private service:ResourcedataService,
    private statusBar:StatusBar,
    private modalController:ModalController
  ) {
    this.statusBar.backgroundColorByHexString('#ffffff');
    this.cartItemCount = service.getCartItemCount();
    this.bagItemCount = service.getBagItemCount();
  }
  favClick(event1,event: any) {
    event1.stopPropagation();
    if (event.src === 'assets/icon/heart.svg') {
      event.src = 'assets/icon/favSelect.svg';
    } else {
      event.src = 'assets/icon/heart.svg';
    }
  }
  onClickOfCard() {
    this.alertService.loadingPresent();
    this.service.getProducts('brand:Roadster').subscribe( data => {
      let navigationExtras: NavigationExtras = { state: {data} };
      this.router.navigate(['/see-all-items'], navigationExtras);
      console.log(data);
    },
    error => {
      console.log(error);
    },
    () => {
    }
  );  
  }

  onClickSearch() {
    this.modalController.create({
      component: SearchModalPage,
      componentProps: {}
    }).then(modal => modal.present());
  }

  goToBag(){
    this.service.goToBag();
  }

}
