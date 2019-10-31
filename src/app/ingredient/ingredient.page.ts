import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.page.html',
  styleUrls: ['./ingredient.page.scss'],
})
export class IngredientPage implements OnInit {

  constructor(private modalController: ModalController) { }
  async close(){
    await this.modalController.dismiss();
  }
  ngOnInit() {
  }
  
  
}
