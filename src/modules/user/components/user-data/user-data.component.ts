import { Component, Input, AfterViewInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from '../../../../interfaces';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements AfterViewInit {

  @Input() user: UserInterface;

  constructor(
    private router: Router,
    @Optional() private parent: UserComponent
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.parent.user = { ...this.user };
    });
  }

  back(): void {
    this.router.navigate(['./users']);
  }
}
