<template>
  <main class="home">
    <title-component />
    <div class="uploadArea">
      <button @click="$router.push({name: 'upload-recipe'})">레시피 업로드<i class="fa-solid fa-angles-right"></i></button>
    </div>
    <section class="categorys">
      <div class="inner">
        <h2>[레시피 분류]</h2>
        <div class="categoryPlace">
          <template v-for="(item,index) in categoryList">
            <router-link :to="{name:'category',params:{categoryName:item.engName}}" :key="index">
              <img :src="item.imgPath" :alt="item.name">
            </router-link>
          </template>
        </div>
      </div>
    </section>
    <section>
      <div class="inner">
        <h2>[업로드된 레시피]</h2>
        <div class="recipeCardPlace">
          <template v-for="(recipe, index) in recipes">
            <recipe-card-component :propsRecipe="recipe" :propsId="recipe.id" :key="index" />
          </template>
        </div>
      </div>
    </section>
    <section>
      <div class="inner">
        <h2>[추천 레시피 영상]</h2>
        <div class="videoPlace">
          <a :href="video.link" v-for="(video,index) in videos" :key="index">
            <img :src="video.thumbnail" :alt="video.title">
            <span>{{video.title}}</span>
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script>

import TitleComponent from "@/components/TitleComponent.vue";
import {mapState} from "vuex";
import RecipeCardComponent from "../components/RecipeCardComponent.vue";

export default {
  name: 'HomeView',
  components: {RecipeCardComponent, TitleComponent},
  data(){
    return{
      recipes:Array,
      videos:Array,
    }
  },
  computed:{
    ...mapState(['categoryList','recipeList','videoList'])
  },
  methods:{
    getRecipeList(){
      setTimeout(this.spreadRecipeData, 100)
    },
    spreadRecipeData(){
      if(window.innerWidth <= 768){
        this.recipeList.length <= 4 ?
            this.recipes = this. recipeList
            : this.recipes = this. recipeList.slice(0,4);
      } else if(window.innerWidth <= 1024){
        this.recipeList.length <= 6 ?
            this.recipes = this. recipeList
            : this.recipes = this. recipeList.slice(0,6);
      } else {
        this.recipeList.length <= 8 ?
            this.recipes = this. recipeList
            : this.recipes = this. recipeList.slice(0,8);
      }
      //this.$forceUpdate();
    }
  },
  mounted(){
    this.getRecipeList();
    this.videoList.length <= 4 ?
        this.videos = this. videoList
        : this.videos = this. videoList.slice(0,4);
    window.addEventListener('resize',this.getRecipeList)
  }
}
</script>

<style lang="scss">
$screen-large: 1024px;
$screen-medium: 768px;
$screen-small: 480px;

.home{
  .uploadArea{
    margin-top: 5px;
    button{
      width: 100%;
      padding: 1rem 0;
      color: #fff;
      background-color: var(--color-point);
      font-size: 1.2rem;
      font-weight: 700;
      i{
        margin-left: 0.5rem;
      }
    }
  }
  section{
    background-color: #fff;
    margin-top: 5px;
    padding: 2rem 0;
    h2{
      font-size: 1rem;
      line-height: 3;
    }
    .categoryPlace{
      display: flex;
      column-gap: 1rem;
      row-gap: 1rem;
      flex-wrap: wrap;
      a{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
        background-color: #FCFCFC;
        width: calc((90vw - 8rem) / 9 - 2px);
        height: calc((90vw - 8rem) / 9 - 2px);
        @media (max-width:#{$screen-large}){
          width: calc((90vw - 4rem) / 5 - 4px);
          height: calc((90vw - 4rem) / 5 - 4px);
        }
        @media (max-width:#{$screen-medium}){
          width: calc((90vw - 2rem) / 3 - 6px);
          height: calc((90vw - 2rem) / 3 - 6px);
        }
        img{
          width: 90%;
          height: 90%;
          object-fit: cover;
        }
      }
    }
    .recipeCardPlace{
      display: flex;
      flex-wrap: wrap;
      row-gap: 2rem;
      column-gap: 2rem;
    }
    .videoPlace{
      display: flex;
      flex-wrap: wrap;
      row-gap: 2rem;
      column-gap: 2rem;
      a{
        display: block;
        width:calc((90vw - 6rem) / 4 - 5px);
        text-align: center;
        position: relative;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 2px 5px #ddd;
        transition: all 0.3s;
        @media (max-width:#{$screen-large}){
          width:calc((90vw - 2rem) / 2 - 9px);
        }
        @media (max-width:#{$screen-small}){
          width:100%;
        }
        &::before{
          content:"";
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 15px;
          background: transparent;
          opacity: 0.5;
          z-index: 1;
          transition: all 0.3s;
        }
        &:hover{
          transform: scale(1.05);
          &::before{
            background: #000;
            backdrop-filter: blur(5px);
          }
          span{
            color: #fff;
            z-index: 1;
          }
        }
        img{
          width: 100%;
          height: 100%;
        }
        span{
          position: absolute;
          font-size: 20px;
          font-weight: 700;
          color: transparent;
          transition: all 0.3s;
          left: 0;
          bottom: 1rem;
          width: 100%;
        }
      }
    }
  }
}
</style>
