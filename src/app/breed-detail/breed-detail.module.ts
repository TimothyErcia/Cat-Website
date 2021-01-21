import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BreedDetailPageRoutingModule } from './breed-detail-routing.module';

import { BreedDetailPage } from './breed-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BreedDetailPageRoutingModule
  ],
  declarations: [BreedDetailPage]
})
export class BreedDetailPageModule {}
