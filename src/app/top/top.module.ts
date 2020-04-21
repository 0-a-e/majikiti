import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopPageRoutingModule } from './top-routing.module';

import { TopPage } from './top.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopPageRoutingModule
  ],
  declarations: [TopPage]
})
export class TopPageModule {}
