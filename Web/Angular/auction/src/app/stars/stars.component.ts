import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  @Input()
  private rating = 0;
  private stars: boolean[];
  constructor() { }

  ngOnInit() {
    // 这里通过用分数决定显示几个星星
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i <= this.rating);
    }

  }

}
