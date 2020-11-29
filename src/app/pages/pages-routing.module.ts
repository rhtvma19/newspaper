import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from '../common/services/auth/guard.service';
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
      // User
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'user-edit/:id',
        component: RegisterComponent,
        canActivate:[GuardService]
      },
      {
        path: 'user-list',
        component: UserListComponent,
        canActivate:[GuardService]
      },
      // Article
      {
        path: 'article',
        component: ArticlesComponent,
      },
      {
        path: 'article-edit/:id',
        component: ArticlesComponent,
        canActivate:[GuardService]
      },
      {
        path: 'article-list',
        component: ArticleListComponent,
      },
      // Tag
      {
        path: 'tag',
        component: TagComponent,
      },
      {
        path: 'tag-edit/:id',
        component: TagComponent,
      },
      {
        path: 'tag-list',
        component: TagListComponent,
        canActivate:[GuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
