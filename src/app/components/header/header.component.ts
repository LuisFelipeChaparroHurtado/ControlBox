import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public role: string = '';
  public fullName: string = '';

  constructor(
    private authService: AuthService,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.userStore.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.authService.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.role = this.authService.getRoleIdFromToken();
  }

  logout() {
    this.authService.signOut();
  }
}