import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Manufacturer } from '../Manufacturer';
import { ManufacturerService } from '../manufacturer.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css'],
})
export class ManufacturerComponent implements OnInit {
  public manufacturers: Manufacturer[] = [];

  constructor(private manufacturerService: ManufacturerService) {}

  ngOnInit(): void {
    this.getManufaturers();
  }

  public getManufaturers(): void {
    this.manufacturerService.getManufaturers().subscribe(
      (response: Manufacturer[]) => {
        console.log(response);
        this.manufacturers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
