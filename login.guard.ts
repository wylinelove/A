import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  //在根模块中提供该守卫的对象
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router){ }
  
  //判断后续的组件能否激活
  canActivate(){
    console.log('正在检查用户是否已经登录')
    if( sessionStorage['loggedUname'] ){ //已经登录
      return true   //允许激活后续的组件
    }else {  //尚未登录
      this.router.navigateByUrl('/userlogin')//页面跳转
      return false  //禁止激活后续的组件
    }
  }
}