import { UrlService } from './url.service';
import { Pipe } from '@angular/core';

@Pipe({name: 'image'})
export class ImagePipe {
  //Service也可注入给Pipe
  constructor(private url: UrlService){}
  /**
   * 把所有的<img src="img/xxx.jpg">
   * 转换为<img src="http://www.codeboy.com/img/xxx.jpg"
   */
  transform(val){
    //必须保证val是string类型，如果是undefined就无需转换
    if( val ){
      return val.replace(/src="img\//g, 'src="'+ this.url.server + 'img/')
    }
  }
}