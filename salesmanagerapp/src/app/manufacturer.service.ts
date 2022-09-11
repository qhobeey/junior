import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manufacturer } from './Manufacturer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManufacturerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getManufaturers(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(
      `${(this, this.apiServerUrl)}/manufacturers`
    );
  }

  public addManufaturer(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.http.post<Manufacturer>(
      `${(this, this.apiServerUrl)}/manufacturers/create`,
      manufacturer
    );
  }

  public getManufaturer(manufacturerid: number): Observable<Manufacturer> {
    return this.http.get<Manufacturer>(
      `${(this, this.apiServerUrl)}/manufacturer/${manufacturerid}`
    );
  }
  public getManufaturerInvoice(
    manufacturerid: number
  ): Observable<Manufacturer> {
    return this.http.get<Manufacturer>(
      `${(this, this.apiServerUrl)}/manufacturer/${manufacturerid}/retailers`
    );
  }

  public updateManufaturer(
    manufacturer: Manufacturer
  ): Observable<Manufacturer> {
    return this.http.post<Manufacturer>(
      `${(this, this.apiServerUrl)}/manufacturers/update`,
      manufacturer
    );
  }
}
