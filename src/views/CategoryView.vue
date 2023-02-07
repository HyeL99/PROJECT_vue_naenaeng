<template>
<main class="category">
  <section class="yellow categorys">
    <div class="inner">
      <h2>[ 요리유형별 ]</h2>
      <ul>
        <template v-for="(item,index) in categoryList">
          <li :key="index">
            <router-link :to="{name:'category',params:{categoryName:item.engName}}">
              <img :src="item.imgPath" :alt="item.name">
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </section>
<!--  <section>
        <div class="inner">
          <h2>[ 재료별 ]</h2>
        </div>
      </section>-->
  <section class="recipeView">
    <div class="inner">
      <h2>[ {{title}} ]</h2>
      <ul>
        <template v-for="(recipe, index) in recipeArray">
          <li :key="index">
            <recipe-card-component :propsRecipe="recipe" :propsId="recipe.id" />
          </li>
        </template>
      </ul>
    </div>
  </section>
</main>
</template>

<script>
import {mapState} from "vuex";
import RecipeCardComponent from "@/components/RecipeCardComponent.vue";

export default {
  name: "CategoryView",
  components: {RecipeCardComponent},
  data(){
    return{
      title:'',
      /*keywordList: [
        {
          title: '생선',
          words:[
            {
              name: '회 | 사시미',
              query: ['회','사시미']
            },
            {
              name: '고등어',
              query: ['고등어']
            },
            {
              name: '연어',
              query: ['연어']
            },
            {
              name: '게',
              query: ['게']
            },
            {
              name: '새우',
              query: ['새우']
            },
            {
              name: '기타',
              query: ['생선기타']
            },

          ]
        },
        {
          title: '냉동식품',
          words:[
            {
              name: '냉동 육류',
              query: ['냉동삼겹살','냉동목살']
            },
            {
              name: '튀김',
              query: ['튀김']
            },
            {
              name: '구이',
              query: ['구이']
            },
            {
              name: '기타',
              query: ['냉동기타']
            },

          ]
        },
        {
          title: '육류',
          words:[
            {
              name: '닭',
              query: ['닭고기']
            },
            {
              name: '소',
              query: ['소고기']
            },
            {
              name: '돼지',
              query: ['돼지고기']
            },
            {
              name: '계란',
              query: ['계란']
            },
            {
              name: '기타',
              query: ['육류기타']
            },

          ]
        },
        {
          title: '구황작물',
          words:[
            {
              name: '감자',
              query: ['감자']
            },
            {
              name: '고구마',
              query: ['고구마']
            },
            {
              name: '옥수수',
              query: ['옥수수']
            },
            {
              name: '기타',
              query: ['구황작물기타']
            },

          ]
        },
        {
          title: '유제품',
          words:[
            {
              name: '우유',
              query: ['우유']
            },
            {
              name: '치즈',
              query: ['치즈']
            },
            {
              name: '버터',
              query: ['버터']
            },
            {
              name: '크림',
              query: ['크림']
            },
            {
              name: '기타',
              query: ['유제품기타']
            },

          ]
        },
        {
          title: '가공식품',
          words:[
            {
              name: '햄',
              query: ['햄']
            },
            {
              name: '참치',
              query: ['참치']
            },
            {
              name: '어묵',
              query: ['어묵']
            },
            {
              name: '두부',
              query: ['두부']
            },
            {
              name: '빵',
              query: ['빵']
            },
            {
              name: '기타',
              query: ['가공식품기타']
            },

          ]
        },
        {
          title: '과채류',
          words:[
            {
              name: '베리류',
              query: ['베리류']
            },
            {
              name: '토마토',
              query: ['토마토']
            },
            {
              name: '수박',
              query: ['수박']
            },
            {
              name: '기타',
              query: ['과채류기타']
            },

          ]
        },
        {
          title: '채소류',
          words:[
            {
              name: '피망 | 파프리카',
              query: ['피망','파프리카']
            },
            {
              name: '파 | 양파',
              query: ['파','양파']
            },
            {
              name: '마늘',
              query: ['마늘']
            },
            {
              name: '샐러드',
              query: ['샐러드']
            },
            {
              name: '오이 | 당근 | 배추',
              query: ['오이','당근', '배추']
            },
            {
              name: '기타',
              query: ['채소류기타']
            },

          ]
        },
        {
          title: '곡식',
          words:[
            {
              name: '밀가루',
              query: ['밀가루']
            },
            {
              name: '쌀',
              query: ['쌀']
            },
            {
              name: '잡곡',
              query: ['잡곡']
            },
            {
              name: '기타',
              query: ['곡식기타']
            },

          ]
        },
        {
          title: '양념',
          words:[
            {
              name: '달달한',
              query: ['달달한']
            },
            {
              name: '매콤한',
              query: ['매콤한']
            },
            {
              name: '매운',
              query: ['매운']
            },
            {
              name: '짠',
              query: ['짠']
            },
            {
              name: '담백한',
              query: ['담백한']
            },
            {
              name: '고소한',
              query: ['고소한']
            },
            {
              name: '이국적인',
              query: ['이국적인']
            },
            {
              name: '기타',
              query: ['양념기타']
            },

          ]
        },
        {
          title: '생선',
          words:[
            {
              name: '회 | 사시미',
              query: ['회','사시미']
            },
            {
              name: '고등어',
              query: ['고등어']
            },
            {
              name: '연어',
              query: ['연어']
            },
            {
              name: '게',
              query: ['게']
            },
            {
              name: '새우',
              query: ['새우']
            },
            {
              name: '기타',
              query: ['생선기타']
            },

          ]
        },
        {
          title: '생선',
          words:[
            {
              name: '회 | 사시미',
              query: ['회','사시미']
            },
            {
              name: '고등어',
              query: ['고등어']
            },
            {
              name: '연어',
              query: ['연어']
            },
            {
              name: '게',
              query: ['게']
            },
            {
              name: '새우',
              query: ['새우']
            },
            {
              name: '기타',
              query: ['생선기타']
            },

          ]
        },
      ],*/
      recipeArray:[],
    }
  },
  computed:{
    ...mapState(['categoryList','recipeList'])
  },
  watch:{
    title(){
      if (this.title === '모두보기') this.recipeArray = this.recipeList.sort((a,b) => new Date(b.time) - new Date(a.time));
      else this.recipeArray = this.recipeList.filter(item => item.data.category.includes(this.title)).sort((a,b) => new Date(b.time) - new Date(a.time))
      this.$forceUpdate();
    }
  },
  mounted(){
    switch (this.$route.params.categoryName){
      case 'all': this.title = '모두보기'; break;
      case 'baby': this.title = '이유식'; break;
      case 'baking': this.title = '베이킹'; break;
      case 'diet': this.title = '다이어트'; break;
      case 'home': this.title = '집들이'; break;
      case 'night': this.title = '야식'; break;
      case 'party': this.title = '파티'; break;
      case 'self': this.title = '자취'; break;
      case 'snack': this.title = '간식'; break;
    }
  },
  beforeRouteUpdate(to,from,next){
    console.log(to)
    switch (to.params.categoryName){
      case 'all': this.title = '모두보기'; break;
      case 'baby': this.title = '이유식'; break;
      case 'baking': this.title = '베이킹'; break;
      case 'diet': this.title = '다이어트'; break;
      case 'home': this.title = '집들이'; break;
      case 'night': this.title = '야식'; break;
      case 'party': this.title = '파티'; break;
      case 'self': this.title = '자취'; break;
      case 'snack': this.title = '간식'; break;
    }
    next();
  }
}
</script>

