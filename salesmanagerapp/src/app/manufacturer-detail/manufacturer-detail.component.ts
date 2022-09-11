import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Manufacturer } from '../Manufacturer';
import { ManufacturerService } from '../manufacturer.service';

@Component({
  selector: 'app-manufacturer-detail',
  templateUrl: './manufacturer-detail.component.html',
  styleUrls: ['./manufacturer-detail.component.css'],
})
export class ManufacturerDetailComponent implements OnInit {
  public id: any;
  public manufacturer: any;
  public invoices: any;

  constructor(
    private route: ActivatedRoute,
    private manufacturerService: ManufacturerService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getManufaturer();
  }

  public getManufaturer(): void {
    this.manufacturerService.getManufaturerInvoice(this.id).subscribe(
      (response) => {
        console.log(response);
        this.invoices = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
