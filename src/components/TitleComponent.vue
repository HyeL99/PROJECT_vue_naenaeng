<template>
  <carousel :autoplay="true" :loop="true" :perPage="1" :paginationEnabled="false" class="titleCarousel">
    <Slide>
      <div class="imgWrap">
        <img src="@/assets/images/event_001.png" alt="이벤트페이지" class="carouselItem">
      </div>
    </Slide>
    <Slide>
      <div class="imgWrap">
        <img src="@/assets/images/event_002.png" alt="이벤트페이지" class="carouselItem">
      </div>
    </Slide>
    <Slide>
      <div class="imgWrap">
        <img src="@/assets/images/event_003.png" alt="이벤트페이지" class="carouselItem">
      </div>
    </Slide>
  </carousel>
</template>

<script>
import {Carousel, Slide} from "vue-carousel/src";
export default {
  name: "TitleComponent",
  components:{
    Carousel,
    Slide
  }
}
</script>

<style lang="scss">
.titleCarousel{
  background-color: #f6f6f6;
}
.imgWrap{
  width: 100%;
  text-align: center;
  .carouselItem{
    width: 100%;
    margin-bottom: -3px;
    max-width: 1200px;
  }
}


/* --- Vue Carousel Style Custom ---*/
.VueCarousel-pagination{
  position: absolute;
  bottom: 1.5rem;
  /*.VueCarousel-dot-container{margin-top: 0 !important;
    .VueCarousel-dot{
      margin: 0px 0.5rem !important;
      padding: 0px !important;
      width: 50px !important;
      height: 3px !important;
      background-color: #fff !important;
      opacity: 0.5;
      border-radius: 0;
      &.VueCarousel-dot--active{
        background-color: #fff !important;
        opacity: 1;
      }
    }
  }*/
}
</style>
