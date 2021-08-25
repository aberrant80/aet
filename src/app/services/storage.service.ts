import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  getData(key: string): any {
    var data = localStorage.getItem(key);
    if (data == null) {
      return null;
    }
    return JSON.parse(data);
  }

  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
