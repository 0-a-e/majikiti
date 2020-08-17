import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Route, Router, Routes, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-top',
  templateUrl: './top.page.html',
  styleUrls: ['./top.page.scss'],
})
export class TopPage implements OnInit {
  message: any;
  messagebase: any;
  constructor(private router: Router,private route:ActivatedRoute,private db:AngularFireDatabase,private modal:ModalController,private alert:AlertController) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.refreshlist();
  }

  async refreshlist() {
    await this.db.list('list').valueChanges().subscribe(data=> {
      this.message = data.slice().reverse();
    });
  }
  opendetail(index) {
    let lng = this.message.length;
    let viewindex = lng - index - 1;
    console.log(viewindex);
    this.router.navigateByUrl(`/message/${viewindex}/online`);
  }
  async refresh(ev) {
      await this.refreshlist();
      await ev.detail.complete();
  }

  async search(ev) {
    //console.log(ev.target.value);
    console.log(this.message);
    this.message = this.filterItems(this.message, ev.target.value);
  }
  filterItems(arr, query) {
    return arr.filter(function (el) {
      return el.text.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    })
  }
}
