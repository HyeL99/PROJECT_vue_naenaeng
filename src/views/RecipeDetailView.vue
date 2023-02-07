<template>
<main class="recipeDetail">
  <div class="inner" v-if="recipeData !== null">
    <div class="title">
      <span>레시피 제목</span>
      <div class="roundBox">{{recipeData.data.title}}</div>
      <span>작성자 {{recipeData.writer}} | 작성일시 {{getTime(recipeData.time)}}</span>
    </div>
    <div class="category">
      <span>카테고리</span>
      <ul>
        <template v-for="(el,index) in recipeData.data.category">
          <li :key="index">{{el}}</li>
        </template>
      </ul>
    </div>
    <div class="tags">
      <span>태그</span>
      <ul>
        <template v-for="(el,index) in recipeData.data.tags">
          <li :key="index"># {{el}}</li>
        </template>
      </ul>
    </div>
    <div class="material">
      <span>사용재료</span>
      <ul class="roundBox">
        <template v-for="(el,index) in recipeData.data.ingredients">
          <li :key="index">
            <span>{{ el.name }}</span>
            <span class="dots">••••••••••••••••••</span>
            <span>{{el.quantity}}{{el.unit}}</span>
          </li>
        </template>
      </ul>
      <div class="time">
        <img src="@/assets/images/timer.svg" alt="">{{recipeData.data.time}}분 소요
      </div>
    </div>

    <div class="mainContents">
      <ul class="roundBox">
        <template v-for="(item,index) in recipeData.data.contents">
          <li :key="index">
            <span>{{index + 1}}</span>
            <div class="text">
              {{item.text}}
            </div>
            <img :src="item.path" alt="">
          </li>
        </template>
      </ul>
    </div>
  </div>
</main>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "RecipeDetailView",
  data(){
    return {
      recipeId : this.$route.params.recipeId,
      recipeData: null,
    }
  },
  computed:{
    ...mapState(['recipeList'])
  },
  methods:{
    getRecipeData(){
      let dataList = this.recipeList;
      let id = this.$route.params.recipeId;
      this.recipeData = dataList.find(item => item.id === id);
      console.log(this.recipeData)
    },
    getTime(time){
      let timeInKorea = new Date(time);
      let year = timeInKorea.getFullYear();
      let month = timeInKorea.getMonth() + 1 ;
      let date = timeInKorea.getDate();
      let hour = timeInKorea.getHours();
      let minute = timeInKorea.getMinutes();

      if(month < 10) month = '0'+ month;
      if(date < 10) date = '0'+ date;
      if(hour < 10) hour = '0'+ hour;
      if(minute < 10) minute = '0'+ minute;
      return `${year}. ${month}. ${date}. ${hour}:${minute}`
    }
  },
  mounted(){
    setTimeout(this.getRecipeData, 100)
  }
}
</script>

<style lang="scss">
.recipeDetail{
  background-color: #fff;
  padding: 30px 0 70px;

  .roundBox{
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
  }

  .inner{
    max-width: 1000px;
    >div{
      width: 100%;
      margin-bottom: 2rem;
      > span:first-of-type{
        display: block;
        white-space: nowrap;
        font-weight: 700;
      }
    }
    .title{
      display: flex;
      align-items: center;
      column-gap: 1rem;
      span:not(:first-of-type){
        font-size: 0.9rem;
        margin-left: 5rem;
        opacity: 0.8;
      }
      div{
        flex-grow: 1;
      }
    }
    .category{
      display: flex;
      column-gap: 1rem;
      margin-bottom: 1rem;
      span{
        width: 4rem;
      }
      ul{
        display: flex;
        column-gap: 1rem;
        li{}
      }
    }
    .tags{
      display: flex;
      column-gap: 1rem;
      span{
        width: 4rem;
      }
      ul{
        display: flex;
        column-gap: 1rem;
        li{}
      }
    }
    .material{
      display: flex;
      column-gap: 1rem;
      span{}
      ul{
        flex-grow: 1;
        li{
          span{
            &.dots{
              font-size: 0.5rem;
              line-height: 1rem;
              letter-spacing: 0.3rem;
            }
          }
        }
      }
    }
    .time{
      margin-left: 5rem;
      img{
        height: 1rem;
      }
    }
    .mainContents{
      ul{
        padding: 1rem;
        li{
          display: flex;
          justify-content: start;
          margin-bottom: 1rem;
          span{
            flex-shrink: 0;
            display: block;
            line-height: 1.5rem;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            text-align: center;
            background: var(--color-point);
            font-weight: 700;
            color: #fff;
            margin-right: 1rem;
          }
          .text{
            line-height: 1.5rem;
            flex-grow: 1;
          }
          img{
            width: 300px;
            border-radius: 0.5rem;
          }
        }
      }
    }
  }
}
</style>
