import { Component, OnInit } from '@angular/core';  
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  isLoading = false;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  onLoading() {
    this.isLoading = true;
    this.loadingCtrl.create({keyboardClose: true, message: 'Loading in...'})
        .then(loadingEl => {
            loadingEl.present();

            setTimeout(() => {
                this.isLoading = false;
                loadingEl.dismiss();
                this.router.navigateByUrl('/home/tabs/profile/edit-profile"'); 
            }, 1000);
        })
}

}
