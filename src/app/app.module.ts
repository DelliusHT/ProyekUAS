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

export const firebaseConfig = {
  apiKey: "AIzaSyB6WkozZBuIFZcVJXPrKpFI1bvFE-lGwLs",
  authDomain: "proyekuas-3fb74.firebaseapp.com",
  databaseURL: "https://proyekuas-3fb74.firebaseio.com",
  projectId: "proyekuas-3fb74",
  storageBucket: "proyekuas-3fb74.appspot.com",
  messagingSenderId: "467545500271",
  appId: "1:467545500271:web:e2264b798e9209a3903b9a" 
};

@NgModule({
  declarations: [AppComponent, IngredientPage],
  entryComponents: [IngredientPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig), AngularFireStorageModule ,AngularFirestoreModule, AngularFireAuthModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,File 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
