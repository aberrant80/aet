import { Injectable } from '@angular/core';
import { MaterialGrindLocation } from '../material-grind/material-grind.model';
import { StorageService } from './storage.service';

const materialGrindStorageKey: string = 'MaterialGrind';

@Injectable({
  providedIn: 'root'
})
export class MaterialGrindService {
  locations: MaterialGrindLocation[];

  constructor(private storageService: StorageService) {
    this.locations = storageService.getData(materialGrindStorageKey) || [];
  }

  getMaterialGrindLocations(): MaterialGrindLocation[] {
    return this.locations;
  }

  addItem(item: MaterialGrindLocation): void {
    this.locations.push(item);
    this.save();
  }

  updateItem(item: MaterialGrindLocation, changes: any): void {
    const index = this.locations.indexOf(item);
    this.locations[index] = { ...item, ...changes };
    this.save();
  }

  deleteItem(item: MaterialGrindLocation): void {
    const index = this.locations.indexOf(item);
    this.locations.splice(index, 1);
    this.save();
  }

  private save(): void {
    this.storageService.setData(materialGrindStorageKey, this.locations);
  }
}
