import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerDetailComponent } from './manufacturer-detail/manufacturer-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/manufacturers', pathMatch: 'full' },
  { path: 'manufacturers', component: ManufacturerComponent },
  { path: 'manufacturers/:id', component: ManufacturerDetailComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ManufacturerComponent,
    ManufacturerDetailComponent,
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [ManufacturerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
