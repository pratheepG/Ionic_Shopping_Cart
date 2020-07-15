import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx' ;

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss'],
})

export class SearchModalPage implements OnInit {
  @ViewChild('inputId') ionInput;
  _listVisiblity = false;
  searchedObject = [];
  searchObject = [
  {
    "id":"1",
    "value":"Shirts"
  },{
    "id":"1",
    "value":"Pants"
  },{
    "id":"1",
    "value":"Electronics"
  },{
    "id":"1",
    "value":"Computers"
  },{
    "id":"1",
    "value":"Smart Phone"
  },{
    "id":"1",
    "value":"Shoes"
  }
]
  isRecording: boolean=false;
  matches: string[];
  constructor(private modalController:ModalController,
              private camera: Camera,
              private speechRecognition: SpeechRecognition, 
              private plt: Platform, 
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.getPermission();
   }

  searchList(event:any) {
     this.searchedObject = this.searchObject.filter((Item) => {
      return Item.value.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1;
    });
     this._listVisiblity = true;
     console.log(event.detail.value);
  }

  onEndFocus(event:any) {
  //  this._listVisiblity = false;
    console.log(event);
  }

  dismissModal() {
    this.modalController.dismiss()
  }

  ngAfterViewInit(): void {
    this.ionInput.ionFocus._isScalar=true;
   console.log(this.ionInput.ionFocus._isScalar); 
  // console.log(this.ionInput.nativeElement.el.autofocus);
  }

  openCamAndGallary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }

  stopListening() {
    
  }
 
  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }
 
  startListening() {
    let options = {
      language: 'en-US'
    }
    if(!this.isRecording){
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }else{
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }
  console.log(this.matches);
  }

}
