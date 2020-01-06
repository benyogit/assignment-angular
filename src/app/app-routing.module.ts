import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockListComponent } from './stock/stockList/stockList.component';
import { CreateItemComponent } from './stock/createItem/createItem.component';
import { InventoryListComponent } from './Inventory/inventoryList/inventory-list/inventory-list.component';
import { SingleItemComponent } from './stock/single-item/single-item.component';

const routes: Routes = [
  { path: '', component: StockListComponent },

  { path: 'create', component: CreateItemComponent },
  { path: 'inventory', component: InventoryListComponent },
  { path: ':item_no', component: SingleItemComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
