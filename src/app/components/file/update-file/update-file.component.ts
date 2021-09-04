import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { File } from 'src/app/models/file';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-update-file',
  templateUrl: './update-file.component.html',
  styleUrls: ['./update-file.component.css']
})
export class UpdateFileComponent implements OnInit {

  file?: File;
  public loading?: boolean;

  constructor(
    private fileService: FileService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.fileService.detail(id)
      .subscribe(
        (response: File) => {
          this.file = response;
          console.log(response);
          console.log(id);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.router.navigate(['/lista']);
        }
      )
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.fileService.update(id, this.file!)
      .subscribe(
        response => {
          this.toastr.success('Ficha Actualizada', 'OK', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          console.log(response);
          this.router.navigate(['/lista']);
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.router.navigate(['/lista']);
        }
      )
  }

}
