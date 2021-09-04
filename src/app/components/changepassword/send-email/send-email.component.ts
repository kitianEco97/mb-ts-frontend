import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmailValuesDTO } from 'src/app/models/email-values-dto';
import { EmailPasswordService } from 'src/app/services/email-password.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  mailTo?: any;
  dto?: EmailValuesDTO;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastrService: ToastrService 
  ) { }

  ngOnInit(): void {
  }

  onSendEmail(): void {
    this.dto = new EmailValuesDTO(this.mailTo);
    this.emailPasswordService.sendEmail(this.dto)
      .subscribe(
        response => {
          this.toastrService.success(response.mensaje, 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
        }, 
        (err: HttpErrorResponse) => {
          this.toastrService.error(err.error.mensaje, 'FAIL', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
        }
      )
  }

}
