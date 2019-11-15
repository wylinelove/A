import { Component, OnInit, ViewChild } from '@angular/core';
import { UrlService } from '../url.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  carouselItems = []    //轮播广告条目
  newArrivalItems = []  //新品上市条目
  recommendedItems = [] //首页推荐条目
  topSaleItems = []     //热销单品条目
  @ViewChild('mySlides', {static:true})
  mySlideList           //轮播广告的关联属性

  constructor(private url: UrlService, private http: HttpClient) { }   

  ngOnInit() {//当组件初始化完成后，异步请求服务器数据
    this.http.get(this.url.indexApi).subscribe((res:any)=>{
      this.carouselItems = res.carouselItems;
      this.newArrivalItems = res.newArrivalItems
      this.recommendedItems = res.recommendedItems
      this.topSaleItems = res.topSaleItems
      //console.log(this.recommendedItems)
      //已经查询到所有的轮播广告项，可以开始自动播放了
      this.mySlideList.startAutoplay()
    })
  }

}
