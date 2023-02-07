<template>
<main class="signUp">
  <div class="inner">
    <section>
      <div class="face">
        <img src="@/assets/images/face.png" alt="내냉">
      </div>
      <div class="contents">
        <img src="@/assets/images/loginTitle.png" alt="내냉">
        <hr>
        <div class="linkBtns">
          <span :class="thisPage === 1 ? 'circle big yellow' : 'circle big'">개인정보</span>
          <span :class="thisPage === 1 ? 'circle big' : 'circle big yellow'">관심분야</span>
        </div>
        <template v-if="thisPage === 1">
          <form>
            <div class="usernamePlace fieldWrap">
              <span class="circle yellow">닉네임</span>
              <div class="inputField">
                <input type="text" v-model="usernameInput">
                <p v-if="isDuplicate"><i class="fa-solid fa-circle-exclamation"></i>닉네임이 중복됩니다.</p>
              </div>
            </div>
            <div class="profilePlace fieldWrap">
              <span class="circle yellow">프로필</span>
              <div class="inputField">
                <template>
                  <input type="text" disabled :value="imgData.name" :key="imgData.name">
                </template>
                <label for="profile" class="yellow">파일찾기</label>
                <input type="file" id="profile" accept=".gif, .jpg, .jpeg, .png" @change="handleFileChange">
              </div>
            </div>
            <template v-if="imgData.path">
              <div class="preview">
                <img :src="imgData.path" alt="프로필 미리보기">
              </div>
            </template>
          </form>
        </template>
        <template v-else>
          <p><i class="fa-solid fa-utensils"></i>&nbsp;&nbsp;최소 2개를 선택해주세요&nbsp;&nbsp;<i class="fa-solid fa-utensils"></i></p>
          <ul>
            <li v-for="(recipe,index) in categoryList.slice(1)" :key="index">
              <button @click="handleInterest(index)" class="circle xl">
                <img :src="recipe.imgPath" :alt="recipe.name" v-if="whatInterest[index]">
                <img :src="recipe.blackImgPath" :alt="recipe.name" v-else>
              </button>
            </li>
          </ul>
        </template>
        <button
            class='pagingBtn'
            v-if="thisPage === 2"
            @click="goPage(1)"
        >이전</button>
        <button
            :class="username === '' || isDuplicate ? 'pagingBtn yellow disabled' : 'pagingBtn yellow'"
            :disabled="username === '' || isDuplicate ? true : false"
            v-if="thisPage === 1"
            @click="goPage(2)"
        >다음</button>
        <button
            :class="trueNum < 2 ? 'pagingBtn disabled yellow' : 'pagingBtn yellow'"
            :disabled="trueNum < 2 ? true : false"
            v-else
            @click="goSignUp"
        >완료</button>
      </div>
    </section>
  </div>

</main>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "LoginView",
  data(){
    return {
      thisPage: 1,
      usernameInput: '',
      username:'',
      whatInterest: Array,
      trueNum: 0,
      imgData: {
        name: '',
        path: '',
      },
      isDuplicate: false,
    }
  },
  computed:{
    ...mapState(['categoryList','userData'])
  },
  watch:{
    whatInterest(array){
      this.trueNum = array.filter(item => item === true).length;
    },
    usernameInput(value){
      //앞뒤 공백 제거 및 연속 공백 제거
      this.username = value.replace(/^\s+|\s+$/gm,'').replace(/ +/g, " ");
      console.log(this.username,this.username.length)
    },
    username(value){
      let duplicate = this.userData.find(item => item.username === value)
      if(duplicate) this.isDuplicate = true;
      else this.isDuplicate = false;
    }
  },
  methods:{
    ...mapActions(['doLogin','doSignUp']),
    handleInterest(index){
      this.whatInterest.splice(index,1,!this.whatInterest[index])
    },
    handleFileChange(e){
      let file = e.target.files[0];
      this.imgData.name = file.name;
      if(file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') ||
          file.name.endsWith('.png') || file.name.endsWith('.gif'))
        this.imgData.path = URL.createObjectURL(file);
      else {
        alert('파일 확장자는 ".gif, .jpg, .jpeg, .png"만 가능합니다.')
        this.imgData.name = '';
        this.imgData.path = '';
      }

      console.log(this.imgData)
    },
    goPage(page){
      this.thisPage = page;
    },
    goSignUp(){
      if(this.username === '') alert('닉네임을 입력해주세요')
      else {
        const userObj = {username: this.username,imgData: this.imgData,interest: this.whatInterest}
        this.doSignUp(userObj)
      }
    }
  },
  mounted(){
    this.whatInterest = this.categoryList.slice(1).map(() => false);
    let fileSelector = document.querySelector('#profile')
  }
}
</script>

