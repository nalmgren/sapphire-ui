import { Component, OnInit } from '@angular/core';
import {Person, PersonService} from '../services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  providers: [PersonService]
})
export class PersonListComponent implements OnInit {

  public people: Person[];
  constructor(public personService: PersonService) { }

  ngOnInit() {
    this.personService.getPeople().subscribe(res => this.people = res);
  }

}
