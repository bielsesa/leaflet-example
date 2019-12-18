import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopUpService {
  constructor() {}

  makeCapitalPopup(data: any): string {
    return (
      `` +
      `<div>Capital: ${data.properties.name}</div>` +
      `<div>Population: ${data.properties.population.toLocaleString(
        'en-us'
      )}</div>`
    );
  }
}
