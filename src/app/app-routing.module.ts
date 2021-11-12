import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  // {
  //   path: '',
  //   redirectTo: 'main-home',
  //   pathMatch: 'full'
  // },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
 
  {
    path: 'questionnaire',
    loadChildren: () => import('./questionnaire/questionnaire.module').then( m => m.QuestionnairePageModule)
  },
  {
    path: 'shopping-lists',
    loadChildren: () => import('./shopping-lists/shopping-lists.module').then( m => m.ShoppingListsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'shopping-lists1',
    loadChildren: () => import('./shopping-lists1/shopping-lists1.module').then( m => m.ShoppingLists1PageModule)
  },
  {
    path: 'stores-list',
    loadChildren: () => import('./stores-list/stores-list.module').then( m => m.StoresListPageModule)
  },
  {
    path: 'store1',
    loadChildren: () => import('./store1/store1.module').then( m => m.Store1PageModule)
  },
  {
    path: 'grocery-list',
    loadChildren: () => import('./grocery-list/grocery-list.module').then( m => m.GroceryListPageModule)
  },
  {
    path: 'grocery-list-share',
    loadChildren: () => import('./grocery-list-share/grocery-list-share.module').then( m => m.GroceryListSharePageModule)
  },
  {
    path: 'meal-ideas',
    loadChildren: () => import('./meal-ideas/meal-ideas.module').then( m => m.MealIdeasPageModule)
  },
  {
    path: 'my-stores',
    loadChildren: () => import('./my-stores/my-stores.module').then( m => m.MyStoresPageModule)
  },
  {
    path: 'recommended',
    loadChildren: () => import('./recommended/recommended.module').then( m => m.RecommendedPageModule)
  },
  {
    path: 'recommended-camping-trip',
    loadChildren: () => import('./recommended-camping-trip/recommended-camping-trip.module').then( m => m.RecommendedCampingTripPageModule)
  },
  {
    path: 'safety-awareness',
    loadChildren: () => import('./safety-awareness/safety-awareness.module').then( m => m.SafetyAwarenessPageModule)
  },
  
 
  {
    path: 'manage-payments',
    loadChildren: () => import('./manage-payments/manage-payments.module').then( m => m.ManagePaymentsPageModule)
  },
  {
    path: 'add-new-card',
    loadChildren: () => import('./add-new-card/add-new-card.module').then( m => m.AddNewCardPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./terms-conditions/terms-conditions.module').then( m => m.TermsConditionsPageModule)
  },
  {
    path: 'past-orders',
    loadChildren: () => import('./past-orders/past-orders.module').then( m => m.PastOrdersPageModule)
  },
  {
    path: 'past-orders1',
    loadChildren: () => import('./past-orders1/past-orders1.module').then( m => m.PastOrders1PageModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule)
  },
  {
    path: 'store-detail',
    loadChildren: () => import('./store-detail/store-detail.module').then( m => m.StoreDetailPageModule)
  },
  {
    path: 'buying-habit',
    loadChildren: () => import('./buying-habit/buying-habit.module').then( m => m.BuyingHabitPageModule)
  },
  {
    path: 'saved-meals',
    loadChildren: () => import('./saved-meals/saved-meals.module').then( m => m.SavedMealsPageModule)
  },
  {
    path: 'shop-nav',
    loadChildren: () => import('./shop-nav/shop-nav.module').then( m => m.ShopNavPageModule)
  },
  {
    path: 'main-home',
    loadChildren: () => import('./main-home/main-home.module').then( m => m.MainHomePageModule)
  },
  {
    path: 'main-account',
    loadChildren: () => import('./main-account/main-account.module').then( m => m.MainAccountPageModule)
  },
  {
    path: 'main-factor',
    loadChildren: () => import('./main-factor/main-factor.module').then( m => m.MainFactorPageModule)
  },
  {
    path: 'review-rating',
    loadChildren: () => import('./review-rating/review-rating.module').then( m => m.ReviewRatingPageModule)
  },
  {
    path: 'safety-awareness-deatils',
    loadChildren: () => import('./safety-awareness-deatils/safety-awareness-deatils.module').then( m => m.SafetyAwarenessDeatilsPageModule)
  },
  {
    path: 'review-comment',
    loadChildren: () => import('./review-comment/review-comment.module').then( m => m.ReviewCommentPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'payment-sucess',
    loadChildren: () => import('./payment-sucess/payment-sucess.module').then( m => m.PaymentSucessPageModule)
  },
  {
    path: 'questionnaire',
    loadChildren: () => import('./questionnaire/questionnaire.module').then( m => m.QuestionnairePageModule)
  },
  {
    path: 'blank',
    loadChildren: () => import('./blank/blank.module').then( m => m.BlankPageModule)
  },
  {
    path: 'meal-ideas-list',
    loadChildren: () => import('./meal-ideas-list/meal-ideas-list.module').then( m => m.MealIdeasListPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'notification-detail',
    loadChildren: () => import('./notification-detail/notification-detail.module').then( m => m.NotificationDetailPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
