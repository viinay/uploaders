import { Component, OnInit, ViewChild } from '@angular/core';
import { utils } from '../fileuploader'

@Component({
  selector: 'app-imageuploader',
  templateUrl: './imageuploader.component.html',
  styleUrls: ['./imageuploader.component.css']
})
export class ImageuploaderComponent implements OnInit {
  @ViewChild('myImg') myImg; 
  constructor() { }

  ngOnInit(): void {
  }

  imageUpload(event):void{
    const files:FileList = event.srcElement.files;
    const file:File = files[0];
    this.myImg.nativeElement.src = utils.imgUtils.getURLfromfile(file)
  }

}
