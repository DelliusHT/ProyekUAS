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
  apiKey: "AIzaSyAUm7pdPCLBJhPVgizZ38UeZbt-Vhdw8fQ",
  authDomain: "proyekuas-25e57.firebaseapp.com",
  databaseURL: "https://proyekuas-25e57.firebaseio.com",
  projectId: "proyekuas-25e57",
  storageBucket: "proyekuas-25e57.appspot.com",
  messagingSenderId: "881821814775",
  appId: "1:881821814775:web:933cefaebf91797b9228f2",
  measurementId: "G-WF83BHYL16"

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
