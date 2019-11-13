import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Register, RegisterService } from './register.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Plugins} from '@capacitor/core';

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
    noHp: ""
  }

  username: string = "";
  password: string = "";

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private toastController: ToastController, 
    private registerService: RegisterService,
    private afAuth: AngularFireAuth) { }

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

}
