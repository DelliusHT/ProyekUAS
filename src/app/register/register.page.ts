import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Register, RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  register: Register={
    nama: '',
    jenisKelamin: '',
    alamat: '',
    noHp: '',
    email: '',
    password: ''

  }
  registerId= null;

  constructor(private router: Router, private route: ActivatedRoute,private toastController: ToastController, private registerService: RegisterService) { }

  ngOnInit() {
    this.registerId = this.route.snapshot.params['id'];
    if(this.registerId){
      this.loadRegister();
    }
  }

  loadRegister(){
    this.registerService.getRegister(this.registerId).subscribe(res => {
      this.register = res;
    });
  }

  async register1(){
    if(this.registerId){
      this.registerService.updateRegister(this.register, this.registerId);
    }
    else{
      this.registerService.addRegister(this.register);
    }
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
