import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavmsgPageRoutingModule } from './favmsg-routing.module';

import { FavmsgPage } from './favmsg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavmsgPageRoutingModule
  ],
  declarations: [FavmsgPage]
})
export class FavmsgPageModule {}
