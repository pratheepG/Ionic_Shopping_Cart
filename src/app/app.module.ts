import { AngularFireModule } from 'angularfire2';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { InterceptorService } from './interceptor/interceptor.service';

export const firebaseConfig = {
  apiKey: 'AIzaSyDhMZeR6YwZyEqnxc8nEcJDKUbqSLYAfW8',
  authDomain: 'gauth-d439a.firebaseapp.com',
  databaseURL: 'https://gauth-d439a.firebaseio.com',
  projectId: 'gauth-d439a',
  storageBucket: 'gauth-d439a.appspot.com',
  messagingSenderId: '128017845148',
  appId: '1:128017845148:web:463da5e9671962dc651659',
  measurementId: 'G-Q0701GKRJG'
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            HttpClientModule,        
            AngularFireModule.initializeApp(firebaseConfig)],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    PhotoViewer,
    File,
    Camera,
    SpeechRecognition,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    NativeStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}