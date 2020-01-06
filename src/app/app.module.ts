import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatGridListModule
  , MatCardModule, MatToolbarModule, MatButtonModule, MatTableModule, MatSortModule } from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { StockListComponent } from './stock/stockList/stockList.component';
import {  HttpClientModule } from '@angular/common/http';
import { CreateItemComponent } from './stock/createItem/createItem.component';
import { InventoryListComponent } from './Inventory/inventoryList/inventory-list/inventory-list.component';
import { CommonModule } from '@angular/common';
import { SingleItemComponent } from './stock/single-item/single-item.component';



@NgModule({
  declarations: [AppComponent, SingleItemComponent , InventoryListComponent, NavbarComponent,
     CreateItemComponent, StockListComponent, InventoryListComponent],
  imports: [BrowserModule, CommonModule , MatTableModule , MatSortModule, AppRoutingModule, HttpClientModule , MatInputModule
    , MatGridListModule, FormsModule, ReactiveFormsModule , BrowserAnimationsModule ,
     MatFormFieldModule, MatCardModule , MatCardModule, MatButtonModule, MatToolbarModule],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule {}
