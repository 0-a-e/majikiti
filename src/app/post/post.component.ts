import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  text: String;
  tags: String;
  constructor(private db:AngularFireDatabase,private modal:ModalController,private alert:AlertController) { }
  close() {
    this.modal.dismiss();
  }
  async post() {
    const itemlist = this.db.list('list');
    const appenddict = {
      "text": this.text,
      "tags": this.tags.split(','),
      "verify": true
    }
    console.log(appenddict);
    itemlist.push(appenddict);
    this.modal.dismiss();
    const alert = await this.alert.create({
      header: 'ポストしました。',
      message: '通常は即座に反映されますが、最大で3日程の期間が必要です。しばらくお待ち下さい。',
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() {}

}
