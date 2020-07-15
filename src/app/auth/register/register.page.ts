import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router,
              private modalController: ModalController,
              private authService: AuthenticationService,
              private navCtrl: NavController,
              private alertService: AlertService) { }

  ngOnInit() {
  }
  register(form: NgForm) {
    this.authService.register(form.value.fName, form.value.lName, form.value.email, form.value.password).subscribe(
      data => {
        this.authService.login(form.value.fName, form.value.password).subscribe(
          data => {
          },
          error => {
            console.log(error);
          },
          () => {
            this.dismissRegister();
            this.navCtrl.navigateRoot('/tabs');
          }
        );
        this.alertService.presentToast(data['message']);
      },
      error => {
        console.log(error);
      },
      () => {
        
      }
    );
  }

  loginModal() {
    console.log("alert");
    this.router.navigate(['login']);
  }

  dismissRegister() {
    this.modalController.dismiss();
  }

}
