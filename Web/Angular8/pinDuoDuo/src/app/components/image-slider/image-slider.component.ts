import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';

export interface ImageSlider {
  imgUrl: string;
  link: string;
  caption: string;
}

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit, AfterViewInit {

  @Input()
  sliders: ImageSlider[] = [];

  @ViewChild('imageSlider', {static: true})
  imgSlider: ElementRef;

  @ViewChildren('img')
  imgs: QueryList<ElementRef>;

  constructor(private rd2: Renderer2) {}

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // this.imgs.forEach(item => item.nativeElement.style.height = '150px');
    this.imgs.forEach(item => {
      this.rd2.setStyle(item.nativeElement, 'height', '150px');
    });
  }
}
