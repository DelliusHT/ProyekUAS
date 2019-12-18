import { Component, OnInit } from '@angular/core'; 

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFirestore } from 'angularfire2/firestore';
import { Plugins } from '@capacitor/core';
import { Register, RegisterService } from 'src/app/register/register.service'; 
import { Meet, HomeService } from '../home.service';
const{Storage} = Plugins;

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
})
export class MeetingPage{ 
  index:string;


  meets:Meet[];
  meet: Meet= {
    namas:null,
    judul:null,
    idm:null,
    waktu: null,
    hari: null,
    url: null,
    date: null,
  }

  profile : Register[]; 
  reg : Register={
    iddd:null,
    nama:null,
    jenisKelamin:null,
    alamat:null,
    noHp:null,
    uid:null
  }
  
  imagess = 'https://cdn0-production-images-kly.akamaized.net/aZSqq34BqBgj1hLH2cHb5628pEQ=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1633836/original/001172300_1498393439-Google_Maps.jpg';
  router: any;

  constructor(private socialSharing:SocialSharing, private geolocation:Geolocation,private afstore:AngularFirestore, 
    private registerService : RegisterService, private dataSvc : HomeService) { }

    ngOnInit() {
      this.dataSvc.getMeets().subscribe(res => {
        this.meets = res;
      });
    }

  async ShareLocation(){
    const idmap = await Storage.get({ key : 'IdUser'});
    this.geolocation.getCurrentPosition().then((position)=>{
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      console.log(latitude);
      console.log(longitude);
      var maplink = "https://www.google.com/maps/?q="+latitude+","+longitude; 
      console.log(maplink)
      console.log(idmap); 
      this.index = idmap.value; 
      const linkmap = maplink; 
      this.meet.idm = idmap.value;
      this.meet.url = linkmap;
      this.registerService.getRegisters().subscribe(allreg => {
        this.profile = allreg;
        for(let data of this.profile){
          if(data.iddd == this.meet.idm){
            console.log("masuk if");
            this.meet.namas = data.nama;
            this.dataSvc.addMeet(this.meet).then(()=>{location.reload();});
            console.log(this.meet.namas + " dalam if");
          }
        }
      });
    });
  }

  async openUrl(item){
    console.log(item);
    this.index = item
    this.dataSvc.getMeets().subscribe(res=> {
      for(let data of this.meets){
        if(data === item){
          window.open(data.url);
        }
      } 
    })
  }

}