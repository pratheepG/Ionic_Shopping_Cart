import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env/env.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';

export interface Product {
  id: number;
  name: string;
  description:string;
  size:string;
  price: number;
  quantity: number;
  actualprice:number;
  discount:number;
  faveourite:Boolean;
  isIncart:Boolean;
  sizes:any;
}
@Injectable({
  providedIn: 'root'
})
export class ResourcedataService {
  data: Product[] = [
    { id: 0, name: 'Pan America', description: 'Mens Shirt', price: 8.99, actualprice: 8.99, discount: 8.99, faveourite:false, isIncart:false, size:null, quantity: 0, sizes:['28','30','32','34','36'] },
    { id: 1, name: 'Peter England', description: 'Full Sleav', price: 5.49, actualprice: 8.99, discount: 8.99, faveourite:false, isIncart:false, size:null, quantity: 0, sizes:['28','30','32','34','36'] },
    { id: 2, name: 'Roadster', description: 'Cotton Shirt', price: 4.99, actualprice: 8.99, discount: 8.99, faveourite:false, isIncart:false, size:null, quantity: 0, sizes:['28','30','32','34','36'] },
    { id: 3, name: 'Otto', description: 'Half Sleav', price: 6.99, actualprice: 8.99, discount: 8.99, faveourite:false, isIncart:false, size:null, quantity: 0, sizes:['28','30','32','34','36'] },
    { id: 4, name: 'Allen Solly', description: 'Mens Shirt', price: 8.99, actualprice: 8.99, discount: 8.99, faveourite:false, isIncart:false, size:null, quantity: 0, sizes:['28','30','32','34','36'] },
    { id: 5, name: 'Peter England', description: 'Full Sleav', price: 5.49, actualprice: 8.99, discount: 8.99, faveourite:false, isIncart:false, size:null, quantity: 0, sizes:['28','30','32','34','36'] },
    { id: 6, name: 'Roadster', description: 'Cotton Shirt', price: 4.99, actualprice: 8.99, discount: 8.99, faveourite:false, isIncart:false, size:null, quantity: 0, sizes:['28','30','32','34','36'] },
    { id: 7, name: 'Otto', description: 'Half Sleav', price: 6.99, actualprice: 8.99, discount: 8.99, faveourite:false, isIncart:false, size:null, quantity: 0, sizes:['28','30','32','34','36'] }
  ];
 
  private cart = [];
  public  bagData : any;
  private cartItemCount = new BehaviorSubject(0);
  private bagItemCount = new BehaviorSubject(0);
 
  constructor(public alertController:AlertController,
              private http: HttpClient,
              private env: EnvService,
              private router: Router,
              private alertService: AlertService) {}
 
  getProducts(param:any) {
    return this.http.get(this.env.API_URL + '/products/products?search=('+param+')')
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
 
  getCart() {
    return this.cart
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
  
  getBagItemCount() {
    return this.bagItemCount;
  }

  addProduct(product) {
    for (let p of this.data) {
      if (p.id === product.id) {
        p.faveourite = true;
        break;
      }
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (let p of this.data) {
      if (p.id === product.id) {
          p.faveourite=false;
        console.log(p);
        break;
      }
    }
    console.log(this.data);
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  addToBag(product) {
       return this.http.post(this.env.API_URL + '/bagItems',product)
  }
 
  removeFromBag(product) {
    for (let p of this.data) {
      if (p.id === product.id) {
          p.isIncart=false;
        console.log(p);
        break;
      }
    }
    console.log(this.data);
    this.bagItemCount.next(this.bagItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }

  getBagData(){
     return this.bagData;
  }

  goToBag(){
    this.alertService.loadingPresent();
    this.http.get(this.env.API_URL + '/bagItems').subscribe(data => {
      this.bagData = data
      console.log("Bag Data ",this.bagData);
      this.router.navigate(['/bag']);
    }, error => {
      console.log(error);
    }, () => { 
      // this.router.navigate(['/bag']);
    });
  }

  getDataById(id:any){
    return this.data.filter(item => {
      return (item.id == id);
    });
  }

  upDateData(newItem){
    let updateItem = this.data.find(this.findIndexToUpdate, newItem.id);
    let index = this.data.indexOf(updateItem);
    this.data[index] = newItem;
    console.log(this.findIndexToUpdate);
  }

  findIndexToUpdate(newItem) { 
        return newItem.id === this;
  }
}
