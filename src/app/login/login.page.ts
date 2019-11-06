import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RegisterService, Register } from '../register/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  isLoading = false;
  register: Register[];
 
  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
  }

  onLogin() {
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
