import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { SetLocationPage } from '../set-location/set-location';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  constructor(private modalController: ModalController) { }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onOpenMap() {
    const modal = this.modalController.create(SetLocationPage);
    modal.present();
  }
}
