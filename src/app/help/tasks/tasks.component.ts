import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  isVisible = false;
  index = 0;
  catagoryName: string;
  
  constructor() { }

  catagories = ["Account Management", "Subscription Model", "Messaging", "Ordering", "Payment", "Feedback and Rating"];

  ngOnInit(): void {
  }

  

  closeTab({ index }: { index: number }): void {
    this.catagories.splice(index, 1);
  }

  newTab(): void {
    this.catagories.push(this.catagoryName);
    this.index = this.catagories.length - 1;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  tasks = [
    {
      taskName: 'Registration',
      userType: "Buyer",
      catagory: "Account",
      preConditions: "sdkfsjdsfhgfdsgfsdgahgsfashgf",
      description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
    },
    {
      taskName: 'Login',
      userType: "Buyer",
      catagory: "Account",
      preConditions: "sdkfsjdsfhgfdsgfsdgahgsfashgf",
      description : "sdfdshgfuyftusgfjksagfagfhdagkjasgjha"
    },
    {
      taskName: 'Change password',
      userType: "Buyer",
      catagory: "Account",
      preConditions: "sdkfsjdsfhgfdsgfsdgahgsfashgf",
      description : "sdfdshgfuyftusgfjksagfagfhdagkjasgjha"
    },
    {
      taskName: 'Change Email',
      userType: "Buyer",
      catagory: "Account",
      preConditions: "sdkfsjdsfhgfdsgfsdgahgsfashgf",
      description : "sdfdshgfuyftusgfjksagfagfhdagkjasgjha"
    }
  ];

editTask(index){

}

deleteTask(index){

}

}
