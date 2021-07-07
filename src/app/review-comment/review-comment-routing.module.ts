import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewCommentPage } from './review-comment.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewCommentPageRoutingModule {}
