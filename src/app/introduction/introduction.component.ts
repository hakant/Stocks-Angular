import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  start(formValues) {
    // console.log(formValues.numberOfStocks);
    this.router.navigate(['dashboard']);

  }

  skip() {
    this.router.navigate(['dashboard']);
  }
}

