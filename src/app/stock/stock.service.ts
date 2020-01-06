import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { StockItem } from './stockItem.model';
import {environment} from '../../environments/environment';
import { stringify } from 'querystring';
import { map } from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';
import { Router } from '@angular/router';



@Injectable()
export class StockService {

  private items: StockItem[] = [];
  private serverUrl = environment.ServerUrl;
  private itemmsUpdated = new Subject<{items: StockItem[], itemCount: number}>();

  constructor(private http: HttpClient, private router: Router) {


  }

  getItems() {

    console.log('in stock service');
    this.http.get<StockItem[]>(this.serverUrl + '/api/stock/').subscribe(res => {
      console.log(res);
      this.items = res;
      this.itemmsUpdated.next({items: res, itemCount: res.length});

    });
  }

  deleteItem( itemNo: number) {

    console.log('in stock service' + this.serverUrl + '/api/stock/' + itemNo);
    return this.http.delete(this.serverUrl + '/api/stock/' + itemNo);
  }

  addItemToInventory( itemNo: number) {

    console.log('in stock service' + this.serverUrl + '/api/inventory/', {itemNo});
    this.http.post(this.serverUrl + '/api/inventory/', {item_no: itemNo})
    .subscribe(res => {
      console.log(res);
      this.router.navigate(['inventory']);
    });
  }

  getItem( item_no: Number){

    return this.http
    .get<{item_no: number, name: string, details: string}>(this.serverUrl + '/api/stock/' + item_no);

  }
  getItemsUpdateListener() {
    return this.itemmsUpdated.asObservable();
  }

  addItem(name: String, details: String) {

    console.log('res');

    this.http.post(this.serverUrl + '/api/stock/', {name, details})
    .subscribe(res => {
      console.log(res);
      this.router.navigate(['']);
    });
  }
}
