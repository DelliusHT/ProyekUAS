import { Component, OnInit } from '@angular/core';
import { HomeService, Todo } from '../home.service';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFirestore } from 'angularfire2/firestore';
import { Plugins } from '@capacitor/core';

const{Storage} = Plugins;

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
})
export class MeetingPage{
  imageURL: string;
  index:string;

  todo: Todo= {
    idd:null,
    title: null,
    deskripsi: null,
    nmbahan: null,
    takaran: null,
    langkah: null,
    takasaji: null,
    waktusiap: null,
    totalmasak: null,
    createdAt: new Date().getTime(),
    name: null,
    date: null,
    alamat: null,
    phone: null,
    time: null,
    random: null,
    username: null,
    uid: null
  }

  constructor(private socialSharing:SocialSharing, private geolocation:Geolocation,private afstore:AngularFirestore) { }

  ShareLocation(){
    this.geolocation.getCurrentPosition().then((position)=>{
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);
    var maplink = "https://www.google.com/maps/?q="+latitude+","+longitude;
    const idmap = Storage.get({key : 'idTl'})
    const linkmap = maplink;
    this.afstore.doc(`todos/${this.index}`).update({
      random : linkmap
    })
    // this.socialSharing.shareViaEmail(maplink, 'location',['chubi.axe@gmail.com']).then(() => {
    //   console.log("success");
    // }).catch((err) => {
    //   console.log(err);
    // });
    // },(err)=>{
    //   alert(JSON.stringify(err));
    })
  }

}
