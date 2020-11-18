import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductsService } from './services/products.service';
import { WishlistService } from './services/wishlist.service';
import { CategoryService } from './services/category.service';
import { SpecialofferService } from './services/specialoffer.service';
import { ProformaService } from './services/proforma.service';
import { CartService } from './services/cart.service';
import { ResponseService } from './services/response.service';
import { MeasurementsService } from './services/measurements.service';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SpecialofferListComponent } from './specialoffer-list/specialoffer-list.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCarouselModule } from 'ng-zorro-antd/Carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { AddProductComponent } from './add-product/add-product.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ActiveSpecialOfferComponent } from './active-special-offer/active-special-offer.component';
import { PendingSpecialOfferComponent } from './pending-special-offer/pending-special-offer.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { IndexComponent } from './index/index.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AlertsComponent } from './alerts/alerts.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzResultModule } from 'ng-zorro-antd/result';
import { ProductByCategoryComponent } from './product-by-category/product-by-category.component';
import { ProductBySubCategoryComponent } from './product-by-sub-category/product-by-sub-category.component';
import { SpecialOfferByCategoryComponent } from './special-offer-by-category/special-offer-by-category.component';
import { SpecialOfferBySubCategoryComponent } from './special-offer-by-sub-category/special-offer-by-sub-category.component';
import { SpecialOfferProductComponent } from './special-offer-product/special-offer-product.component';
import { RequestProformaComponent } from './request-proforma/request-proforma.component';
import { PendingProformaComponent } from './pending-proforma/pending-proforma.component';
import { ClosedProformaComponent } from './closed-proforma/closed-proforma.component';
import { ViewProformaComponent } from './view-proforma/view-proforma.component';
import { OpenedProformaComponent } from './opened-proforma/opened-proforma.component';
import { ViewResponsesComponent } from './view-responses/view-responses.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { SearchProductComponent } from './search-product/search-product.component';
import { FilterProductComponent } from './filter-product/filter-product.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { AddMeasurementComponent } from './add-measurement/add-measurement.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    WishlistComponent,
    ProductComponent,
    CartComponent,
    AddProductComponent,
    ProductListComponent,
    EditProductComponent,
    SpecialofferListComponent,
    ActiveSpecialOfferComponent,
    PendingSpecialOfferComponent,
    IndexComponent,
    AddCategoryComponent,
    CategoriesComponent,
    EditCategoryComponent,
    AlertsComponent,
    ProductByCategoryComponent,
    ProductBySubCategoryComponent,
    SpecialOfferByCategoryComponent,
    SpecialOfferBySubCategoryComponent,
    SpecialOfferProductComponent,
    RequestProformaComponent,
    PendingProformaComponent,
    ClosedProformaComponent,
    ViewProformaComponent,
    OpenedProformaComponent,
    ViewResponsesComponent,
    SearchProductComponent,
    FilterProductComponent,
    MeasurementsComponent,
    AddMeasurementComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzCarouselModule,
    NzCardModule,
    NzGridModule,
    NzSpaceModule,
    NzIconModule,
    NzTabsModule,
    NzTypographyModule,
    NzNotificationModule,
    NzFormModule,
    NzSelectModule,
    BrowserAnimationsModule,
    NzInputModule,
    NzUploadModule,
    NzTableModule,
    NzDividerModule,
    NzModalModule,
    NzMessageModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzDropDownModule,
    NzSpinModule,
    NzResultModule,
    NzAvatarModule,
    NzCommentModule,
    
  ],
  providers: [
    ProductsService,
    WishlistService,
    CategoryService,
    CartService,
    CategoryService,
    SpecialofferService,
    ProformaService,
    ResponseService,
    MeasurementsService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
