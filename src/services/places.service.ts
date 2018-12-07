import { Place } from '../models/place.model';
import { Location } from '../models/location.model';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';

@Injectable()
export class PlacesService {
    private places: Place[] = [];

    constructor(
        private storage: Storage,
        private file: File) { }

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
        return this.storage.get('places')
            .then((places: Place[]) => {
                this.places = places != null ? places : [];
                return this.places.slice();
            })
            .catch(error => {
                console.log(error);
            });
    }

    deletePlace(index: number) {
        const place = this.places[index];
        this.places.splice(index, 1);
        this.storage.set('places', this.places)
            .then(() => { this.removeFile(place) })
            .catch(error => { console.log(error) });
    }

    private removeFile(place: Place) {
        const filename = place.imageUrl.substring(place.imageUrl.lastIndexOf('/') + 1);
        this.file.removeFile(this.file.dataDirectory, filename)
            .then(() => { console.log('File removed') })
            .catch(() => {
                console.log('Error while deleting file');
                this.addPlace(place.title, place.description, place.location, place.imageUrl);
            });
    }
}