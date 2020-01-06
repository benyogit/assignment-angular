import { Component, OnInit, OnDestroy } from '@angular/core';

import { StockService } from '../stock.service';
import { StockItem } from '../stockItem.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-item',
  templateUrl: './createItem.component.html',
  styleUrls: ['./createItem.component.css'],
  providers: [StockService]
})
export class CreateItemComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  constructor(public stockService: StockService) {
    console.log('in create Item');
  }

  onAdd() {
    if (this.form.invalid) {
    } else {
      console.log('good thing');
      this.stockService.addItem(this.form.value.name, this.form.value.details);

    }
    this.form.reset();
  }
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      details: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)]
      })
    });
  }
  ngOnDestroy() {}
}
