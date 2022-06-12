import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Partner } from '../../interfaces/partner';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css'],
})
export class PartnerComponent implements OnInit {
  genderList = [
    { id: 1, value: 'Hombre' },
    { id: 2, value: 'Mujer' },
  ];

  do: String = 'insert';
  position: any = 0;

  contacts: Array<Partner> = [];

  calculateNextAssociateNumber(){
    if(this.contacts.length>0){
      let associate = this.contacts.map( function (x){
       return x.associate;
      }).reduce((a,b)=>Math.max(a,b));
      console.log(associate);
       return associate + 1 ;
    } else return 0;
  }

  contact: Partner = {
    name: '',
    lastName: '',
    associate: this.calculateNextAssociateNumber(),
    dni: '',
    phone: undefined,
    gender: '',
  };

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void { }
  add(form: NgForm) {
    if (this.do === 'insert') {
       

      this.contacts.push(this.contact);
    } else {
      
      this.contacts[this.position] = this.contact;
      this.do = 'insert';
    }
    this.contact = {
      name: '',
      lastName: '',
      associate: this.calculateNextAssociateNumber(),
      dni: '',
      phone: undefined,
      gender: '',
    };
    form.resetForm();
  }

  delete(delPosition: number): void {
    this.contacts.splice(delPosition, 1);
    this.contact.associate= this.calculateNextAssociateNumber();
  }
  update(upPosition: number): void {
    this.contact = this.contacts[upPosition];
    this.do = 'update';
    this.position = upPosition;
  }
}