<style lang="scss">
$screen-large: 1024px;
$screen-medium: 768px;
$screen-small: 480px;

.category{
  section{
    padding: 1rem 0 2rem;
    margin-bottom: 5px;
    background-color: #fff;
    h2{
      font-size: 1rem;
      line-height: 3;
    }
    &.categorys{
      ul{
        display: flex;
        column-gap: 0.5rem;
        row-gap: 0.5rem;
        flex-wrap: wrap;
        li{
          width: calc((90vw - 4rem) / 9 - 2px);
          height: calc((90vw - 4rem) / 9 - 2px);
          @media (max-width:#{$screen-large}){
            width: calc((90vw - 4rem) / 5 - 4px);
            height: calc((90vw - 4rem) / 5 - 4px);
          }
          @media (max-width:#{$screen-small}){
            width: calc((90vw - 2rem) / 3 - 6px);
            height: calc((90vw - 2rem) / 3 - 6px);
          }
          a{
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
            background-color: #FCFCFC;
            img{
              width: 90%;
              height: 90%;
              object-fit: cover;
            }
          }
        }
      }
    }
    &.recipeView{
      ul{
        display: flex;
        flex-wrap: wrap;
        row-gap: 2rem;
        column-gap: 2rem;
        li{}
      }
    }
  }
}
</style>
