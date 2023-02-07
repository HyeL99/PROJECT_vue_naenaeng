<template>
<main class="mypage">
  <div class="inner">
    <div class="profileArea">
      <img :src="currentUser.profile.path" :alt="`${currentUser.username} 프로필`">
      <div class="contents">
        <h2>{{currentUser.username}}</h2>
        <span>{{currentUser.email}}</span>
        <div class="categorys">
          <h3>내 관심사</h3>
          <ul>
            <template v-for="(el,index) in currentUser.interest">
              <li :key="index"># {{el}}</li>
            </template>
          </ul>
        </div>
        <div class="buttons">
          <button @click="editProfile" class="yellow">프로필 수정</button>
          <button @click="logout" class="yellow">로그아웃</button>
        </div>
      </div>
    </div>
    <div class="recipesArea">
      <div class="top">
        <button @click="isLike = true" :class="isLike ? 'yellow' : ''">찜한 레시피</button>
        <button @click="isLike = false" :class="isLike ? '' : 'yellow'">관심 레시피</button>
      </div>
      <div class="bottom">
        <div class="likeRecipes" v-if="isLike">
          <p v-if="currentUser.likes.length === 0">찜한 레시피가 없습니다.</p>
          <ul v-else>
<!--            <template v-for="(recipe, index) in interestRecipeList">-->
<!--              <li :key="index">-->
<!--                <recipe-card-component :propsRecipe="recipe" :propsId="recipe.id" />-->
<!--              </li>-->
<!--            </template>-->
          </ul>
        </div>
        <div class="interestRecipes" v-else>
          <div class="buttons">
            <button @click="filterRecipeList('모두보기')" :class="subCate === '모두보기' ? 'yellow' : ''">모두보기</button>
            <template v-for="(item,index) in currentUser.interest">
              <button :key="index" @click="filterRecipeList(item)" :class="subCate === item ? 'yellow' : ''">{{item}}</button>
            </template>

          </div>
          <div class="likeRecipes" v-if="!isLike">
            <ul>
              <template v-for="(recipe, index) in sortList">
                <li :key="index">
                  <recipe-card-component :propsRecipe="recipe" :propsId="recipe.id" />
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</main>
</template>

<script>
import {mapActions, mapState} from "vuex";
import store from "@/store";
import router from "@/router";
import RecipeCardComponent from "@/components/RecipeCardComponent.vue";

export default {
  name: "MypageView",
  components: {RecipeCardComponent},
  data(){
    return{
      isLike: true,
      interestRecipeList: Array,
      sortList: Array,
      subCate: "모두보기"
    }
  },
  computed:{
    ...mapState(['currentUser','recipeList'])
  },
  methods:{
    ...mapActions(['doLogout']),
    logout(){
      let res = confirm('로그아웃 하시겠습니까?')
      if(res) {
        this.doLogout();
        this.$router.push({name:'home'})
      }
    },
    filterRecipeList(name){
      this.subCate = name;
      if(name === '모두보기') this.sortList= this.interestRecipeList;
      else this.sortList= this.interestRecipeList.filter(item => item.data.category.includes(name));
      this.$forceUpdate()
    },
    editProfile(){
      console.log('프로필 수정!')
    }
  },
  beforeRouteEnter(to, from, next){
    if(store.state.currentUser === null){
      alert('로그인이 필요합니다.')
      router.push({name:'login'})
    } else next();
  },
  mounted(){
    let myInterest = this.currentUser.interest;
    let myList = [];
    this.recipeList.forEach(item => {
      myInterest.forEach(el => {
        if(item.data.category.includes(el)) myList.push(item)
      })
    })
    myInterest = [...new Set(myList)]
    myInterest = myInterest.sort((a,b) => new Date(b.time) - new Date(a.time)); //최신순으로 노출
    this.interestRecipeList = myInterest;
    this.sortList = myInterest;
  }
}
</script>

<style lang="scss">
$screen-large: 1024px;
$screen-medium: 768px;
$screen-small: 480px;

.mypage{
  background-color: #fff;
  .inner{
    .profileArea{
      display: flex;
      padding: 2rem 0;
      column-gap: 2rem;
      align-items: center;
      max-width: 600px;
      margin: 0 auto;
      img{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
      }
      .contents{
        h2{}
        > span{
          opacity: 0.7;
        }
        .categorys{
          padding-top: 1rem;
          h3{}
          ul{
            display: flex;
            column-gap: 1rem;
            padding-top: 0.5rem;
            li{}
          }
        }
        .buttons{
          padding-top: 1rem;
          button{
            padding: 0.2rem 1rem;
            border-radius: 0.5rem;
            &:first-of-type{
              margin-right: 1rem;
            }
          }
        }
      }
    }
    .recipesArea{
      padding-bottom: 1rem;
      .top{
        display: flex;
        justify-content: center;
        column-gap: 1rem;
        button{
          width: 46%;
          padding: 0.5rem;
          border-radius: 1rem 1rem 0 0;
          border: 1px solid #ddd;
          border-bottom: none;
          &.yellow{
            border: 1px solid var(--color-point);
          }
        }
      }
      .bottom{
        border: 1px solid #ddd;
        padding: 1rem;
        .likeRecipes{}
        .interestRecipes{
          .buttons{
            display: flex;
            column-gap: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #ddd;
            button{
              width: 100%;
              padding: 0.3rem 0;
              border-radius: 0.5rem;
            }
          }
          ul{
            display: flex;
            flex-wrap: wrap;
            row-gap: 2rem;
            column-gap: 2rem;
            padding-top: 1rem;
            li{
              .recipeCard{
                width: calc((90vw - 8rem) / 4 - 5px);
                height: calc((90vw - 8rem) / 4 - 5px);
                @media (max-width:#{$screen-large}){
                  width: calc((90vw - 6rem) / 3 - 6px);
                  height: calc((90vw - 6rem) / 3 - 6px);
                }
                @media (max-width:#{$screen-medium}){
                  width: calc((90vw - 4rem) / 2 - 9px);
                  height: calc((90vw - 4rem) / 2 - 9px);
                }
                @media (max-width:#{$screen-small}){
                  width: calc(90vw - 3rem);
                  height: calc(90vw - 3rem);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
