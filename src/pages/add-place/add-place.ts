import { Component } from '@angular/core';
import { IonicPage, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NgForm } from '@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location.model';
import { PlacesService } from '../../services/places.service';
import { File } from '@ionic-native/file';

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
    private file: File,
    private geolocation: Geolocation,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private camera: Camera,
    private placesService: PlacesService) { }

  onSubmit(form: NgForm) {
    this.placesService.addPlace(
      form.value.title,
      form.value.description,
      this.location,
      this.imageUrl
    );
    form.reset();
    this.location = {
      latitude: 40.7624324,
      longitude: -72.9759827
    };
    this.imageUrl = '';
    this.isLocationSet = false;
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
        var filename = imageData.substring(imageData.lastIndexOf('/') + 1);
        var path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
        this.file.moveFile(path, filename, this.file.dataDirectory, filename)
          .then(data => {
            console.log(JSON.stringify(data));
            this.imageUrl = this.win.Ionic.WebView.convertFileSrc(data.nativeURL);
          })
          .catch(error => {
            console.log(JSON.stringify(error));
            this.imageUrl = '';
            const toast = this.toastController.create({
              message: 'Could not save the image. try again.',
              duration: 4000
            });
            toast.present();
            this.file.removeFile(path, filename);
          });
      })
      .catch(error => {
        console.log(error);
        const toast = this.toastController.create({
          message: 'Could not take the photo. try again.',
          duration: 4000
        });
        toast.present();
      });
  }
}
