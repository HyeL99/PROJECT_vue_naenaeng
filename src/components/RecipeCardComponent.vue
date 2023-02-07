<template>
<article class="recipeCard">
  <button @click="toggleHeart(propsId)" v-if="$store.state.currentUser">
    <i class="fa-solid fa-heart" v-if="isLike"></i>
    <i class="fa-regular fa-heart" v-else></i>
  </button>
  <div class="cardMain" @click="$router.push({name:'recipe',params:{recipeId: propsId}})">
    <span class="img" :style="`background-image: url(${propsRecipe.data.thumbnail.path})`"></span>
    <div class="contents">
      <h3>{{propsRecipe.data.title}}</h3>
      <p class="writer">{{propsRecipe.writer}}</p>
      <p class="tag">
        <span class="tagList" v-for="(tagEl,index) in propsRecipe.data.tags" :key="index">#{{tagEl}}</span>
      </p>
      <span class="time"><img src="../assets/images/timer.svg" alt="소요시간">{{propsRecipe.data.time}}분 소요</span>
    </div>
  </div>
</article>
</template>

<script>
export default {
  name: "RecipeCardComponent",
  props:{
    propsRecipe: Object,
    propsId: String
  },
  data(){
    return {
      isLike: false,
    }
  },
  mounted() {
    //console.log(this.propsRecipe)
  },
  methods:{
    toggleHeart(id){
      this.isLike = !this.isLike
      console.log(id, '하트클릭')
    }
  }
}
</script>

<style lang="scss">
$screen-large: 1024px;
$screen-medium: 768px;
$screen-small: 480px;

.recipeCard {
  position: relative;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
  }
  >button{
    position: absolute;
    right: 1rem;
    top: 1rem;
    color: crimson;
    font-size: 1.5rem;
    z-index: 1;
  }
  .cardMain {
    width: calc((90vw - 6rem) / 4 - 5px);
    height: calc((90vw - 6rem) / 4 - 5px);
    background-color: #f4f4f4;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    @media (max-width: #{$screen-large}) {
      width: calc((90vw - 4rem) / 3 - 6px);
      height: calc((90vw - 4rem) / 3 - 6px);
    }
    @media (max-width: #{$screen-medium}) {
      width: calc((90vw - 2rem) / 2 - 9px);
      height: calc((90vw - 2rem) / 2 - 9px);
    }
    @media (max-width: #{$screen-small}) {
      width: 90vw;
      height: 90vw;
    }
    span.img {
      display: block;
      flex-grow: 1;
      background: {
        repeat: no-repeat;
        position: center;
        size: cover;
      };
    }
    .contents {
      min-height: 40%;
      display: flex;
      flex-direction: column;
      background: #fff;
      border: 2px solid #f4f4f4;
      box-sizing: border-box;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
      padding: 16px;
      position: relative;

      h3 {
        padding: 0.1rem 0.7rem;
        padding-right: 1rem;
        position: absolute;
        right: -2px;
        top: -30px;
        font-size: 20px;
        font-weight: 700;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 0.2rem 0 0 0.2rem;
      }

      .writer {
        font-size: 16px;
        font-weight: 900;
        line-height: 1.5;
      }

      .tag {
        color: rgba(0, 0, 0, 0.6);
        flex: 1;
        font-size: 14px;
        line-height: 1.2;

        span {
          font-size: 13px;
          margin-right: 0.5rem;
          white-space: nowrap;
        }
      }

      .time {
        opacity: 0.6;
        align-self: flex-end;
        font-size: 0.8rem;

        img {
          height: 1em;
        }
      }
    }
  }
}
</style>
