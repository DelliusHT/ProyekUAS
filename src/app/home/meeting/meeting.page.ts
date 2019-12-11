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
    this.geolocation.getCurrentPosition().then((position)=>{
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var maplink = "http://www.google.com/maps/?q="+latitude+","+longitude;
    this.socialSharing.share("i am here...","Location"," ",maplink).then((data)=>{
       
    },(err)=>{
      alert(JSON.stringify(err));
    })
    },(err)=>{
      alert(JSON.stringify(err));
    })
  }

}
