import { getSelectedTaxonIds } from './reducers/selectors';
import { ProductActions } from './../product/actions/product-actions';
import { AppState } from './../interfaces';
import { getProducts, getTaxonomies } from './../product/reducers/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  template: `
    <app-breadcrumb [taxonomies]="taxonomies$ | async"></app-breadcrumb>
    <div class="col-xs-12">
      <div class="col-xs-3">
        <app-taxons [taxonomies]="taxonomies$ | async"></app-taxons>
      </div>
      <div class="col-xs-9">
        <app-content 
          [products]="products$ | async" 
          [taxonIds]="selectedTaxonIds$ | async">
        </app-content>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$: Observable<any>;
  taxonomies$: Observable<any>;
  selectedTaxonIds$: Observable<number[]>;

  constructor(private store: Store<AppState>,
              private actions: ProductActions,
              private translate: TranslateService) {
    // Get all products for the product list component
    this.store.dispatch(this.actions.getAllProducts());
    this.store.dispatch(this.actions.getAllTaxonomies());
    this.products$ = this.store.select(getProducts);
    this.taxonomies$ = this.store.select(getTaxonomies);
    this.selectedTaxonIds$ = this.store.select(getSelectedTaxonIds);
    translate.addLangs(['en', 'de', 'es', 'fr', 'it', 'pt']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() { }

}
