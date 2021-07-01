import { Post } from './postData.modal';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  error = new Subject<any>();
  constructor(
    private http: HttpClient
  ) { }

  createRequest(title: string, content: string) {
    const postdata: Post = { title: title, content: content }
    this.http.post<{ name: string }>('https://angular-practice-74410-default-rtdb.firebaseio.com/posts.json', postdata).subscribe(
      responseData => {
        console.log(responseData)
      }, error => {
        this.error.next(error.message);
      }

    )
  }
  fetchRequest() {
    return this.http.get<{ [key: string]: Post }>('https://angular-practice-74410-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({ 'Myheader': 'hello' }) ,
        params:new HttpParams().set('print','pritty')
      }).pipe(
        map(responseData => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key })

            }
          }
          return postArray;
        }),
        catchError(errorRes => {
          return throwError(errorRes)
        })
      );
  }
  deletePost() {
    return this.http.delete('https://angular-practice-74410-default-rtdb.firebaseio.com/posts.json',{
      observe:'events'
    }).pipe(
      tap(event=>{
        console.log(event);
        if(event.type===HttpEventType.Sent){

        }
        if(event.type===HttpEventType.Response){
          console.log(event.body)
        }
      })
    )
  }
}
