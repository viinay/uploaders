# upload file to server
inorder to upload a file to server:
  * 1st] get the file object using input element,drag-n-drop element
  * 2nd] create formData using FormData and append key as filename and value as blob (check below on how to create blob from file object)
  * 2nd] use network API like fetch to upload the file object to server

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
```
```
uploadCsv(){
  const files = document.getElementById("csvFile").files;  
}

uploadCsv(input){
  const files = input.files;
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
