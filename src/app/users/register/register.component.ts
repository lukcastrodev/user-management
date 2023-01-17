import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { v4 as uuidv4 } from "uuid";

import { User } from '../models/user';
import { UserService } from '../user.service';
import { UserObservableService } from '../observables/user-observable.service';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public registerForm = new FormGroup({
    nome: new FormControl(),
    sobrenome: new FormControl(),
    email: new FormControl()
  })

  constructor(
    private userService: UserService,
    private userObservableService: UserObservableService,
  ) { }

  onSubmit() {
    const { nome, sobrenome, email } = this.registerForm.value;
    const id = uuidv4();
    this.userService.storeNewUser({ id, nome, sobrenome, email }).subscribe(res => {
    })
    this.refreshUserList();
  }

  refreshUserList() {
    this.userService.getAll().subscribe((userList: User[]) => {
      this.userObservableService.setUserListState(userList);
    })
  }
}
