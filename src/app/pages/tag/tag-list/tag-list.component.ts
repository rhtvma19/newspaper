import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/services/api.service';

interface Tag {
  TagID: number;
  Name: string;
}

const Tags: Tag[] = [
  {
    TagID: 1,
    Name: 'sports',
  }, {
    TagID: 2,
    Name: 'world',
  }, {
    TagID: 3,
    Name: 'economy',
  }, {
    TagID: 4,
    Name: 'india',
  }, {
    TagID: 5,
    Name: 'continetnal',
  },
];
@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  tags = Tags;
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
    this.apiService.get('/Tag')
      .subscribe(
        (data: any) => {
          this.toastr.success('Tags fetch successfull');
          this.tags = data;
        },
        (error: any) => {
          // this.toastr.error(error);
          console.log(error);
        });
  }

  edit(id: number) {
    this.router.navigate(['/pages/tag-edit/' + id]);
  }


  delete(id: number) {
    this.apiService.delete('/Tag/' + id)
      .subscribe(
        (data: any) => {
          this.toastr.success('Tag Deleted');
          this.getAll();
        },
        (error: any) => {
          // this.toastr.error(error);
          console.log(error);
        });
  }

}
