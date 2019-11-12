import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RegisterService, Register } from '../register/register.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Plugins} from '@capacitor/core';

const{Storage} = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";
  msg: string = "";
  isLoading = false;

 
  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  async onLogin() {
    const { username, password } = this
    try{
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@gmail.com', password)
      console.log(res.user.uid)
      console.log(res.user.email)
      await Storage.set({
        key: 'IdUser',
        value: res.user.uid
      });
    } catch(err){
      console.dir(err)
      if(err.code){
        this.msg = err.code
      }
    }
    if(this.msg != ""){
      alert("Email atau password yang ada masukkan tidak tepat")
      this.username = ""
      this.password = ""
      this.msg = ""
    }
    else if(password=="" || username==""){
      alert("Email atau password yang ada masukkan tidak tepat")
      this.username = ""
      this.password = ""
      this.msg = ""
    }
    else{
      this.loading();
    }
}

  loading(){
    this.isLoading = true;
    this.loadingCtrl.create({keyboardClose: true, message: 'Logging in...'})
        .then(loadingEl => {
            loadingEl.present();

            setTimeout(() => {
                this.isLoading = false;
                loadingEl.dismiss();
                this.router.navigateByUrl('/home'); 
            }, 1500);
        })
  }

  register1(){
    this.router.navigateByUrl('/register');
  }

}
