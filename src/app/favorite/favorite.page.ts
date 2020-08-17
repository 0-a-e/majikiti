import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { Component, OnInit } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  constructor(private router: Router, private storage: Storage) { }
  favoritemessage: any;
  ionViewWillEnter() {
    this.getfavorite();
  }
  getfavorite() {
    this.storage.get('favorite').then((val) => {
      console.log(val);
      if (val) {
        this.favoritemessage = val.slice().reverse();
      }
    });
  }

  async refresh(ev) {
    await this.getfavorite();
    await ev.detail.complete();
}
  opendetailfavorite(index) {
    let lng = this.favoritemessage.length;
    let viewindex = lng - index - 1;
    console.log(viewindex);
    this.router.navigateByUrl(`/message/${viewindex}/fav`);
  }
  ngOnInit() {
  }

}
