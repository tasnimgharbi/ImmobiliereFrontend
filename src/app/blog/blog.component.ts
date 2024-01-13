import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations'; // Import necessary animation modules

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class BlogComponent implements OnInit {
  latestPosts: any[] = [
    { title: 'Real Estate Trends in 2024', content: 'Discover the latest trends shaping real estate in 2024. From sustainable living to smart home innovations and the impact of remote work on property preferences, explore the dynamic changes defining the real estate landscape this year.', date: new Date(), imageUrl: 'assets/image/trends.jpg' , externalLink : 'https://www.architecturaldigest.com/story/5-real-estate-trends-that-will-rule-the-market-in-2024'},
    { title: 'Tips for First-time Homebuyers', content: 'Embarking on your first homebuying journey? Here are some essential tips to guide you through the process. From understanding your budget and exploring financing options to navigating the real estate market and conducting thorough inspections, these insights will help you make informed decisions and find the perfect home for your needs.'
    , date: new Date(), imageUrl: 'assets/image/buyers.jpg' , externalLink : 'https://www.nerdwallet.com/article/mortgages/tips-for-first-time-home-buyers'},
    { 
      title: 'The Future of Smart Homes', 
      content: 'Explore the future of smart homes and how emerging technologies are transforming the way we live. From AI-driven home automation to sustainable energy solutions, discover the innovations that are shaping the homes of tomorrow.',
      date: new Date('2024-02-15'),
      imageUrl: 'assets/image/smart-home.jpg',
      externalLink: 'https://www.linkedin.com/pulse/intriguing-future-smart-home-systems-yuvipep'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  goToPostDetails(post: any): void {
    console.log('Selected Blog Post:', post);
    window.open(post.externalLink, '_blank');
  }
  
}
