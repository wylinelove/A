import { Component, OnInit } from '@angular/core';
import { UrlService } from '../url.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  uname = ''    //登录用户名
  upwd = ''     //登录密码

  constructor(
    private url: UrlService,
    private http: HttpClient,
    private ac: AlertController
  ) { }

  ngOnInit() {}

  doLogin(){
    //console.log(this.uname, this.upwd)
    //异步提交用户的输入给服务器端API，验证登录结果
    let u = this.url.userLoginApi  //请求地址
    let body = `uname=${this.uname}&upwd=${this.upwd}`  //请求主体
    let opts = {   //选项对象
      headers: {    //请求头部
        'Content-Type': 'application/x-www-form-urlencoded'
      }    
    }
    this.http.post(u, body, opts).subscribe((res:any)=>{
      if(res.code === 200){ //登录成功
            //在sessionStorage中记录当前的登录用户名
            sessionStorage['loggedUname'] = this.uname
            //////////////////////////////////////
            this.ac.create({
                header: '登录成功',
                message: '欢迎回来：'+this.uname,
                buttons: ['确定']
            }).then((dialog)=>{
                dialog.present()
            })
      }else { //登录失败
            this.ac.create({
                header: '登录失败',
                message: '错误原因：'+res.msg,
                buttons: ['确定']
            }).then((dialog)=>{
                dialog.present()
            })
      }
    })
  }
}
