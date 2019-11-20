import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular'; 
import { Plugins} from '@capacitor/core';
import { RegisterService, Register } from 'src/app/register/register.service';
import { AngularFireStorage } from '@angular/fire/storage';  
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
const{Storage} = Plugins;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  
  index:string;
  g: boolean = true;
  imageURL: string;
  regisId = null;
  profile : Register[]; 
  imagess = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';

  regis: Register= {
    iddd: null,
    nama: null,
    jenisKelamin: null,
    alamat: null,
    noHp: null,
}


  constructor(private resSvc : RegisterService,
    private router: Router,
    private loadingCtrl: LoadingController, private route: ActivatedRoute,private loading:LoadingController,
    public afSG: AngularFireStorage, public http: Http, public afstore: AngularFirestore) { }


    async ngOnInit() {
      this.regisId = this.route.snapshot.params['id'];
      if (this.regisId){
        this.loadTodo();
      } 
     } 
      
     ionViewWillEnter(){
      
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

     saveTodo(){
      if(this.regisId){
        this.resSvc.updateRegister(this.regis, this.regisId);
        this.createPost();
      } 
      this.router.navigateByUrl('/home/tabs/profile'); 
    }

    fileChanged(event) {
      const files = event.target.files
      const data = new FormData()
      data.append('file',files[0])
      data.append('UPLOADCARE_STORE', '1')
      data.append('UPLOADCARE_PUB_KEY', '070be25fc4d496f21df3')
        
      this.http.post('https://upload.uploadcare.com/base/', data)
      .subscribe(event =>{
        console.log(event)
        this.imageURL = event.json().file
      }) 
    }

    async createPost(){
      const Iduser = await Storage.get({ key : 'IdUser'});
      this.index = Iduser.value;
      console.log('msk' +this.index);
      const image = this.imageURL 
      this.afstore.doc(`register/${this.index}`).update({
        posts: firestore.FieldValue.arrayUnion({
          image
        })
      })
      this.router.navigateByUrl('/home/tabs/profile')
    }
}
