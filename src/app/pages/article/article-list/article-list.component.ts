import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/services/api.service';

interface Article {
  ArticalID: number;
  Title: string;
  SubTitle: string;
  ShortSummary: string;
  Body: string;
  TagID: number;
  UserID: number;
  ArticleStatusID: boolean;
}


const ARTICLES: Article[] = [
  {
    ArticalID: 1,
    Title: 'Rohit',
    SubTitle: 'Verma',
    ShortSummary: 'rohit@gmail.com',
    Body: 'rkv',
    TagID: 1,
    UserID: 1,
    ArticleStatusID: true
  }
];
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles = ARTICLES;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
  ) {

  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.apiService.get('Article')
      .subscribe(
        (data: any) => {
          this.toastr.success('Tags fetch successfull');
          this.articles = data;
        },
        (error: any) => {
          // this.toastr.error(error);
          console.log(error);
        });
  }

  edit(id: number) {
    this.router.navigate(['/pages/article-edit/' + id]);
  }


  delete(id: number) {
    this.apiService.delete('Article/' + id)
      .subscribe(
        (data: any) => {
          this.toastr.success('Article Deleted');
          this.getAll();
        },
        (error: any) => {
          // this.toastr.error(error);
          console.log(error);
        });
  }

}
