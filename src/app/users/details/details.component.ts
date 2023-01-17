import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { UserObservableService } from '../observables/user-observable.service';

@Component({
  selector: 'users-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  user: User | undefined;

  ngOnInit() {
    this.userDetails();
  }

  constructor(
    private userObservableService: UserObservableService
  ) { }

  userDetails() {
    this.userObservableService.getUserState().subscribe(details => {
      this.user = details;
    })
  }
}
