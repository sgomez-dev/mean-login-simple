import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { UserI } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  constructor(private authService: Auth, private router: Router) {}

  ngOnInit() {}

  onLogin(form: any): void {
    this.authService.login(form.value).subscribe((res) => {
      this.router.navigateByUrl('/auth');
    });
    console.info('Login succes');
  }
}
