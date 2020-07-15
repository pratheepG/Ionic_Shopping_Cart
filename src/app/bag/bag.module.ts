import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BagPageRoutingModule } from './bag-routing.module';

import { BagPage } from './bag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BagPageRoutingModule
  ],
  declarations: [BagPage]
})
export class BagPageModule {}
