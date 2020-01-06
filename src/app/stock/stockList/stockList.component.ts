import { Component, OnInit, OnDestroy } from '@angular/core';

import { StockService } from '../stock.service';
import { StockItem } from '../stockItem.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stockList.component.html',
  styleUrls: ['./stockList.component.css'],
  providers: [StockService]
})

export class StockListComponent implements OnInit, OnDestroy {



  number = 0;
  public items: StockItem[] = [];
  private itemsSubscription: Subscription ;

  isLoading = false;

  constructor(public stockService: StockService) {}

  onDelete(itemNo: number) {

    console.log( 'delete item no :' + itemNo);
    this.stockService.deleteItem(itemNo).subscribe(mess => {
      this.stockService.getItems();
    });

  }
  onAddToInventory(itemNo: number) {


    this.stockService.addItemToInventory(itemNo);

  }

  ngOnInit() {

    this.stockService.getItems();
    this.itemsSubscription = this.stockService.getItemsUpdateListener()
    .subscribe((data: {items: StockItem[], itemCount: number}) => {
      this.isLoading = false;
      this.items = data.items;
      this.number = this.items.length;


    });

  }
  ngOnDestroy() {

    this.itemsSubscription.unsubscribe();
  }

  onLogout() {

  }
}
