import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserObservableService {
  private user$ = new BehaviorSubject<User>({} as User);
  private userList$ = new BehaviorSubject<User[]>([]);


  setUserState(user: User) {
    this.user$.next(user);
  }

  getUserState() {
    return this.user$;
  }

  setUserListState(user: User[]) {
    this.userList$.next(user);
  }

  getUserListState() {
    return this.userList$;
  }
}
