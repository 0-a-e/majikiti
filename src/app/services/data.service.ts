import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(public db: AngularFireDatabase) {
    
  }

 async getMessages() {

  }

  public getMessageById(id: number) {
    this.db.list('list').valueChanges().subscribe(data => {
      return data[id];
    });
  }
}
