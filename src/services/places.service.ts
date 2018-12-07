import { Place } from '../models/place.model';
import { Location } from '../models/location.model';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class PlacesService {
    private places: Place[] = [];

    constructor(private storage: Storage) { }

    addPlace(title: string, description: string, location: Location, imageUrl: string) {
        const place = new Place(title, description, location, imageUrl);
        this.places.push(place);
        this.storage.set('places', this.places)
            .then()
            .catch(() => {
                this.places.splice(this.places.indexOf(place));
            });
    }

    loadPlaces() {
        return this.places.slice();
    }

    fecthPlaces() {
        this.storage.get('places')
            .then((places: Place[]) => {
                this.places = places != null ? places : [];
            })
            .catch(error => {
                console.log(error);
            });
    }

    deletePlace(index: number) {
        this.places.splice(index, 1);
    }
}