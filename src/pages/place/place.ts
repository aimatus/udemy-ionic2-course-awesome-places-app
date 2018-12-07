import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Place } from '../../models/place.model';

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  place: Place;

  constructor(
    public navParams: NavParams,
    private viewController: ViewController) {
    this.place = this.navParams.get('place');
  }

  onLeave() {
    this.viewController.dismiss();
  }

  onDelete() {
    this.onLeave();
  }

}