<style lang="scss">
.signUp{
  background-color: #fff;
  .inner{
    padding: 100px 0;
    section{
      border: 2px solid var(--color-text);;
      border-radius: 1.5rem;
      position: relative;
      padding: 100px 2rem;
      width: calc(130px * 4 + 1rem * 3 + 4rem + 4px);
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
          height: 40px;
        }
        hr{
          border: 0;
          border-top: 1px solid #ddd;
          margin: 1rem 5rem;
        }
        .linkBtns{
          margin-bottom: 50px;
          span {
            &:not(.yellow){
              opacity: 0.7;
            }
            &:first-of-type {
              margin-right: 1rem;
            }
          }
        }
        form{
          .usernamePlace{
            span{}
            .inputField{
              position: relative;
              input{}
              p{
                position: absolute;
                bottom: -1.5rem;
                left: 0;
                width: 100%;
                text-align: center;
                i{
                  color: crimson;
                  margin-right: 0.5rem;
                }
              }
            }
          }
          .profilePlace{
            margin-top: 1rem;
            span{}
            .inputField{
              display: flex;
              column-gap: 1rem;
              padding: 0.3rem;
              padding-left: 1rem;
              input[type="text"]{}
              label{}
              input[type='file']{
                display: none;
              }
            }
          }
          .preview{
            border: 1px solid #ddd;
            padding: 1rem;
            margin: 2rem 5rem 0;
            border-radius: 1rem;
            position: relative;
            &::after{
              content: "Preview";
              position: absolute;
              color: #ddd;
              left: 1rem;
              top: -0.6rem;
              background-color: #fff;
              padding: 0 0.5rem;
            }
            img{
              max-width: 100%;
            }
          }
        }
        > p{
          margin: -1rem 0 2rem;
        }
        ul{
          display: flex;
          flex-wrap: wrap;
          row-gap: 1rem;
          column-gap: 1rem;
          li{
            button{
              overflow: hidden;
              box-shadow: 0 0 5px rgba(0,0,0,0.2);
              background-color: #FCFCFC;
              display: flex;
              justify-content: center;
              align-items: center;
              img{
                width: 80%;
                height: 80%;
                object-fit: cover;
              }
            }
          }
        }
        .pagingBtn{
          width: 150px;
          height: 40px;
          border-radius: 1rem;
          font-size: 1.1rem;
          font-weight: 700;
          margin-top: 3rem;
          &:not(.yellow){
            margin-right: 1rem;
            background-color: #eee;
          }
          &.disabled{
            opacity: 0.5;
          }
        }
      }
    }
  }
  .circle{
    display: inline-block;
    background-color: #eee;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    line-height: 50px;
  }
  .big{
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
  .xl{
    width: 130px;
    height: 130px;
    line-height: 130px;
  }
  .fieldWrap{
    display: flex;
    margin: 0 5rem;
    column-gap: 2rem;
    align-items: center;
    span{
      font-size: 0.9rem;
    }
    .inputField{
      flex-grow: 1;
      background-color: #eee;
      padding: 0.3rem 1rem;
      border-radius: 1rem;
      input{
        width: 100%;
        line-height: 1.2rem;
        border: 0;
        outline: 0;
        background-color: transparent;
      }
      label{
        line-height: 1.2rem;
        padding: 0 0.5rem;
        border-radius: 0.5rem;
      }
    }
  }

}
</style>
