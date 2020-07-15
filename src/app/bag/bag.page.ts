import { AlertService } from './../services/alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { ResourcedataService } from '../services/api/resourcedata.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.page.html',
  styleUrls: ['./bag.page.scss'],
})
export class BagPage implements OnInit {
  public bagData: any;
  constructor(public resource: ResourcedataService,
    public alertController: AlertController,
    public alertService: AlertService) { 
      this.bagData = this.resource.getBagData();
    }

  ngOnInit() {
    this.alertService.loadingDismiss();
  }

  removeFromBag(product: any) {
    this.resource.removeFromBag(product);
    this.bagData = this.resource.getBagData();
  }
  moveToWishList(product: any) {
    if (product.faveourite) {
      this.presentAlert();
      return;
    }
    this.resource.addProduct(product);
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Aleready Exist',
      message: 'This product already in wishlist.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
