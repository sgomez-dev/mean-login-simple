import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { UserI } from '../../models/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  constructor(private authService: Auth, private router: Router) {}

  ngOnInit(): void {}

  onRegister(form: any): void {
    this.authService.register(form.value).subscribe((res) => {
      this.router.navigateByUrl('/auth');
    });
  }
}
