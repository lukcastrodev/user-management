import { Component, OnInit, SimpleChanges } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../models/user';
import { UserObservableService } from '../observables/user-observable.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User = {} as User;

  isVisible: boolean = false;
  updateForm = new FormGroup({
    nome: new FormControl(),
    sobrenome: new FormControl(),
    email: new FormControl()
  })

  constructor(
    private userService: UserService,
    private userObservableService: UserObservableService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  onSubmit() {
    const { nome, sobrenome, email } = this.updateForm.value;
    this.userService.updateUser({
      id: this.selectedUser.id,
      nome,
      sobrenome,
      email
    }).subscribe(() => {
      this.isVisible = false;
    })
  }

  getUsers() {
    this.userObservableService.getUserListState().subscribe(usersList => {
      if (usersList.length === 0) {
        this.userService.getAll().subscribe(usersListByGet => {
          this.users = usersListByGet;
        });
      } else {
        this.users = usersList;
      }
    });
  }

  showUserDetails(user_id: string) {
    this.userService.getOne(user_id).subscribe((user: User) => {
      this.userObservableService.setUserState(user);
    })
  }

  deleteUser(user_id: string): void {
    this.userService.deleteUser(user_id).subscribe(() => {
      this.userService.getAll().subscribe(usersList => {
        this.userObservableService.setUserListState(usersList);
      });
    });
  }

  showUpdateForm(user_data: User) {
    this.selectedUser = user_data;
    this.isVisible = true;
  }
}
