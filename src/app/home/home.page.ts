import { Component } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Route, Router, Routes, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router,private route:ActivatedRoute,private db:AngularFireDatabase,private modal:ModalController,private alert:AlertController,private dat: DataService) {}
  message: any;
  async ionViewWillEnter(){
    await this.db.list('list').valueChanges().subscribe(data=> {
      this.message = data.reverse();
    });
  }
}
