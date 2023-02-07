<template>
<main class="login">
  <div class="inner">
    <section>
      <div class="face">
        <img src="@/assets/images/face.png" alt="내냉">
      </div>
      <div class="contents">
        <img src="@/assets/images/loginTitle.png" alt="내냉">
        <hr>
        <p>레시피 저장소 🥄내냉에 오신 것을 환영합니다🎉</p>
        <button @click="doLogin('naver')" class="socialBtn">
          <img src="@/assets/images/logo-naver.png" alt="네이버"> 네이버로 로그인
        </button>
        <button @click="doLogin('kakao')" class="socialBtn">
          <img src="@/assets/images/logo-kakao.png" alt="카카오"> 카카오로 로그인
        </button>
        <button @click="doLogin('google')" class="socialBtn">
          <img src="@/assets/images/logo-google.png" alt="구글"> 구글로 로그인
        </button>
      </div>
    </section>
  </div>

</main>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "LoginView",
  data(){
    return{
      isLogin: true,
    }
  },
  methods:{
    ...mapActions(['doLogin']),
  }
}
</script>

<style lang="scss">
.login{
  background-color: #fff;
  .inner{
    padding: 100px 0;
    section{
      border: 2px solid var(--color-text);;
      border-radius: 1.5rem;
      position: relative;
      padding-top: 100px;
      width: 400px;
      margin: 0 auto;
      .face{
        width: 200px;
        border: 2px solid var(--color-text);;
        overflow: hidden;
        border-radius: 1.5rem;
        position: absolute;
        left: calc(50% - 100px);
        top: -50px;
        img{
          width: 100%;
          border-bottom: 2rem;
          margin-bottom: -3px;
          overflow: hidden;
        }
      }
      .contents{
        text-align: center;
        > img{
          height: 60px;
        }
        hr{
          border: 0;
          border-top: 1px solid #ddd;
          margin: 2rem 5rem;
        }
        p{
          margin-bottom: 2rem
        }
        .socialBtn{
          border: 2px solid var(--color-text);;
          width: 80%;
          height: 40px;
          margin: 0 auto;
          border-radius: 0.5rem;
          position: relative;
          font-size: 0.9rem;
          margin-bottom: 10px;
          &:nth-of-type(1){
            background-color: #24cd0b;
            color: #fff;
          }
          &:nth-of-type(1){
            background-color: #24cd0b;
            color: #fff;
          }
          &:nth-of-type(2){
            background-color: #fee502;
          }
          &:nth-of-type(3){
            background-color: #fff;
            margin-bottom: 5rem;
          }
          img{
            width: 34px;
            height: 34px;
            object-fit: cover;
            position: absolute;
            left: 0.5rem;
            top: 1px;
          }
        }
      }
    }
  }

}
</style>
