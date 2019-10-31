import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  async register(){
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
