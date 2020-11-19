import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  searchValue: string;
  selectedRole: string = 'Buyer';
  popularTopics = [
    {
      title: 'Getting Started',
      icon: 'rocket',
      content: 'Become a member for free'
    },
    {
      title: 'Account',
      icon: 'user',
      content: 'How to Manage Your Account'
    },
    {
      title: 'Search For Products',
      icon: 'search',
      content: 'Find what your are looking for'
    },
    {
      title: 'Messaging',
      icon: 'message',
      content: 'Stay connected with you customers'
    },
    {
      title: 'Proforma',
      icon: 'file',
      content: 'Reach out to multiple vendors to get the best deal'
    },
    {
      title: 'Ordering',
      icon: 'shopping-cart',
      content: 'Make a purchase inside the comfort of your home'
    },
    {
      title: 'Payment',
      icon: 'wallet',
      content: 'Complete your transaction through our online payment system'
    }
  ];

  FAQs = [
    {
      active: true,
      disabled: false,
      name: 'How can I Create an Account ',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et odio maximus, mollis ante sed, vulputate diam. Maecenas fermentum neque dolor, sit amet elementum orci suscipit ac. Morbi eu semper tortor. Suspendisse ac augue in sem accumsan eleifend. Etiam hendrerit molestie erat sed cursus. Vivamus consectetur, nisl dictum molestie aliquam,'
    },
    {
      active: false,
      disabled: false,
      name: 'How to verfiy my Email?',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et odio maximus, mollis ante sed, vulputate diam. Maecenas fermentum neque dolor, sit amet elementum orci suscipit ac. Morbi eu semper tortor. Suspendisse ac augue in sem accumsan eleifend. Etiam hendrerit molestie erat sed cursus. Vivamus consectetur, nisl dictum molestie aliquam,'

    },
    {
      active: false,
      disabled: false,
      name: 'Resending email verfication token?',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et odio maximus, mollis ante sed, vulputate diam. Maecenas fermentum neque dolor, sit amet elementum orci suscipit ac. Morbi eu semper tortor. Suspendisse ac augue in sem accumsan eleifend. Etiam hendrerit molestie erat sed cursus. Vivamus consectetur, nisl dictum molestie aliquam,'
    }
  ];

  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSearch() {
    console.log(this.searchValue);

  }

}
