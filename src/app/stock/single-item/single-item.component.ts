import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StockItem } from '../stockItem.model';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css'],
  providers: [StockService]
})
export class SingleItemComponent implements OnInit {


  public item: StockItem = null;
  item_id= null;
  constructor(public stockService: StockService,
              public route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe( (paramMap: ParamMap) => {

     if (paramMap.has('item_no')) {

      this.item_id = paramMap.get('item_no');
      this.stockService.getItem(this.item_id).subscribe(res => {

        this.item = res;
      });
     } else {


    }

    });
  }
  onAddToInventory(itemNo: number) {
    this.stockService.addItemToInventory(itemNo);
  }
}
