import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticlesComponent } from './article/articles/articles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { TagComponent } from './tag/addEditTag/tag.component';
import { TagListComponent } from './tag/tag-list/tag-list.component';
import { RegisterComponent } from './user/register/register.component';
import { UserListComponent } from './user/user-list/user-list.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'user-list',
        component: UserListComponent,
      },
      {
        path: 'article',
        component: ArticlesComponent,
      },
      {
        path: 'article-list',
        component: ArticleListComponent,
      },
      {
        path: 'tag',
        component: TagComponent,
      },
      {
        path: 'tag-list',
        component: TagListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
