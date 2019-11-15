import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UrlService } from '../url.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList = []    //商品列表
  pno = 0     //即将要加载的商品页号 PageNumber
  hasMore =  true    //还有更多数据可供加载吗？

  @ViewChild('myInfinite', {static:false})
  myInfinite         //页面底部的“无穷滚动组件”
  //注意：如果无穷滚动组件添加了*ngIf，它就不再是“静态组件”

  constructor(
    private router: Router,  
    private nav: NavController,
    private url: UrlService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    //组件初始化完成后，异步加载商品数据
    this.loadMore()  
  }
  loadMore(){
    this.pno++  //即将要加载的页号+1
    this.http.get(this.url.productListApi + this.pno).subscribe((res:any)=>{
      //通知“无穷滚动组件”：异步加载已完成，可以准备下一次滚动监听了
      this.myInfinite.complete()

      if(this.pno >= res.pageCount){
        this.hasMore = false //当前页号已经等于或超过总页号了，就说明没有更多数据可供加载了
      }
      this.productList = this.productList.concat(res.data)
      console.log(this.productList)
    })
  }

  jumpToLogin(){
    //Angular中的路由跳转：脚本中跳转
    this.router.navigateByUrl('/userlogin')
  }
  goBack(){
    //Ionic中的路由跳转：脚本中跳转
    this.nav.back()
  }

}
