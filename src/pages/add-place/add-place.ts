import { Component } from '@angular/core';
import { IonicPage, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NgForm } from '@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location.model';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  private win: any = window;
  imageUrl = '';

  location: Location = {
    latitude: 40.7624324,
    longitude: -72.9759827
  };

  isLocationSet = false;

  constructor(
    private modalController: ModalController,
    private geolocation: Geolocation,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private camera: Camera) { }

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
    const loader = this.loadingController.create({
      content: 'Getting your location'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(location => {
        this.location.latitude = location.coords.latitude;
        this.location.longitude = location.coords.longitude;
        this.isLocationSet = true;
        loader.dismiss();
      })
      .catch(error => {
        console.log(error);
        const toast = this.toastController.create({
          message: 'Could\'t get location. Please, select it manually.',
          duration: 4000
        });
        loader.dismiss();
        toast.present();
      });
  }

  onTakePhoto() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options)
      .then(imageData => {
        console.log(imageData);
        this.imageUrl = this.win.Ionic.WebView.convertFileSrc(imageData);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
