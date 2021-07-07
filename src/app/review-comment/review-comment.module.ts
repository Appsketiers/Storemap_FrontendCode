import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewCommentPageRoutingModule } from './review-comment-routing.module';

import { ReviewCommentPage } from './review-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewCommentPageRoutingModule
  ],
  declarations: [ReviewCommentPage]
})
export class ReviewCommentPageModule {}
