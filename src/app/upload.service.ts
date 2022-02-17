import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import { TextoLongitud } from './texto-longitud';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private Rest_URL = 'https://localhost:44338/Text/';

  fileToUpload: File | null = null;
  
  listatexto: TextoLongitud[] = [];

   
  constructor(
    private http: HttpClient,
    
  ) {
    
 }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  

    postUploadFile(file:File):Observable<any> {  
      // Create form data
      const formData = new FormData();         
      // Store form name as "file" with file data
      formData.append("file", file, file.name);        
      // Make http post request over api
      // with formData as req
      var API ='ReadText/';
      return this.http.post(this.Rest_URL + API, formData)
      .pipe(        
        map(response => {          
          return response;
      })        ,
        catchError(this.handleError('Error'))
      )          
    }

    postInputText(value:string):Observable<any> {  
     
      var API ='GetInputText/';
      return this.http.post(this.Rest_URL + API, value, this.httpOptions)
      .pipe(        
        map(response => {          
          return response;
      })        ,
        catchError(this.handleError('Error'))
      )          
    }

    GetDbText():Observable<any> {  
     
      var API ='GetText/';
      return this.http.get(this.Rest_URL + API, this.httpOptions)
      .pipe(        
        map(response => {          
          return response;
      })        ,
        catchError(this.handleError('Error'))
      )          
    }



private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }


  private log(message: string){
  console.log(message);
 }  


}
