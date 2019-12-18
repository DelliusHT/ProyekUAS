import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IngredientPage } from './ingredient/ingredient.page';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFireStorageModule } from '@angular/fire/storage';


import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx'; 
import { HttpModule } from '@angular/http'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

export const firebaseConfig = {
  //edous
    apiKey: "AIzaSyAUm7pdPCLBJhPVgizZ38UeZbt-Vhdw8fQ",
    authDomain: "proyekuas-25e57.firebaseapp.com",
    databaseURL: "https://proyekuas-25e57.firebaseio.com",
    projectId: "proyekuas-25e57",
    storageBucket: "proyekuas-25e57.appspot.com",
    messagingSenderId: "881821814775",
    appId: "1:881821814775:web:66c7c6236c6f70719228f2",
    measurementId: "G-BMG6CE071S"
    
    // fidel
    // apiKey: "AIzaSyAIAka1wLaOY-JuPLQ6V4yFoSVkZ5UBPAQ",
    // authDomain: "proyekcrossplatform-dcc79.firebaseapp.com",
    // databaseURL: "https://proyekcrossplatform-dcc79.firebaseio.com",
    // projectId: "proyekcrossplatform-dcc79",
    // storageBucket: "proyekcrossplatform-dcc79.appspot.com",
    // messagingSenderId: "556586525425",
    // appId: "1:556586525425:web:4ca943364bc37d96a0ff50",
    // measurementId: "G-ZETWP2YS01"

    // //gs
    // apiKey: "AIzaSyB6WkozZBuIFZcVJXPrKpFI1bvFE-lGwLs",
    // authDomain: "proyekuas-3fb74.firebaseapp.com",
    // databaseURL: "https://proyekuas-3fb74.firebaseio.com",
    // projectId: "proyekuas-3fb74",
    // storageBucket: "proyekuas-3fb74.appspot.com",
    // messagingSenderId: "467545500271",
    // appId: "1:467545500271:web:e2264b798e9209a3903b9a" 

    //yo
    // apiKey: "AIzaSyBt5t_wRR5ScLsnvZ8cQkpdxEJUyIFwYvY",
    // authDomain: "dapurayam-e457c.firebaseapp.com",
    // databaseURL: "https://dapurayam-e457c.firebaseio.com/",
    // projectId: "dapurayam-e457c",
    // storageBucket: "dapurayam-e457c.appspot.com",
    // messagingSenderId: "1028138858531",
    // appId: "1:1028138858531:web:4681ac81d5d82ae7935996",
    // measurementId: "G-V45T919RJ5"
    
};

@NgModule({
  declarations: [AppComponent, IngredientPage],
  entryComponents: [IngredientPage],
  imports: [BrowserModule, IonicModule.forRoot(),HttpModule, AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig), AngularFireStorageModule ,AngularFirestoreModule, AngularFireAuthModule],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,File
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
