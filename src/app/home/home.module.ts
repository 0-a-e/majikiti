import { IonicStorageModule,Storage } from '@ionic/storage';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { TopPageModule } from '../top/top.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule,
    TopPageModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
