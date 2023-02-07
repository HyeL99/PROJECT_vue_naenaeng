<template>
<main class="uploadRecipe">
  <div class="inner">
    <div class="title flex-contents-1rem">
      <span>레시피 제목</span>
      <input type="text" v-model="title" placeholder="30자 이내로 입력해주세요!">
    </div>
    <div class="category">
      <span class="mb-1rem">카테고리</span>
      <div class="selectArea">
        <template v-for="(item, index) in categorys">
          <label :key="index">
            <span v-if="categoryBooleanList[index]"><i class="fa-solid fa-circle-check"></i></span>
            <span v-else><i class="fa-regular fa-circle-check"></i></span>
            <input type="checkbox" v-model="categoryBooleanList[index]">
            <span class="item">{{item}}</span>
          </label>
        </template>
      </div>
    </div>
    <div class="time flex-contents-1rem">
      <span class="mb-1rem">소요시간</span>
      <input type="number" v-model="time">
      <span>분</span>
    </div>
    <div class="material">
      <span class="mb-1rem">사용재료</span>
      <ul>
        <template v-for="(item,index) in ingredients">
          <li :key="index" class="flex-contents-1rem mb-1rem">
            <input type="text" placeholder="재료명" v-model="item.name">
            <input type="number" placeholder="양" v-model="item.quantity">
            <select v-model="item.unit" class="roundBox" @change="handleUnit(index)">
              <option value="default">- 단위 선택 -</option>
              <option v-for="(unit,index) in unitList" :key="index" :value="unit">{{unit}}</option>
            </select>
            <button @click="deleteIngredientItem(index)" v-if="ingredients.length > 1">삭제</button>
          </li>
        </template>
      </ul>
      <button @click="addIngredientItem" class="yellow yellowBtn">추가하기</button>
    </div>
    <div class="tag">
      <span class="mb-1rem">태그</span>
      <input type="text" v-model="tagInput" placeholder="띄어쓰기로 구분해주세요! / 최대 5개 추가 가능" class="grayBg">
    </div>
    <div class="thumbnail">
      <span class="mb-1rem">대표사진</span>
      <div class="inputField roundBox grayBg">
        <template>
          <input type="text" disabled :value="thumbnail.name" :key="thumbnail.name">
        </template>
        <label for="thumbnail" class="yellow yellowBtn">파일찾기</label>
        <input type="file" id="thumbnail" accept=".gif, .jpg, .jpeg, .png" @change="handleThunbnailChange">
      </div>
      <template v-if="thumbnail.path">
        <div class="preview roundBox">
          <img :src="thumbnail.path" :alt="thumbnail.name">
        </div>
      </template>
    </div>
    <div class="mainContents">
      <span class="mb-1rem">본문</span>
      <div class="contentsWrap grayBg">
        <div class="top">
          <span>컨텐츠 추가</span>
          <div class="inputField roundBox">
            <template>
              <input type="text" disabled :value="contentsImage.name" :key="contentsImage.name">
            </template>
            <label for="conetentsImage" class="yellow yellowBtn">파일찾기</label>
            <input type="file" id="conetentsImage" accept=".gif, .jpg, .jpeg, .png" @change="handleContentsImageChange" ref="contentsImage">
          </div>
        </div>
        <ul class="bottom" v-if="contents.length > 0">
          <template v-for="(item,index) in contents">
            <li :key="index">
              <div class="imgPlace">
                <img :src="item.path" :alt="`레시피 ${index+1}번 이미지`">
                <div class="handleContents">
                  <label :for="`editImage_${index}`" title="이미지 수정"><i class="fa-regular fa-image"></i></label>
                  <input type="file" :id="`editImage_${index}`" accept=".gif, .jpg, .jpeg, .png" @change="editContentsImage(index, $event)" ref="editImage">
                  <button @click="deleteContentsItem(index)" title="삭제"><i class="fa-solid fa-trash"></i></button>
                  <button @click="upContentsItem(index)" v-if="index > 0" title="위로 이동"><i class="fa-solid fa-up-long"></i></button>
                  <button @click="downContentsItem(index)" v-if="index < contents.length - 1" title="아래로 이동"><i class="fa-solid fa-down-long"></i></button>
                </div>
              </div>
              <textarea v-model="item.text" placeholder="요리 과정을 적어주세요."></textarea>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <button @click="uploadContents" class="yellow">업로드하기</button>
  </div>
</main>
</template>

