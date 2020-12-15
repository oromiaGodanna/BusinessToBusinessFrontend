import { Component, OnInit } from '@angular/core';
import { Email } from '../models/promotion';
import { PromotionService } from '../services/promotion.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take, map, switchMap, debounceTime } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.less'],
})
export class EmailFormComponent implements OnInit {

  email: Email = {
    sender: '',
    recipients: [''],
    to: [''],
    subject: '',
    username: [''],
    intro: [''],
    instructions: '',
    buttonText: '',
    buttonLink: '',

  };
  id;

  sending = false;

  // number
  selectValue = 'all';

  // select by username 
  randomUserUrl = 'https://api.randomuser.me/?results=5';
  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];
  selectedUser?: string;
  isLoading = false;

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }
  constructor(private promoService: PromotionService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private antNotification: NzNotificationService) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.promoService.getEmailById(this.id).pipe(take(1)).subscribe((email: Email) => this.email = email);
  }

  ngOnInit(): void {

    const getRandomNameList = (name: string) =>
      this.http
        .get(`${this.randomUserUrl}`)
        .pipe(map((res: any) => res.results))
        .pipe(
          map((list: any) => {
            return list.map((item: any) => `${item.name.first} ${name}`);
          })
        );

    // this.promoService.getSubscribers()
    //   .pipe(
    //     map((list: any) => {
    //       return list.map((item: any) => `${item.name} ${name}`);
    //     })
    //   );


    const optionList$: Observable<string[]> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(switchMap(getRandomNameList));

    optionList$.subscribe(data => {
      this.optionList = data;
      this.isLoading = false;
    });

  }



  async createEmail(value) {

    const userId = this.userService.getCurrentUser()._id;

    const newEmail: Email = {
      sender: userId,
      recipients: [userId],  // get subscribers ids
      to: ['tungat72@gmail.com'],          // get subscribers emails
      subject: value.subject,
      username: ['Tunga'],     // get subscribers username
      intro: value.intro,
      instructions: value.instructions,
      buttonText: value.buttonText,
      buttonLink: value.buttonLink,
    }


    if (this.id) {
      console.log('editing ....');
      await this.promoService.updateEmail(this.id, newEmail).toPromise();
    } else {
      console.log('creating ...');
      await this.promoService.createEmail(newEmail).toPromise();
    }
    this.router.navigate(['/promotion']);

  }


  sendEmail() {

    this.sending = true;

    // get subscribers: email, _id, firstName from 
    let subscribers;
    this.userService.getMe().subscribe((customer) => {


      console.log(customer);
      subscribers = customer.subscribers;
      console.log(subscribers);

      if(subscribers.length == 0){
        this.antNotification.create(
          'warning',
          'You can\'t send emails',
          'To send emails, you need subscribers. You currently have 0 subscribers.',
          { nzPlacement: 'topLeft' }
        );
      }

      if (this.selectValue.includes('all')) {
        // user selected all

        console.log('in selected all');

        this.promoService.sendEmail(this.id, subscribers).subscribe((result) =>  {
          console.log(result);
          if(result){
            this.antNotification.create(
              'success',
              'Emails sent',
              'The emails have been sent to your subscribers.',
              { nzPlacement: 'topLeft' }

            );

            this.router.navigate(['/promotion']);
          }
        }, (error) => {
          this.antNotification.create(
            'error',
            'An error occurred',
            error.message,
            { nzPlacement: 'topLeft' }

          );
        });


      } else {
        // user selected random number of subscribers


      }
    });





  }

}
