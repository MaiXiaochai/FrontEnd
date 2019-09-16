import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  @Input()
  private rating = 0;

  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter();

  private stars: boolean[];
  @Input()
  private readonly = true;
  constructor() { }

  ngOnInit() {
    // 这里通过分数比较确定实心星星和空心星星
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }
  }
  clickStar(index: number) {
    if (!this.readonly) {
      this.rating = index + 1;
      this.ngOnInit(); // 重新判断星级
      this.ratingChange.emit(this.rating);
    }
  }
}
