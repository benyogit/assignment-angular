import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from '../../inventory.service';
import { InventoryItem } from '../../inventoryItem.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
  providers: [InventoryService]
})
export class InventoryListComponent implements OnInit, OnDestroy {


  public items: InventoryItem[] = [];

  // tslint:disable-next-line:ban-types
  public wrongInput: Boolean = false;
  displayedColumns: string[] = ['Item No', 'Name', 'Amount',
   'Inventory Code', 'Add/Subtract Amount', 'Delete'];
  dataSource = new MatTableDataSource(this.items);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private inventoryItemsSubscription: Subscription ;
  constructor(private http: HttpClient, private inventoryService: InventoryService ) { }

  ngOnInit() {

    this.dataSource.sort = this.sort;
    this.inventoryService.getInventoryItems();
    this.inventoryItemsSubscription = this.inventoryService.getInventoryUpdateListener()
    .subscribe((data: {inventoryItems: InventoryItem[], itemCount: number} ) => {

      this.items = data.inventoryItems;
      this.dataSource = new MatTableDataSource(this.items);
      console.log(this.items);
    });
  }

  onDelete( inventory_code : string){

    this.inventoryService
    .deleteInventoryItem(inventory_code).subscribe( res => {
      this.inventoryService.getInventoryItems();

    });
  }
  onUpdateAmount(amount, currentAmount,  inventory_code ) {



    if (currentAmount +  Number (amount) > 0 && Number (amount) != 0 )
    {
    this.wrongInput = false ;
    this.inventoryService
    .updateAmount(amount,inventory_code).subscribe(res=>{
      this.inventoryService.getInventoryItems();

    });
   } else {

      this.wrongInput = true ;
    }
  }
  ngOnDestroy() {

    this.inventoryItemsSubscription.unsubscribe();
  }

}
