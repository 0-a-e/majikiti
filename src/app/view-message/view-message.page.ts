import { ReportComponent } from './../report/report.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Route, Router } from '@angular/router';
import { DataService, Message } from '../services/data.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController,ModalController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage {
  public message: any;
  showmsg: any;
  tags: string[] = new Array();
  msg: string;
  icon: String;
  index: any;
  constructor(
    private router: Router,
    private data: DataService,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private toast: ToastController,
    private storage: Storage,
    public modalController: ModalController
  ) {
    this.index = this.route.snapshot.paramMap.get('index');
    const state = this.route.snapshot.paramMap.get('state');
    if (state == "online") {
      //dbから全取得じゃなくてその番号だけ取得するようにsuru
      db.list('list').valueChanges().subscribe(data => {
        this.showmsg = data[this.index];
        this.msg = this.showmsg["text"].replace(/\\n/, '\A');
        this.tags = this.showmsg["tags"];
        this.favoritecheck(this.showmsg);
      });
    } else if (state == "fav") {
      storage.get('favorite').then((val) => {
        this.showmsg = val[this.index];
        console.log(this.showmsg);
        this.msg = this.showmsg["content"]["text"];
        this.tags = this.showmsg["content"]["tags"];
        this.favoritecheck(this.showmsg);
      });
    }
  }
  favoritecheck(msg) {
    try {
      if (msg["fav"] == true) {
        this.icon = "star";
      } else {
        this.icon = "star-outline";
      }
    } catch (e) {
      console.log(e);
      this.icon = "star-outline";
    }
  }

  favfunc() {
    if (this.icon == "star-outline") {
      this.favorite();
    } else if (this.icon == "star") {
      this.favoriterm();
    }
}

  async openmodal() {
    const modal = await this.modalController.create({
      component: ReportComponent,
      componentProps: {
        'index': this.index,
        'msg': this.msg,
        'tag': this.tags
      }
    });
    return await modal.present();
  }
  
  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
  tweet() {
    let msg = this.msg.replace(/\r?\n/g, '%0a');
    let link = 'http://twitter.com/intent/tweet?&text=' + msg;
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
      this.showtoast("お気に入りに追加されました");
    });
  }
  async favoriterm() {
    var fav;
    this.storage.get('favorite').then((val) => {
      if (val) {
        fav = val;
      } else {
        fav = [];
      }
      fav.splice(this.index, 1);
      this.storage.set('favorite', fav);
      this.showtoast("お気に入りから削除されました");
    });
  }
  async showtoast(m) {
    const toast = await this.toast.create({
      message: m,
      duration: 2000
    });
    await toast.present();
  }

  async copyMessage(val){
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
