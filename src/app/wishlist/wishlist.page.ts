import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResourcedataService } from '../services/api/resourcedata.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  public Items = new Array(20);
  mydata = []; 
  products:any;
  param:any
  cartItemCount: BehaviorSubject<number>;
  constructor(public resource:ResourcedataService) { }

  ngOnInit() {
  // this.products = this.resource.getProducts(this.param);
   this.filterItems(); //filter(element => element.faveourite = true );
  }
  removeCartItem(product:any) {
    this.resource.decreaseProduct(product);
    this.filterItems();
  }
  filterItems() {
     this.mydata = this.products.filter(item => {
      return item.faveourite;
    });
    this.products = this.mydata;
    console.log(this.mydata);
  }

}