<script>
import {mapActions, mapState} from "vuex";
import store from "../store";
import router from "../router"
export default {
  name: "UploadRecipeView",
  data(){
    return{
      title: '',
      categorys:[],
      categoryBooleanList:[],
      time: '',
      unitList: ['mg','g','kg','ts','TS','ml','L','컵','개','포기','공기','꼬집','봉지','약간','적당히','줄'],
      ingredients:[
        {
          name: '',
          quantity: '',
          unit: 'default'
        }
      ],
      tagInput:'',
      tags:[],
      thumbnail:{
        name:'',
        path: '',
      },
      contentsImage:{
        name:'',
        path: '',
      },
      contents:[],
      itemCategory:[],
    }
  },
  computed:{
    ...mapState(['categoryList'])
  },
  methods:{
    ...mapActions(['uploadRecipe']),
    handleUnit(index){
      console.log(this.ingredients[index])
      if(this.ingredients[index].unit === '약간' || this.ingredients[index].unit === '적당히'){
        this.ingredients[index].quantity = ' ';
      }
    },
    fileInputClear(){
      try{
        const input1 = this.$refs.contentsImage;
        const input2 = this.$refs.editImage;
        input1.type = 'text';
        input1.type = 'file';
        input2.type = 'text';
        input2.type = 'file';
      }catch{}

    },
    deleteIngredientItem(index){
      let res =  confirm('정말 삭제하시겠습니까?');
      res && this.ingredients.splice(index,1);
    },
    deleteContentsItem(index){
      let res =  confirm('정말 삭제하시겠습니까?');
      if(res){
        this.contents.splice(index,1);
        this.contentsImage = {
          name:'',
          path: '',
        };
      }
    },
    upContentsItem(index){
      let handleItem = this.contents[index];
      this.contents.splice(index,1)
      this.contents.splice(index - 1, 0, handleItem);
    },
    downContentsItem(index){
      let handleItem = this.contents[index];
      this.contents.splice(index,1)
      this.contents.splice(index+1, 0, handleItem);
    },
    addIngredientItem(){
      this.ingredients.push({
        name: '',
        quantity: '',
        unit: 'default'
      });
    },
    handleContentsImageChange(e){
      let file = e.target.files[0];
      this.contentsImage.name = file.name;
      if(file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') ||
          file.name.endsWith('.png') || file.name.endsWith('.gif')) {
        let path = URL.createObjectURL(file);
        this.contentsImage.path = path
        this.contents.push({
          path:path,
          text: '',
        });
      }
      else {
        alert('파일 확장자는 ".gif, .jpg, .jpeg, .png"만 가능합니다.')
        this.contentsImage.name = '';
        this.contentsImage.path = '';
      }
      this.fileInputClear();
    },
    editContentsImage(index,event){
      let file = event.target.files[0];
      this.contentsImage.name = file.name;
      if(file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') ||
          file.name.endsWith('.png') || file.name.endsWith('.gif')) {
        let path = URL.createObjectURL(file);
        let item = this.contents[index]
        item.path = path;
        this.contents.splice(index, 1, item)
        this.fileInputClear();
      }
      else {
        alert('파일 확장자는 ".gif, .jpg, .jpeg, .png"만 가능합니다.')
      }
      this.fileInputClear();
    },
    handleThunbnailChange(e){
      let file = e.target.files[0];
      this.thumbnail.name = file.name;
      if(file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') ||
          file.name.endsWith('.png') || file.name.endsWith('.gif'))
        this.thumbnail.path = URL.createObjectURL(file);
      else {
        alert('파일 확장자는 ".gif, .jpg, .jpeg, .png"만 가능합니다.')
      }
      console.log(this.thumbnail)
    },
    uploadContents(){
      let check = this.checkBeforeUpload()
      console.log(check)
      if(check !== true){
        alert('입력되지 않은 부분이 있습니다.')
      } else {
        let contentsObj = {
          title: this.title,
          category: this.itemCategory,
          time: this.time,
          ingredients: this.ingredients,
          tags: this.tags,
          thumbnail: this.thumbnail,
          contents: this.contents,
        }
        console.log(contentsObj)
        this.uploadRecipe(contentsObj)
      }
    },
    checkBeforeUpload(){
      let res = true;
      if(this.title === '') res = 0;
      else if(this.itemCategory.length === 0) res = 1;
      else if(this.time === '') res = 2;
      else if(this.tags.length === 0) res = 3;
      else if(this.thumbnail.name === '' || this.thumbnail.path === '') res = 4;
      else if(this.contents.length === 0) res = 5;
      else {
        for(let item of this.ingredients){
          if(item.name === '' || item.quantity === '' || item.unit === "default") res = 6;
        }
        for(let item of this.contents){
          if(item.path === '' || item.text === '') res = 7;
        }
      }
      return res;
    }
  },
  mounted(){
    this.categoryList.slice(1).forEach(item => {
      this.categorys.push(item.name);
      this.categoryBooleanList.push(false)
    });
  },
  watch:{
    tagInput(value){
      let tagList = value.replace(/ +/g, " ").split(' ');
      if(tagList.length > 5){
        alert('태그는 최대 5개까지 입력 가능합니다.');
        this.tagInput = this.tagInput.slice(0 , -1)
      } else {
        this.tags = tagList;
      }
    },
    categoryBooleanList(array){
      let list = [];
      array.forEach((item,index) => {
        if(item) list.push(this.categorys[index])
      })
      this.itemCategory = list;
    },
    title(value){
      if(value.length > 30){
        alert('제목은 최대 30자까지 입력 가능합니다.');
        this.title = this.title.slice(0 , -1)
      }
    }
  },
  beforeRouteEnter(to,from,next){
    if(store.state.currentUser === null){
      alert('로그인이 필요합니다.')
      router.push({name:'login'})
    } else next();
  }
}
</script>

