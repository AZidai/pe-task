import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserInterface } from '../../../../interfaces';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns = ['first_name', 'last_name', 'email'];
  userList: any[] = [];
  pagesCount: number;
  currentPageIndex: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.pipe(
      map(data => data.users)
    )
    .subscribe((users: UserInterface[]) => {
      this.userList = users;
    });

    this.setPaginationInfo();
  }

  setPaginationInfo() {
    const pageInfo = this.apiService.fetchPaginationInfo();
    this.pagesCount = parseInt(pageInfo.total, 10);
    this.currentPageIndex = parseInt(pageInfo.page, 10) - 1;
  }

  pageChanged(event: PageEvent): void {
    const page: number = event.pageIndex + 1;
    this.apiService.fetchUsers(page).subscribe((users: UserInterface[]) => {
      this.userList = users;
      this.setPaginationInfo();
    });

    this.router.navigate(['./'], { queryParams: { page } });
  }

  userSelected(user: UserInterface): void {
    this.router.navigate(['./user', user.id]);
  }
}
