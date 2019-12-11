import { Component, OnInit } from '@angular/core';
import { HomeService, Todo } from '../home.service';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
})
export class MeetingPage{

  constructor(private socialSharing:SocialSharing, private geolocation:Geolocation) { }

  ShareLocation(){
    this.socialSharing.canShareViaEmail().then(() => {
      console.log("Bisa pake email");
    }).catch((err) => {
      console.log(err);
    });
    this.geolocation.getCurrentPosition().then((position)=>{
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);
    var maplink = "https://www.google.com/maps/?q="+latitude+","+longitude;
    this.socialSharing.shareViaEmail(maplink, 'location',['chubi.axe@gmail.com']).then(() => {
      console.log("success");
    }).catch((err) => {
      console.log(err);
    });
    },(err)=>{
      alert(JSON.stringify(err));
    })
  }

}
