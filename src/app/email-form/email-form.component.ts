import { Component, OnInit } from '@angular/core';
import { Email } from '../models/promotion';
import { PromotionService } from '../services/promotion.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take, map, switchMap, debounceTime } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

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
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) {

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

    const userId = this.authService.getCurrentUser()._id;

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
      await this.promoService.sendEmail(newEmail).toPromise();
    }
    this.router.navigate(['/promotion']);

  }


  sendEmail() {
    // console.log(this.selectedUser);
    console.log(this.promoService.getSubscribers())

    
  }

}
