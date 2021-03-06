# upload file to server
inorder to upload a file to server:
  * 1st get the file object using input element,drag-n-drop element (check below on how to obtain file object)
  * 2nd create formData using FormData and append key as filename and value as blob (check below on how to create blob from file object)
  * 3rd use network API like fetch to upload the file object to server as formData (check below on how to create formData)

## display uploaded csv as table
inorder to display uploaded csv as table
1st get the file object using input element,drag-n-drop element
2nd read the file obect as text using FileReader's readAsText method
3rd parse the text-csv (csvStr) using custom method

## grab file object from uesr interface
### using input element
```
<input type="file" accept=".csv" name="csvFile" id="csvFile" onchange="uploadCsv()"/>
<input type="file" accept=".csv" name="csvFile" id="csvFile" onchange="uploadCsv2(this)"/>
<input type="file" accept=".csv" name="csvFile" id="csvFile" [value]="csvFileName" (change)="uploadCSV3($event)" /> <!--for Angular-->
```
```
uploadCsv1(){
  const files = document.getElementById("csvFile").files;  
}

uploadCsv2(input){
  const files = input.files;
}

uploadCsv3(event){
 const files:FileList = event.srcElement.files;
 const file:File = files[0];
 console.log(`uploading file ${file.name}`)
}
```

## create blob out of file object
```
const csvBlob = new Blob([file],{type:'text/csv'})
```

## create formData
```
const formData = new FormData()
formData.append('key_1','value_1',filename?) //syntax
formData.append('mycsvFile',csvBlob,file.name)
```

## send file object as formData using angular HttpClient
```
this.http.post(BASEURL,formData).toPromise()
```

## create file reader to read the file
we can read the upload file in 3 formats using FileReader 
```
FileReader{
  result;

  //readAs operations
  readAsText(blob|File):void //--> updates this.result with csv as text

  readAsDataURL(blob|File):void //--> updates this.result with base64/dataURL

  readAsArrayBuffer(blob|File):void //--> updates this.result with ArrayBuffer

  //events
  onload():any // event listener emits after file has been loaded; event wont emit if no readAs operation is performed
}
```

```
const reader = new FileReader()
reader.readAsText(file)
reader.onload = ()=>{
 console.log(reader.result) // csv as text
}
```

## complete example code for Angular framework
```
//csvuploader.component.html
<input type="file" accept=".csv" name="csvFile" id="csvFile" [value]="csvFileName" (change)="uploadCSV($event)" />
```
```
//csvuploader.component.ts
uploadCSV(event){
    const files:FileList = event.srcElement.files;
    const file:File = files[0];

    const validCsvFile = utils.csvUtils.isCsvFile(file); //func which checks file.name.endsWith('.csv')
    if(!validCsvFile){
      console.log('not a csv file')
      return;
    }

    this._uploadService.uploadCSVFile(file,{uploadName:'csv_file',baseUrl:'https://localhost:3000'}) //func which create formData out of file object (check above on how to use formData)
      .then(response=>{
        console.log(response)
      })
      .catch(error=>{
        console.log(error)
      })
    
    const reader:FileReader = new FileReader()
    reader.readAsText(file)
    reader.onload=()=>{
      const csvJSON:object[] = utils.csvUtils.toJSON(reader.result as string) //func which parses the csvStr
      console.log(csvJSON) //use this json to build table
    }
  }
```

```
const csvStr = 
`name,place,powers
superman,krypton,flying
batman,gotham,super-rich
`
const rows = csvStr.split(\n)
const headers = rows[0].split(',')
```

## download csv
* to download csv we should have csvStr data.Format of csvStr data is shown above.
* create csvBlob out of csvStr as follows
```const csvBlob = new Blob(['\ufeff' + csvStr], { type: 'text/csv;charset=utf-8;' });```
* which the csvBlob we can create a downloadable link using
```const url = URL.createObjectURL(csvBlob);```
* now we have a downloadable link, from here we can create a tag with download attribure set and click it.
```
const dwldLink = document.createElement('a');
const isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
    dwldLink.setAttribute("target", "_blank");
}
dwldLink.setAttribute("href", url);
dwldLink.setAttribute("download", `${fileName}.csv`);
dwldLink.style.visibility = "hidden";
document.body.appendChild(dwldLink);
dwldLink.click();
document.body.removeChild(dwldLink);
```
