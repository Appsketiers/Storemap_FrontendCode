import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewCommentPageRoutingModule } from './review-comment-routing.module';

import { ReviewCommentPage } from './review-comment.page';
import { IonicRatingModule } from 'ionic4-rating';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicRatingModule,
    ReviewCommentPageRoutingModule
  ],
  declarations: [ReviewCommentPage]
})
export class ReviewCommentPageModule {}
