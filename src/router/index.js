import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from "../views/CategoryView.vue";
import CommunityView from "../views/CommunityView.vue";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import MypageView from "../views/MypageView.vue";
import UploadRecipeView from "../views/UploadRecipeView.vue";
import RecipeDetailView from "../views/RecipeDetailView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/category/:categoryName',
    name: 'category',
    component: CategoryView
  },
  {
    path: '/community',
    name: 'community',
    component: CommunityView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MypageView
  },
  {
    path: '/upload-recipe',
    name: 'upload-recipe',
    component: UploadRecipeView
  },
  {
    path: '/recipe/:recipeId',
    name: 'recipe',
    component: RecipeDetailView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
