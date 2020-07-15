import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { NgForm } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public googleplus: GooglePlus,
    private router: Router,
    private modalController: ModalController,
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private storage: NativeStorage,
    private alertService: AlertService) { }

  ngOnInit() {
  }
  dismissLogin() {
    this.modalController.dismiss();
  }
  login(form: NgForm) {
    this.storage.clear();
    console.log("Token ", this.storage.getItem('token'));
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.alertService.presentToast("Logged In");
        //this.router.navigate(['tabs']);
        this.navCtrl.navigateRoot('/tabs');
      },
      error => {
        console.log(error);
      },
      () => {
        this.dismissLogin();
        this.navCtrl.navigateRoot('/tabs');
      }
    );
  }
  registerModal() {
    this.router.navigate(['register']);
  }
  googleLogin() {
    this.googleplus.login({
      webClientId: '128017845148-1orqc4ur9jrj7tc3d1f699kigtq8aomo.apps.googleusercontent.com',
      offline: true
    }).then(res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(suc => {
          alert('suc');
        }).catch(ns => {
          alert('ns');
        });
    });
  }

}
