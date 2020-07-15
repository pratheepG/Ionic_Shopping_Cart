import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ResourcedataService } from '../services/api/resourcedata.service';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.page.html',
  styleUrls: ['./view-details.page.scss'],
})
export class ViewDetailsPage implements OnInit {

  public _isSizeSelected: Boolean;
  public _isAddedInBag: Boolean;
  public Items = new Array(20);
  sliderConfig = {
    zoom: {
      maxRatio: 2
    }
    // slidesPerView: 1.6,
    // spaceBetween: 10,
    // centeredSlides: true
  };
  details: any;
  id: any;
  size: any;
  cartItemCount: BehaviorSubject<number>;
  bagItemCount: BehaviorSubject<number>;
  constructor(public router:Router, 
              public route:ActivatedRoute,
              public service:ResourcedataService,
              public alertController:AlertController,
              private photoViewer: PhotoViewer,
              private file: File) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.details = this.router.getCurrentNavigation().extras.state.data;
        console.log(this.details);
      }
    });
   }

  ngOnInit() {
    //this.details = this.service.getDataById(this.id);
    //this._isSizeSelected = (this.details.size == (null||""||undefined))?false:true;
    this._isAddedInBag = false; 
    console.log(this._isSizeSelected);
    console.log(this.details.size);
    this.cartItemCount = this.service.getCartItemCount();
    this.bagItemCount = this.service.getBagItemCount();
  }
  goBack(){
    this.router.navigate(['see-all-items']);
  }
  addToBag(Product:any){
    let tempObj = { "productId":Product,
                    "selectedSize":this.size }
    this.service.addToBag(tempObj).subscribe( data => {
      alert("suc");
      alert(data);
    },
    error => {
      alert("error");
      console.log(error);
    },
    () => {
      alert("error perm");
    }
  );
  //   if(this._isAddedInBag){
  //     this.router.navigate(['bag']);
  //     return;
  //   }
  //  this._isAddedInBag = this.service.addToBag(Product);
  //  if(!this._isAddedInBag){
  //      this.presentAlert();
  //  }
  }
  addToWishList(Product:any){
    if(Product['faveourite']){
      this.service.decreaseProduct(Product);
    }else{
    this.service.addProduct(Product);
    }
  }
  onClickSize(btn_no:any,btn_event_one:any,btn_event_two:any,btn_event_three:any,btn_event_four:any,btn_event_five:any,btn_event_six:any){
    this._isSizeSelected = true
    console.log("selected button ",btn_event_two);
     switch (btn_no) {
      case 1:
        // btn_event_one.color = 'danger';
        // btn_event_two.color = 'dark';
        // btn_event_three.color = 'dark';
        // btn_event_four.color = 'dark';
        // btn_event_five.color = 'dark';
        //btn_event_six.color = 'dark';
        this.size = btn_event_one.el.childNodes[0].innerText;
        break;
      case 2:
        // btn_event_one.color = 'dark';
        // btn_event_two.color = 'danger';
        // btn_event_three.color = 'dark';
        // btn_event_four.color = 'dark';
        // btn_event_five.color = 'dark';
        //btn_event_six.color = 'dark';
        this.size = btn_event_two.el.childNodes[0].innerText;
        break;
      case 3:
        // btn_event_one.color = 'dark';
        // btn_event_two.color = 'dark';
        // btn_event_three.color = 'danger';
        // btn_event_four.color = 'dark';
        // btn_event_five.color = 'dark';
        //btn_event_six.color = 'dark';
        this.size = btn_event_three.el.childNodes[0].innerText;
        break;
      case 4:
        // btn_event_one.color = 'dark';
        // btn_event_two.color = 'dark';
        // btn_event_three.color = 'dark';
        // btn_event_four.color = 'danger';
        // btn_event_five.color = 'dark';
        // btn_event_six.color = 'dark';
        this.size = btn_event_four.el.childNodes[0].innerText;
        break;
      case 5:
        // btn_event_one.color = 'dark';
        // btn_event_two.color = 'dark';
        // btn_event_three.color = 'dark';
        // btn_event_four.color = 'dark';
        // btn_event_five.color = 'danger';
        // btn_event_six.color = 'dark';
        this.size = btn_event_five.el.childNodes[0].innerText;
        break;
      case 6:
        // btn_event_one.color = 'dark';
        // btn_event_two.color = 'dark';
        // btn_event_three.color = 'dark';
        // btn_event_four.color = 'dark';
        // btn_event_five.color = 'dark';
        // btn_event_six.color = 'danger';
        this.size = btn_event_six.el.childNodes[0].innerText;
        break;
    }
   // this.details[0].size = size;
    //this.service.upDateData(this.details);
    console.log(this.details);
  }
viewImage(){
    //this.photoViewer.show('file:assets/images/male.jpg', 'My image title', {share: false});
    let imageName = "male.jpg";
    const ROOT_DIRECTORY = this.file.applicationStorageDirectory;//'file:///sdcard//';
    const downloadFolderName = 'tempDownloadFolder';
    
    //Create a folder in memory location
    this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
      .then((entries) => {
 
        //Copy our asset/img/logo.jpg to folder we created
        this.file.copyFile(this.file.applicationDirectory + "www/assets/images/", imageName, ROOT_DIRECTORY + downloadFolderName + '//', imageName)
          .then((entries) => {
 
            this.photoViewer.show(ROOT_DIRECTORY + downloadFolderName + "/" + imageName, 'Do you want to Share', {share: true});
            
           })
          .catch((error) => {
            alert('1 error ' + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert('2 error' + JSON.stringify(error));
      });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Reached Your Limit',
      message: '10 Items already in Bag.',
      buttons: [
        {
          text: 'Go To Bag',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['bag']);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
}
