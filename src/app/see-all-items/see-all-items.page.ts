import { Component, OnInit, Renderer2 } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { ResourcedataService } from '../services/api/resourcedata.service';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-see-all-items',
  templateUrl: './see-all-items.page.html',
  styleUrls: ['./see-all-items.page.scss'],
})
export class SeeAllItemsPage implements OnInit {

  public Items = new Array(20);
  bookMarkIcon: any;
  cart = [];
  products:any;
  cartItemCount: BehaviorSubject<number>;
  bagItemCount: BehaviorSubject<number>;
  constructor(public router: Router,
    public service: ResourcedataService,
    public renderer: Renderer2,
    public route:ActivatedRoute,
    private alertService:AlertService,
    private animationCtrl: AnimationController) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.products = this.router.getCurrentNavigation().extras.state.data;
          console.log("product ",this.products);
        }
      });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.cartItemCount = this.service.getCartItemCount();
    this.bagItemCount = this.service.getBagItemCount();
    this.alertService.loadingDismiss();
  }
  gotoDetailsPage(data: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        data: data
      }
    };
    this.router.navigate(['/view-details'], navigationExtras);
  }
  addtoWishList(event1, event, product: any) {
    event1.stopPropagation();
    if (event.src === 'assets/icon/bookmarkUnsel.svg') {
      this.service.decreaseProduct(product);
      event.src = 'assets/icon/bookmarkSel.svg';
    } else {
      this.service.addProduct(product);
      event.src = 'assets/icon/bookmarkUnsel.svg';
    }
  }
}
