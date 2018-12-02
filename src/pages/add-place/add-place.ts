import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NgForm } from '@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location.model';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  location: Location = {
    latitude: 40.7624324,
    longitude: -72.9759827
  };

  isLocationSet = false;

  constructor(
    private modalController: ModalController,
    private geolocation: Geolocation) { }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onOpenMap() {
    const modal = this.modalController.create(SetLocationPage, { location: this.location, isLocationSet: this.isLocationSet });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.location = data.location;
        this.isLocationSet = true;
      }
    });
  }

  onLocate() {
    this.geolocation.getCurrentPosition()
      .then(location => {
        this.location.latitude = location.coords.latitude;
        this.location.longitude = location.coords.longitude;
        this.isLocationSet = true;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
