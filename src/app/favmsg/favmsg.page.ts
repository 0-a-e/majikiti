import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Route, Router } from '@angular/router';
import { DataService, Message } from '../services/data.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
@Component({
  selector: 'app-favmsg',
  templateUrl: './favmsg.page.html',
  styleUrls: ['./favmsg.page.scss'],
})
export class FavmsgPage implements OnInit {
  public message: any;
  showmsg: Object;
  index: number;
  msg: String;
  constructor( private router: Router,
    private data: DataService,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private toast: ToastController,
    private storage: Storage) {
    this.index = parseInt(this.route.snapshot.paramMap.get('index'));
    storage.get('favorite').then((val) => {
      this.showmsg = val[this.index];
    });
    }

  ngOnInit() {
  }
  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
  tweet() {
    const link = `http://twitter.com/share?&text=${this.msg}`;
    console.log(link);
    window.open(link);
  }
  async favoriterm() {
    var fav;
    this.storage.get('favorite').then((val) => {
      console.log(val);
      if (val) {
        fav = val;
      } else {
        fav = [];
      }
      fav.splice(this.index, 1);
      console.log(fav);
      this.storage.set('favorite', fav);
      this.rmtoast();
    });
  }
  async rmtoast() {
    const toast = await this.toast.create({
      message: 'お気に入りから削除されました。',
      duration: 2000
    });
    await toast.present();
  }
  async copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    const toast = await this.toast.create({
      message: 'コピーされました。',
      duration: 2000
    });
    toast.present();
  }
}
