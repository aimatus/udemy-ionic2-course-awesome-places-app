import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';
import { PlacePage } from '../place/place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(
    public modalController: ModalController,
    private placesService: PlacesService) { }

  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalController.create(PlacePage, { place: place, index: index });
    modal.present();
    modal.onDidDismiss(() => {
      this.places = this.placesService.loadPlaces();
    });
  }

}
