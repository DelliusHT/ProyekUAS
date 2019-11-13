import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular'; 
import { Plugins} from '@capacitor/core';
import { RegisterService, Register } from 'src/app/register/register.service';
const{Storage} = Plugins;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  
  regisId = null;
  profile : Register[]; 

  regis: Register= {
    id: null,
    nama: null,
    jenisKelamin: null,
    alamat: null,
    noHp: null,
}

  constructor(private resSvc : RegisterService,
    private router: Router,
    private loadingCtrl: LoadingController, private route: ActivatedRoute,private loading:LoadingController) { }


    async ngOnInit() {
      this.regisId = this.route.snapshot.params['id'];
      if (this.regisId){
        this.loadTodo();
      } 
     } 
      
     async loadTodo(){
      const loading = await this.loading.create({
        message: 'Loading...'
      });
      await loading.present();
      this.resSvc.getRegister(this.regisId).subscribe(res => {
        loading.dismiss();
        this.regis = res;
      });
    console.log(this.regis);
     }

}
