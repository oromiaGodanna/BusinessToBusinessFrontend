import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

import { DeleteRequest } from '../../models/deleteRequest.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {
  
deleteForm: FormGroup;
  user;
  userId;
  error: boolean = false;
  errorMsg: string;
  requestSent:boolean = false;

  constructor( private userService: UserService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.user = this.userService.getUserData();
    this.userId = this.user._id;
    this.deleteForm = new FormGroup({
      name: new FormControl(`${this.user.firstName} ${this.user.lastName}`, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      reason: new FormControl(null, [Validators.required]),
      message: new FormControl(null),
    });
  }
  
  onSubmit(){
    const deleteRequest = new DeleteRequest(
      this.deleteForm.value.name,
      this.deleteForm.value.email,
      this.deleteForm.value.reason,
      this.deleteForm.value.message
    )
    console.log(deleteRequest)

    this.userService.sendDeleteRequest(this.userId, deleteRequest).subscribe(
      (response) => {
        if(response.status == 200){
          this.message.success('Request Sent');
          this.requestSent = true;
        }  
      }, (error) => {
        this.error = true;
        this.errorMsg = error.error;

      }
    )
  }

}
