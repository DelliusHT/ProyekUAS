import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Register, RegisterService } from './register.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Plugins} from '@capacitor/core';
import { AngularFireStorage } from '@angular/fire/storage';  
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
const{Storage} = Plugins; 
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  register: Register = {
    iddd: "",
    nama: "",
    jenisKelamin: "", 
    alamat: "",
    noHp: "",
    uid: ""
  }

  index:string;
  imageURL: string;
  username: string = "";
  password: string = "";

  imagess = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private toastController: ToastController, 
    private registerService: RegisterService,
    private afAuth: AngularFireAuth,
    public afSG: AngularFireStorage, public http: Http, public afstore: AngularFirestore) { }

  ngOnInit() {
  }

  async register1(){
    const { username,password } = this
    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username , password)
      this.register.iddd = res.user.uid;
      //console.log(this.register.id);
      console.log(res)
      // await Storage.set({
      //   key: 'IdUser',
      //   value: res.user.uid
      // });
    } catch(error){
      console.dir(error)
    }
    this.registerService.addRegister(this.register);
    console.log(this.register);
    const toast = await this.toastController.create({
      message: 'Your account is registered',
      duration: 1000,
    });
    toast.present();
    this.router.navigateByUrl('/login');
  }

  async cancel(){
    const toast = await this.toastController.create({
      message: 'Canceled',
      duration: 1000,
    });
    toast.present();
    this.router.navigateByUrl('/login');
  }

  // fileChanged(event) {
  //   const files = event.target.files
  //   const data = new FormData()
  //   data.append('file',files[0])
  //   data.append('UPLOADCARE_STORE', '1')
  //   data.append('UPLOADCARE_PUB_KEY', '070be25fc4d496f21df3')
      
  //   this.http.post('https://upload.uploadcare.com/base/', data)
  //   .subscribe(event =>{
  //     console.log(event)
  //     this.imageURL = event.json().file
  //   }) 
  // }

  // async createPost(){
  //   const Iduser = await Storage.get({ key : 'IdUser'});
  //   this.index = Iduser.value; 
  //   const image = this.imageURL 
  //   this.afstore.doc(`register/${this.index}`).update({
  //     uid: image
  //   })
  //   this.router.navigateByUrl('/home/tabs/profile')
  // }
}
