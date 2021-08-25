import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
// import { MatTableModule } from '@angular/material/table';
// import { MatSortModule } from '@angular/material/sort';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { DemoMaterialModule } from '../material.module';

import { AppComponent } from './app.component';
import { MaterialGrindComponent } from './material-grind/material-grind.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DemoMaterialModule
    // MatTableModule,
    // MatSortModule,
    // MatPaginatorModule,
    // MatFormFieldModule,
  ],
  declarations: [AppComponent, MaterialGrindComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
