import { Component, OnInit } from '@angular/core';
import {utils,uploaderService} from '../fileuploader';

@Component({
  selector: 'app-csvuploader',
  templateUrl: './csvuploader.component.html',
  styleUrls: ['./csvuploader.component.css']
})
export class CsvuploaderComponent implements OnInit {
  csvFileName:string;

  constructor(
    private _uploadService:uploaderService,
  ) {}

  ngOnInit(): void {
  }

  uploadCSV(event){
    const files:FileList = event.srcElement.files;
    const file:File = files[0];

    const validCsvFile = utils.csvUtils.isCsvFile(file);
    if(!validCsvFile){
      console.log('not a csv file')
      return;
    }

    this.sendFileToServer(file)
    this.displayCsvAsTable(file)
  }

  sendFileToServer(file:File):void{
    this._uploadService.uploadCSVFile(file,{uploadName:'csv_file',baseUrl:'https://localhost:3000'})
      .then(response=>{
        console.log(response)
      })
      .catch(error=>{
        console.log(error)
      })
  }


  displayCsvAsTable(file:File){
    const reader:FileReader = new FileReader()
    reader.readAsText(file)
    reader.onload=()=>{
      const csvJSON:object[] = utils.csvUtils.toJSON(reader.result as string)
      console.log(csvJSON) //use this json to build table
    }
  }

}

