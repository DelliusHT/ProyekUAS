import { Component, OnInit } from '@angular/core';
import { Fav, HomeService } from '../home.service';
import { RegisterService } from 'src/app/register/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Plugins} from '@capacitor/core';
const{Storage} = Plugins;
 
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
 
  testid:string;
  term3 = []; 
  term5 = []; 
  test23 = []; 
  favs:Fav[];
  favse:Fav[];
  fav:Fav={
    idf:null,
    idz:null,
    val:null,
    id:null
  }
 
  imagess = 'https://image.shutterstock.com/z/stock-vector-photo-coming-soon-image-eps-86220151.jpg';
  constructor(private dataSvc : HomeService,
    private resSvc : RegisterService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,public afs: AngularFirestore) { }
 
  async ngOnInit() {
 
    const Iduser = await Storage.get({ key : 'IdUser'});
    console.log(Iduser);
    this.testid = Iduser.value;
        this.dataSvc.getFavs().subscribe(res => {
          this.favs = res;
          console.log(this.favs)
          this.term3 = [];
          this.test23 = [];
          for(let data of this.favs){
            if(data.idz == this.testid){
             this.term3.push(data);
             this.dataSvc.getTodo(data.idf).subscribe(res => {
              res.langkah = data.idf 
              this.test23.push(res);
            });
             
            }
          }
        });
    }
 
    // async ionViewWillEnter() {
 
    //   const Iduser = await Storage.get({ key : 'IdUser'});
    //   console.log(Iduser);
    //   this.testid = Iduser.value;
    //       this.dataSvc.getFavs().subscribe(res => {
    //         this.favs = res;
    //         this.term3 = [];
    //         this.test23 = [];
    //         for(let data of this.favs){
    //           if(data.idz == this.testid ){
    //            this.term3.push(data);
    //            this.dataSvc.getTodo(data.idf).subscribe(res => {
    //             res.langkah = data.idf
    //             this.test23.push(res);
    //           });
               
    //           }
    //         }
    //       });
    //   }
 
      remove(item){       
        console.log(item.id)
        // this.dataSvc.getFavs().subscribe(res => {
        // this.favse = res;
        // console.log(this.favse)
        // console.log(item.id)
        // for(let data of this.favse){
        //   if(data.idf == item.id){
        //     console.log(data.id)
        //      this.dataSvc.removeFav(data.id);
        //   }
        // }      
        // }); 
      }
 
}