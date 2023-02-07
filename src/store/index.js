import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

const BASE_URL = 'https://my-json-server.typicode.com/Hyel99/VueNaenaeng';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser:null,
    signUpUserData:{
      id: String,
      username: String,
      email: String,
      profile: String,
      interest:Array,
      likes: [],
    },
    isLogin: true,
    isLoading: false,
    categoryList:[
      {
        name: '모두 보기',
        engName: 'all',
        imgPath: require('../assets/images/category/btn-all.png'),
        blackImgPath: require('../assets/images/category/btn-all-black.png'),
      },
      {
        name: '이유식',
        engName: 'baby',
        imgPath: require('../assets/images/category/btn-baby.png'),
        blackImgPath: require('../assets/images/category/btn-baby-black.png'),
      },
      {
        name: '베이킹',
        engName: 'baking',
        imgPath: require('../assets/images/category/btn-baking.png'),
        blackImgPath: require('../assets/images/category/btn-baking-black.png'),
      },
      {
        name: '다이어트',
        engName: 'diet',
        imgPath: require('../assets/images/category/btn-diet.png'),
        blackImgPath: require('../assets/images/category/btn-diet-black.png'),
      },
      {
        name: '집들이',
        engName: 'home',
        imgPath: require('../assets/images/category/btn-home.png'),
        blackImgPath: require('../assets/images/category/btn-home-black.png'),
      },
      {
        name: '야식',
        engName: 'night',
        imgPath: require('../assets/images/category/btn-night.png'),
        blackImgPath: require('../assets/images/category/btn-night-black.png'),
      },
      {
        name: '파티',
        engName: 'party',
        imgPath: require('../assets/images/category/btn-party.png'),
        blackImgPath: require('../assets/images/category/btn-party-black.png'),
      },
      {
        name: '자취',
        engName: 'self',
        imgPath: require('../assets/images/category/btn-self.png'),
        blackImgPath: require('../assets/images/category/btn-self-black.png'),
      },
      {
        name: '간식',
        engName: 'snack',
        imgPath: require('../assets/images/category/btn-snack.png'),
        blackImgPath: require('../assets/images/category/btn-snack-black.png'),
      },

    ],
    recipeList: [],
    videoList: [
      {
        title : "대파 듬뿍! 삼겹살로 만든 '대파 제육볶음",
        link : "https://www.youtube.com/watch?v=j7s9VRsrm9o",
        thumbnail : "https://i.ytimg.com/vi/j7s9VRsrm9o/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSjXIbKcGDnIM0DCY452pIfAY0vQ"
      },
      {
        title : "성공률 100% 돼지고기 김치찌개",
        link : "https://www.youtube.com/watch?v=qWbHSOplcvY",
        thumbnail : "https://i.ytimg.com/vi/qWbHSOplcvY/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBKPKQL8_LG6noRHjxSBoGSdKYrHw"
      },
      {
        title :"[Sub] 스팸+달걀+김치+마요네즈=끝!",
        link : "https://www.youtube.com/watch?v=kj2ZupQ7fts",
        thumbnail : "https://i.ytimg.com/vi/kj2ZupQ7fts/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBHAdEBlXYNHg5uJdimJOALnXQlgQ"
      },
      {
        title : "올 한해도 떡만둣국 드시고 대박 나세요!! ㅣ 백종원의 쿠킹로그",
        link : "https://www.youtube.com/watch?v=At-u3lwsFtk",
        thumbnail : "https://i.ytimg.com/vi/At-u3lwsFtk/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC9S-HKDFLO-9BklqqY2uWY7ifVOg"
      },
      {
        title : "제목5",
        link : "",
        thumbnail : "https://via.placeholder.com/250x145/f4f4f4/666666/?text=Youtube+5"
      },
      {
        title : "제목6",
        link : "",
        thumbnail : "https://via.placeholder.com/250x145/f4f4f4/666666/?text=Youtube+6"
      },
      {
        title : "제목7",
        link : "",
        thumbnail : "https://via.placeholder.com/250x145/f4f4f4/666666/?text=Youtube+7"
      },
      {
        title : "제목8",
        link : "",
        thumbnail : "https://via.placeholder.com/250x145/f4f4f4/666666/?text=Youtube+8"
      }
    ],
    userData: [],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    doSignUp(context,userObj){
      context.state.signUpUserData.id = uuidv4();
      context.state.signUpUserData.username = userObj.username;
      context.state.signUpUserData.profile = userObj.imgData;
      let interestBooleans = userObj.interest;
      let interestArray = [];
      interestBooleans.forEach((item, index) => {
        if (item) interestArray.push(context.state.categoryList[index+1].name)
      })
      context.state.signUpUserData.interest = interestArray;

      console.log('회원가입 실행',context.state.signUpUserData);
      context.state.currentUser = context.state.signUpUserData;
      alert(`${context.state.signUpUserData.username}님, 회원가입이 완료되었습니다.`)
      router.push({name:'home'})
    },
    doLogin(context,type){
      context.state.isLoading = true;
      let loginAction = () => {};
      switch (type){
        case 'naver': loginAction = context.dispatch('loginNaver'); break;
        case 'kakao': loginAction = context.dispatch('loginKakao'); break;
        case 'google': loginAction = context.dispatch('loginGoogle'); break;
      }
      loginAction.then(res => { // res.data.email 사용
        let user = context.state.userData.find(item => item.email === res.data.email);
        if(user){
          context.state.currentUser = user;
          context.state.isLoading = false;
          router.push({name:'home'})
        } else {
          alert('일치하는 계정이 없습니다. 회원가입 창으로 전환합니다.');
          context.state.signUpUserData.email = res.data.email;
          context.state.isLoading = false;
          router.push({name:'signup'})
        }
      })
    },
    doLogout(context){
      context.state.currentUser = null;
    },
    loginNaver(){
      console.log('네이버 로그인');
      let res = {data: {email: 'pochacco@ex.com'}}
      return res;
    },
    loginKakao(){
      console.log('카카오 로그인');
      let res = {data: {email: 'ex02@ex.com'}}
      return res;
    },
    loginGoogle(){
      console.log('구글 로그인');
      let res = {data: {email: 'kuromi@ex.com'}}
      return res;
    },
    uploadRecipe(context,contentsObj){
      const recipeData = {
        id: uuidv4(),
        writer: context.state.currentUser.username,
        time: new Date(),
        data: contentsObj
      }
      console.log(recipeData)
      axios.post(BASE_URL+'/recipes',recipeData)
          .then(res => {
            let recipeId = res.data.id;
            axios.get(BASE_URL+'/recipes')
                .then(result => context.state.recipeList = result.data)
                .then(()=>router.push({name: 'recipe', params:{recipeId}}))
                .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
    },
    getStartList(context){
      context.state.isLoading = true;
      const getUserListApi = axios.get(BASE_URL+'/user');
      const getRecipeListApi = axios.get(BASE_URL+'/recipes')
      Promise.all([getUserListApi, getRecipeListApi])
          .then(res => {
            let [userList, recipeList] = res;
            context.state.userData = userList.data;
            context.state.recipeList = recipeList.data
          })
          .then(()=>context.state.isLoading = false)
          .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
