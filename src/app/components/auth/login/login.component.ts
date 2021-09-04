import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsuario?: LoginUsuario;
  nombreUsuario?: string;
  password?: string;
  errMsj?: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario!, this.password!);
    this.authService.login(this.loginUsuario)
      .subscribe(
        (response: any) => {                
          this.tokenService.setToken(response.token);          
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          this.errMsj = err.error.message;
          this.toastr.error(this.errMsj, 'Fail', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.errMsj = err.error.message;
          console.error(err.error.message);
        }
      )
  }

}
