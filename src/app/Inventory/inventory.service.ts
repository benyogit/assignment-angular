import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { InventoryItem } from './inventoryItem.model';
import {environment} from '../../environments/environment';
import { stringify } from 'querystring';
import { map } from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';
import { Router } from '@angular/router';



@Injectable()
export class InventoryService {

  private inventoryArray: InventoryItem[] = [];
  private serverUrl = environment.ServerUrl;
  private inventoryItemUpdated = new Subject<{inventoryItems: InventoryItem[], itemCount: number}>();

  constructor(private http: HttpClient, private router: Router) {


  }

  getInventoryItems() {

    this.http.get<{message: string, inventoryItems: any}>(this.serverUrl + '/api/inventory/')
    .subscribe(res => {

      console.log(res.inventoryItems);

      this.inventoryArray = res.inventoryItems;
      console.log(this.inventoryArray);
      this.inventoryItemUpdated.next({inventoryItems: res.inventoryItems, itemCount: 0 });
    });
  }
  getInventoryUpdateListener() {
    return this.inventoryItemUpdated.asObservable();
  }
  updateAmount(amount: any, inventory_code: any){

    return this.http.put(this.serverUrl + '/api/inventory/update/' + inventory_code, {amount});
  }
  deleteInventoryItem( inventory_code: string){

    return this.http.delete(this.serverUrl + '/api/inventory/delete/' + inventory_code);
  }
  /*
  // tslint:disable-next-line: ban-types
  addItem(name: String, details: String) {

    console.log('res');

    this.http.post(this.serverUrl + '/api/stock/', {name, details})
    .subscribe(res => {
      console.log(res);
      this.router.navigate(['']);
    });
  }*/
}
