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
