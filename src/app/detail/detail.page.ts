import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IngredientPage } from '../ingredient/ingredient.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async ingredient(){
    const modal = await this.modalController.create({
      component: IngredientPage
    });
    return await modal.present();
  }
}
