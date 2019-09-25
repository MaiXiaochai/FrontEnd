import {Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {
  @Input()
  public rating = 0;

  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter();

  public stars: boolean[];
  @Input()
  private readonly = true;

  constructor() { }
  ngOnInit() {}

  clickStar(index: number) {
    if (!this.readonly) {
      this.rating = index + 1;
      // this.ngOnInit(); // 重新判断星级，因为有了ngOnChanges，就不需要在这里重新评星了
      this.ratingChange.emit(this.rating); // 通过ratingChange发射this.rating给父组件
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // 这里通过分数比较确定实心星星和空心星星
    // 为了使得每次打开评论区的时候，默认的评价都是五星
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }
  }
}
