import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/common/services/api.service';


interface User {
  UserID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Username: string;
  Password: string;
  RoleID: number;
}

const USERS: User[] = [
  {
    UserID: 1,
    FirstName: 'Rohit',
    LastName: 'Verma',
    Email: 'rohit@gmail.com',
    Username: 'rkv',
    Password: '123',
    RoleID: 1
  },
  {
    UserID: 2,
    FirstName: 'Rohit',
    LastName: 'Verma',
    Email: 'rohit@gmail.com',
    Username: 'rkv',
    Password: '123',
    RoleID: 1
  },
  {
    UserID: 3,
    FirstName: 'Rohit',
    LastName: 'Verma',
    Email: 'rohit@gmail.com',
    Username: 'rkv',
    Password: '123',
    RoleID: 1
  },
  {
    UserID: 4,
    FirstName: 'Rohit',
    LastName: 'Verma',
    Email: 'rohit@gmail.com',
    Username: 'rkv',
    Password: '123',
    RoleID: 1
  }
];
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users = USERS;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
  ) {

  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.apiService.get('/User')
      .subscribe(
        (data: any) => {
          this.toastr.success('User fetch successfull');
          this.users = data;
        },
        (error: any) => {
          // this.toastr.error(error);
          console.log(error);
        });
  }

  edit(id: number) {
    this.router.navigate(['/pages/user-edit/' + id]);
  }


  delete(id: number) {
    this.apiService.delete('/User/' + id)
      .subscribe(
        (data: any) => {
          this.toastr.success('User Deleted');
          this.getAll();
        },
        (error: any) => {
          // this.toastr.error(error);
          console.log(error);
        });
  }

}
