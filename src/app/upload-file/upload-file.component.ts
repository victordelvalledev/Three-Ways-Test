import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { TextoLongitud } from '../texto-longitud';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  constructor(
    private uploadService: UploadService
  ) { 
    
  }

  fileToUpload: File | null = null;
   value;
   values;
   valueInput;

  ngOnInit(): void {
    this.getDbText();

  }

  handleFileInput(files: FileList){
    this.fileToUpload = files.item(0);
    
    this.uploadService.postUploadFile(this.fileToUpload)
    .subscribe(
      value => 
      {
        this.value = value;
        console.log( value)
      }) ; 

  }

  sendTextPost(text:string)
  {
    console.log(text);
    this.uploadService.postInputText(text)
    .subscribe(
      valueInput => 
      {
        this.valueInput = valueInput;
        console.log( valueInput)
      }) ; 
  }
  
  getDbText()
  {
    this.uploadService.GetDbText()
    .subscribe(
      values => 
      {
        this.values = values;
        console.log( values)
      }) ; 
  }


}
