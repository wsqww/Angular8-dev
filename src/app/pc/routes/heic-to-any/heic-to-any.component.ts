import { Component, OnInit } from '@angular/core';
import heic2any from 'heic2any';

@Component({
  selector: 'app-heic-to-any',
  templateUrl: './heic-to-any.component.html',
  styleUrls: ['./heic-to-any.component.scss']
})
export class HeicToAnyComponent implements OnInit {

  constructor() { }

  public imgSrc = '';

  ngOnInit() {
  }

  imgChange($event) {
    console.log($event.target.files);
    // const heic: File =  $event.target.files[0];
    const imgSource = $event.target.files[0];

    this.getImgInfo(imgSource)
      .then((res) => {
        console.log(res);
        this.imgSrc = res.href;
      });

    // const imageBlob = await heic2any({
    //   blob: $event.target.files[0],
    //   toType: 'image/jpeg',
    //   // quality: 0.3,
    //   // multiple: true
    // }) as Blob;
    // console.log(imageBlob);
    // const imageBlobSrc = URL.createObjectURL(imageBlob);
    // console.log(this.imgSrc);

    // const newImg = new Image();
    // newImg.src = URL.createObjectURL(imgBlob);
    // newImg.onload = () => {
    //   // console.log(newImg);
    //   const imgInfo = this.imgCompress(newImg, imgBlob.type);
    //   console.log(imgInfo);
    //   this.imgSrc = imgInfo.base64;
    // };


    // const reader = new FileReader();
    // reader.onload = ((eve) => {
    //   // console.log(eve);
    //   const result = eve.target.result;
    //   console.log(result);
    //   this.imgSrc = result;
    //   // 压缩图片
    // }).bind(this);
    // reader.readAsDataURL(image); // 读取文件对象[obj]
  }

  /**
   * 图片信息
   * @param img Blob 图片
   * @returns //{ name: string, href: string, file: Blob }
   */
  async getImgInfo(img) {
    let imgBlob = img;
    // heic 格式的图片 转 jpeg
    if (img.type.includes('/heic')) {
      imgBlob = await heic2any({
        blob: img,
        toType: 'image/jpeg',
      }) as Blob;
    }
    const imgSrc = URL.createObjectURL(imgBlob);
    console.log(imgBlob, imgSrc);
    if (imgBlob.size > 3 * 1000 * 1000) {
      const newImg = new Image();
      newImg.src = imgSrc;
      await newImg.decode(); // 等待图片解码后
      const imgInfo = this.imgCompress(newImg, imgBlob.type);
      console.log(imgInfo);
      return {
        name: img.name,
        href: imgInfo.base64,
        file: imgInfo.blob,
      };
    } else {
      return {
        name: imgBlob.name,
        href: imgSrc,
        file: imgBlob,
      };
    }
  }

  /**
   * 压缩图片
   * @param img 原图片
   * @param type 转换类型
   * @param leval 压缩比例，0-1，越小  越模糊
   */
   imgCompress(img, type = 'image/jpeg', leval = .6) {
    // console.log([img]);
    const width = img.width * leval;
    const height = img.height * leval;
    // console.log(width, height);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');  // 绘图环境
    context.drawImage(img, 0, 0, width, height);
    // 将原来图片的质量压缩
    const base64 = canvas.toDataURL(type, leval); // data url的形式
    const blob = this.dataURLtoBlob(base64);
    // console.log(base64);
    return {
      base64,
      blob
    };
  }

  /**
   * base64文件 转  blob
   * @param dataUrl base64编码文件
   */
   dataURLtoBlob(dataUrl) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

}
