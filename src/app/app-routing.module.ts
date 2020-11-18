import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AppComponent } from './app.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SpecialofferListComponent } from './specialoffer-list/specialoffer-list.component';
import { PendingSpecialOfferComponent } from './pending-special-offer/pending-special-offer.component';
import { ActiveSpecialOfferComponent } from './active-special-offer/active-special-offer.component';
import { IndexComponent } from './index/index.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ProductByCategoryComponent } from './product-by-category/product-by-category.component';
import { ProductBySubCategoryComponent } from './product-by-sub-category/product-by-sub-category.component';
import { SpecialOfferByCategoryComponent } from './special-offer-by-category/special-offer-by-category.component';
import { SpecialOfferBySubCategoryComponent } from './special-offer-by-sub-category/special-offer-by-sub-category.component';
import { SpecialOfferProductComponent } from './special-offer-product/special-offer-product.component';
import { RequestProformaComponent } from './request-proforma/request-proforma.component';
import { PendingProformaComponent } from './pending-proforma/pending-proforma.component';
import { OpenedProformaComponent } from './opened-proforma/opened-proforma.component';
import { ClosedProformaComponent } from './closed-proforma/closed-proforma.component';
import { ViewProformaComponent } from './view-proforma/view-proforma.component';
import { ViewResponsesComponent } from './view-responses/view-responses.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { AddMeasurementComponent } from './add-measurement/add-measurement.component';
import { FilterProductComponent } from './filter-product/filter-product.component';

const routes: Routes = [
  {path:'products',component:ProductsComponent},
  {path:'wishlist',component:WishlistComponent},
  {path:'cart',component:CartComponent},
  { path: 'product/:id', component: ProductComponent},
  { path: 'addProduct', component: AddProductComponent},
  { path: 'myProducts', component: ProductListComponent},
  { path: 'editProduct/:id', component: EditProductComponent},
  { path: 'pendingSpecialoffer', component: PendingSpecialOfferComponent},
  { path: 'activeSpecialoffer', component: ActiveSpecialOfferComponent},
  { path: 'specialOffers', component: SpecialofferListComponent},
  { path: 'index', component: IndexComponent},
  { path: 'addCategory', component: AddCategoryComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'editCategory/:id', component: EditCategoryComponent},
  { path: 'successMessage/:type/:message', component: AlertsComponent},
  { path: 'successMessage/:type/:message/:route', component: AlertsComponent},
  { path: 'productByCategory/:category', component: ProductByCategoryComponent},
  { path: 'productBySubCategory/:subCategory', component: ProductBySubCategoryComponent},
  { path: 'specialOfferByCategory/:category', component: SpecialOfferByCategoryComponent},
  { path: 'specialOfferBySubCategory/:subCategory', component: SpecialOfferBySubCategoryComponent},
  { path: 'specialOfferProduct/:id', component: SpecialOfferProductComponent},
  { path: 'requestProforma', component: RequestProformaComponent},
  { path: 'pendingProformas', component: PendingProformaComponent},
  { path: 'pendingProforma/:message', component: PendingProformaComponent},
  { path: 'activeProformas', component: OpenedProformaComponent},
  { path: 'activeProformas/:message', component: OpenedProformaComponent},
  { path: 'closedProformas', component: ClosedProformaComponent},
  { path: 'closedProformas/:message', component: ClosedProformaComponent},
  { path: 'viewProforma/:proformaId', component: ViewProformaComponent},
  { path: 'viewResponses/:itemId', component: ViewResponsesComponent},
  { path: 'searchForProduct', component: SearchProductComponent},
  { path: 'searchForProduct/:searchWord', component: SearchProductComponent},
  { path: 'measurements', component: MeasurementsComponent},
  { path: 'addMeasurement', component: AddMeasurementComponent},
  { path: 'filterProducts/:productCategory/:productSubCategory/:maxPrice', component: FilterProductComponent},
  {path:'*',component:IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
