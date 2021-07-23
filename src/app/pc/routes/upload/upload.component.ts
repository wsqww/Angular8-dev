import { Component, OnInit } from '@angular/core';

import { ApiService } from '@pc-core/service/api/api.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(
    private apiSer: ApiService,
  ) { }

  ngOnInit() {
  }

  uploadFile($event) {
    const file = $event.target.files[0];
    console.log(file);
    this.apiSer.uploadTest(file).subscribe(
      (res: any) => {
        console.log(res);
      }
    );
  }

}
