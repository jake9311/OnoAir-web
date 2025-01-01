import { Component } from '@angular/core';
import {  MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HelpComponent } from "../../feature/help/help/help.component";
import { Router } from '@angular/router'; 
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule, MatIconModule, HelpComponent,MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private router: Router){}
  Help(): void {
    this.router.navigate(['/help']);
}
}
