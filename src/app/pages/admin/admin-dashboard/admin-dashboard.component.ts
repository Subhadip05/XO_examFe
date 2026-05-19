import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  isSidebarOpen: boolean = true;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    // Listen for toggle changes
    this.sidebarService.isSidebarOpen$.subscribe(state => {
      this.isSidebarOpen = state;
    });
  }
}
