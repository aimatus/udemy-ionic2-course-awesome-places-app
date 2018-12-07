import { Place } from '../models/place.model';
import { Location } from '../models/location.model';

export class PlacesService {
    private places: Place[] = [];

    addPlace(title: string, description: string, location: Location, imageUrl: string) {
        const place = new Place(title, description, location, imageUrl);
        this.places.push(place);
    }

    loadPlaces() {
        return this.places.slice();
    }
}