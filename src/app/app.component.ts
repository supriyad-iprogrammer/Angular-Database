import { PostService } from './post.service';
import { Post } from './postData.modal';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Angular-Database';
  loadedPosts : Post[]=[];
  isLoading=false;
  error=null;

private errorsub!:Subscription;
  constructor(private http: HttpClient,
    private postService:PostService) {

  }
  ngOnInit(): void {
   this.errorsub= this.postService.error.subscribe(errorMsg=>{
   this.error=errorMsg;
    })
    this.fetchData();

  }
  onCreatePost(postData: Post) {

    console.log(postData);
    this.postService.createRequest(postData.title,postData.content)
  }

  onFetchPosts() {
    this.fetchData();
  }

  onClearPosts() {
    this.postService.deletePost().subscribe(()=>{
      this.loadedPosts=[];
    });

  }
  private fetchData() {
    this.isLoading=true;
    this.postService.fetchRequest().subscribe(response=>{
      this.loadedPosts=response;
      this.isLoading=false;
    }, error=>{
      this.isLoading=false;
      this.error=error.message;

    });
  }
  ngOnDestroy(){
this.errorsub.unsubscribe();
  }
  onHandleError(){
    this.error=null;
  }
}
