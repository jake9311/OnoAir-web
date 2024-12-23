import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; 
import { MatMenuTrigger } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,MatIconModule,MatMenuModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 
}
