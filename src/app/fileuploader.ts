import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const csvUtils = {
    toJSON:function toJSON(csvStr:string):object[]{
        const {rows,headers} = this.getParts(csvStr)
        const arr = []
        rows.forEach((row,index)=>{
            const rowArr = row.split(',')
            if(index !=0 && rowArr.length===headers.length){
                let r = {}
                headers.forEach((h,i)=>{
                r[h] = rowArr[i]
                })
                arr.push(r)
            }
        })
        return arr;
    },
    isCsvFile:function isCsvFile(file:File):boolean{
        if(file.name.endsWith('.csv')) return true;
        return false;
    },
    getParts:function(csvStr:string):object{
        const rows:string[] = (<string>csvStr).split(/\r\n|\n/);
        const headers:string[] = (rows[0]).split(',');
        return {rows,headers};
    }

}

const imgUtils = {
    getURLfromfile:function getURLfromfile(file:File){
        return URL.createObjectURL(file)
    }
}

export const utils = {
    csvUtils:csvUtils,
    imgUtils:imgUtils
}

interface UploadOptions{
    uploadName:string;
    baseUrl:string;
}

@Injectable({
    providedIn:'root'
})
export class uploaderService{
    constructor(
        private http:HttpClient
    ){}

    uploadCSVFile(file:File,uploadOptions:UploadOptions){
        const csvBlob = new Blob([file],{type:'text/csv'})
        const formData = new FormData()
        formData.append(uploadOptions.uploadName,csvBlob,file.name)
        return this.http.post(uploadOptions.baseUrl,formData).toPromise();
    }

}