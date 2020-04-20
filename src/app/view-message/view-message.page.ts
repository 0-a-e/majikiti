import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Route, Router } from '@angular/router';
import { DataService, Message } from '../services/data.service';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage {
  public message: any;
  showmsg: Object;
  constructor(
    private router: Router,
    private data: DataService,
    private db: AngularFireDatabase,
    private route: ActivatedRoute
  ) {
    const index = this.route.snapshot.paramMap.get('index');
      db.list('list').valueChanges().subscribe(data=> {
          this.showmsg = data[index];
      });
        console.log(this.showmsg);

  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
