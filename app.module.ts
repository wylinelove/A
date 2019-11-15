import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { HttpClientModule } from '@angular/common/http'
import { ImagePipe } from './image.pipe';
import { FormsModule } from '@angular/forms';
import { LoginGuard } from './login.guard';

//创建路由词典：为每一个路由组件分配路由地址
let routes = [
  //若客户端访问的地址为空白，则“重定向到”另一个地址
  //地址重定向采用“完全匹配”方式
  {path: '', redirectTo: 'index', pathMatch:'full'},
  {path: 'index', component: IndexComponent},
  {path: 'productlist', component: ProductListComponent},
  {path: 'productdetail/:pid', component: ProductDetailComponent},
  {
    path: 'cart', 
    component: CartComponent,
    canActivate: [LoginGuard], //路由能激活吗？
  },
  {path: 'userlogin', component: UserLoginComponent},
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  //声明：注册组件、指令、管道等对象
  declarations: [
    AppComponent,
    IndexComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartComponent,
    UserLoginComponent,
    NotFoundComponent,
    ImagePipe,   //图片地址转换管道
  ],
  entryComponents: [],
  //导入：导入其它的模块
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    RouterModule.forRoot(routes), //路由模块，在根组件中注册路由词典
    HttpClientModule, //该模块提供了HttpClient服务
    FormsModule, //该模块提供了ngModel指令
  ],
  //提供者：声明主模块可以提供哪些服务对象
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
