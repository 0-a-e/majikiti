import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Route, Router } from '@angular/router';
import { DataService, Message } from '../services/data.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage {
  public message: any;
  showmsg: Object;
  msg: String;
  constructor(
    private router: Router,
    private data: DataService,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private toast: ToastController,
    private storage:Storage
  ) {
    const index = this.route.snapshot.paramMap.get('index');
      db.list('list').valueChanges().subscribe(data=> {
        const msg = data[index];
        this.showmsg = msg;
        this.msg = msg["text"].replace(/\\n/, '\A');
        console.log(this.msg);
      });

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
  async favorite() {
    var fav;
    this.storage.get('favorite').then((val) => {
      console.log(val);
      if (val) {
        fav = val;
      } else {
        fav = [];
      }
      const appenddict = {
        'content': this.showmsg,
        'fav': true
      }
      fav.push(appenddict);
      console.log(fav);
      this.storage.set('favorite', fav);
      this.addtoast();
    });
  }
  async addtoast() {
    const toast = await this.toast.create({
      message: 'お気に入りに追加しました。',
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