<style lang="scss">
.uploadRecipe{
  background-color: #fff;
  .roundBox{
    padding: 0.5rem 0.5rem;
    border-radius: 0.5rem;
  }
  .grayBg{
    background-color: #eee;
  }
  .inputField{
    display: flex;
    > input {
      padding: 0;
    }
  }
  .yellowBtn{
    font-size: 0.9rem;
    padding: 0.2rem 0.5rem;
    border-radius: 0.2rem;
  }
  .mb-1rem{
    margin-bottom: 1rem;
  }
  input{
    padding: 0.5rem 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #eee;
  }
  .inner{
    padding: 30px 0 70px;
    display: flex;
    flex-wrap: wrap;
    max-width: 600px;
    > div{
      width: 100%;
      margin-bottom: 2rem;
      > span{
        display: block;
        white-space: nowrap;
        font-weight: 700;
      }
      input:not([type='checkbox']){
        width: 100%;
      }
    }
    .flex-contents-1rem{
      display: flex;
      column-gap: 1rem;
      align-items: center;
    }
    .grayBg{
      background-color: #eee;
      border-radius: 0.5rem;
    }
    .title{
      span{}
      input{}
    }
    .category{
      //width: calc(75% - 1rem);
      span{
      }
      .selectArea{
        display: flex;
        flex-wrap: wrap;
        column-gap: 1rem;
        row-gap: 0.3rem;
        label{
          span:not(.item){
            color: var(--color-point);
            margin-right: 0.3rem;
          }
          input{
            display: none;
          }
          span.item{}
        }
      }

    }
    .time{
      width: 25%;
      align-self: start;
      flex-wrap: wrap;
      span{
        &:first-of-type{
          width: 100%;
        }
      }
      input{
        flex: 1;
      }
    }
    .material{
      width: calc(75% - 3rem);
      margin-left: 3rem;
      span{}
      ul{
        li{
          input{}
          select{
            outline: none;
            border: 1px solid #eee;
            option{}
          }
        }
      }
      button{
        padding: 0.2rem 0.8rem;
        display: block;
        margin: 0 auto;
      }
    }
    .tag{
      span{}
      input{}
    }
    .thumbnail{
      span{}
      .inputField{
        input{}
        label{}
        input[type='file']{
          display: none;
        }
      }
      .preview{
        border: 1px solid #ddd;
        margin-top: 1rem;
        text-align: center;
        img{
          max-width: 100%;
          margin-bottom: -3px;
        }
      }
    }
    .mainContents{
      > span{}
      .contentsWrap{
        padding: 1rem;
        .top{
          display: flex;
          column-gap: 1rem;
          align-items: center;
          span{
            font-size: 0.95rem;
            color: #666;
            font-weight: 700;
          }
          .inputField{
            display: flex;
            column-gap: 1rem;
            padding: 0.3rem;
            padding-left: 1rem;
            flex-grow: 1;
            background-color: #fff;
            border-radius: 0.3rem;
            border: 1px solid #ddd;
            input:disabled{
              background-color: transparent;
              border: none;
            }
            label{
              border-radius: 0.3rem;
            }
            input[type='file']{
              display: none;
            }

          }
        }
        .bottom{
          background: #fff;
          border: 1px solid #ddd;
          padding: 0.5rem;
          border-radius: 0.3rem;
          margin-top: 0.5rem;
          li{
            display: flex;
            column-gap: 1rem;
            margin-bottom: 0.5rem;
            &:not(:first-of-type){
              border-top: 1px solid #ddd;
              padding-top: 1rem;
            }
            .imgPlace{
              img{
                width: 200px;
                border-radius: 1rem;
                border: 1px solid #ddd;
              }
              .handleContents{
                display: flex;
                column-gap: 0.5rem;
                label{}
                input{
                  display: none;
                }
                button{

                }
              }
            }
          }
          textarea{
            flex-grow: 1;
            resize: none;
            outline: none;
            padding: 0.5rem;
            border: none;
            height: 100%;
            min-height: 200px;
          }
        }
      }
    }
    >button{
      font-size: 1.1rem;
      padding: 0.5rem 2rem;
      border-radius: 1rem;
      display: block;
      margin-left: auto;
    }
  }
}
</style>
