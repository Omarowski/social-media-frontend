import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-update-infos',
  templateUrl: './user-update-infos.component.html',
  styleUrl: './user-update-infos.component.css'
})
export class UserUpdateInfosComponent {

  @Output() close = new EventEmitter<void>(); 
  name: string = '';
  surname: string= '';
  favouriteName: string='';
  courseStudy: string='';
  job: string='';
  country: string='';
  city: string='';
  postCode:string='';
  phone: string='';
  email:string='';
  website:string=''

  submit() {
    console.log('name', this.name);
    console.log('surname', this.surname)
    console.log('favourite Name', this.favouriteName)
    console.log('course of Study and year', this.courseStudy)
    console.log('Job', this.job)
    console.log('Country', this.country)
    console.log('City', this.city)
    console.log('Post Code', this.postCode)
    console.log('Phone Number', this.phone)
    console.log('Email', this.email)
    console.log('Web Site', this.website)



    this.close.emit(); 
  }
}
