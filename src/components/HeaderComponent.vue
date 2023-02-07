<template>
  <header>
    <div class="inner">
      <router-link :to="{name:'home'}"><h1><img src="@/assets/images/logo.png" alt="내냉" title="내냉"></h1></router-link>
      <form @submit="searchRecipe">
        <label for="searchInput"><img src="@/assets/images/search.png" alt="검색아이콘"></label>
        <input type="text" id="searchInput" v-model="searchInput" placeholder="원하시는 레시피를 찾아가세요! 🥄내냉">
      </form>
      <nav>
        <router-link :to="{name:'category',params:{categoryName: 'all'}}" >카테고리</router-link>
        <router-link :to="{name:'community'}" >커뮤니티</router-link>
        <router-link :to="{name:'login'}" v-if="currentUser === null">로그인</router-link>
        <router-link :to="{name:'mypage'}" v-else>마이페이지</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "HeaderComponent",
  data(){
    return{
      searchInput: null,
    }
  },
  computed:{
    ...mapState(['currentUser'])
  },
  methods:{
    searchRecipe(e){
      e.preventDefault();
      console.log(this.searchInput);
    }
  }
}
</script>

<style lang="scss">
header{
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  padding: 2rem 0 1rem;
  background-color: #fff;
  position: sticky;
  left: 0;
  top: 0;
  z-index: 1;
  .inner{
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
      img{
        height: 30px;
      }
    }
    form{
      background-color: #f7f7f7;
      padding: 0.2rem 1rem;
      border-radius: 1rem;
      display: flex;
      column-gap: 1rem;
      width: 50%;
      max-width: 700px;
      input{
        line-height: 1.2rem;
        outline: 0;
        background: transparent;
        border: 0;
        flex-grow: 1;
      }
      label{
        background-color: transparent;
        border: 0;
        img{
          height: 20px;
        }
      }
    }
    nav{
      display: flex;
      column-gap: 2rem;
      a{
        font-weight: 700;
      }
    }
  }

}
</style>
