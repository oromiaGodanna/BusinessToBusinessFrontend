import { Component, OnInit } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from "ng-zorro-antd/message";
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  constructor(private msg: NzMessageService) {}
  tooltips = ['Very Dissatisfied', 'Dissatisfied', 'Fair', 'Satisfied', 'Very Satisfied'];
  value = 3;
  viewAdditional = false;
  loading = false;
  avatarUrl?: string;
  fileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png'
    }
  ];

  ngOnInit(): void {
  }

  handleChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.fileList = fileList;
  }
  viewAdditionalRaing(): void{
    if (this.viewAdditional === false){
      this.viewAdditional = true;
    }else{
      this.viewAdditional = false;
    }
  }

}
