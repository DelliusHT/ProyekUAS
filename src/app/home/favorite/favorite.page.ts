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
  test23 = [];
  favs:Fav[];
  fav:Fav={
    idf:null,
    idz:null,
    val:null,
    id:null
  }
 
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
          this.term3 = [];
          this.test23 = [];
          for(let data of this.favs){
            if(data.idz == this.testid ){
             this.term3.push(data);
             this.dataSvc.getTodo(data.idf).subscribe(res => {
              res.langkah = data.idf
              this.test23.push(res);
            });
             
            }
          }
        });
    }
 
}