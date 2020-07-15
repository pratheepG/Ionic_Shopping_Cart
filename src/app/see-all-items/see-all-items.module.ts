import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeAllItemsPageRoutingModule } from './see-all-items-routing.module';

import { SeeAllItemsPage } from './see-all-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeAllItemsPageRoutingModule
  ],
  declarations: [SeeAllItemsPage]
})
export class SeeAllItemsPageModule {}
