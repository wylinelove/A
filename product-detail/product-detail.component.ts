import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '../url.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product = {}  //商品的详情对象

  //Activate:激活   Activated：被激活的
  //ActivatedRoute：当前处于激活状态的路由
  constructor(
    private route: ActivatedRoute,
    private url: UrlService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    //初始化完成，开始读取上一页面传递过来路由参数：pid
    this.route.params.subscribe((data)=>{
      let pid = data.pid
      //根据商品编号，查询出该商品的详情
      this.http.get(this.url.productDetailApi+pid).subscribe((res:any)=>{
        this.product = res.details
        console.log(this.product)
      })
    })
  }

}
