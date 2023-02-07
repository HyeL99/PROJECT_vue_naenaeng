<template>
  <div id="app">
    <header-component />
    <router-view :key="$router.fullPath" v-if="!$store.state.isLoading"/>
    <main v-else>로딩중</main>
    <footer-component />
  </div>
</template>

<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<style lang="scss">
/* --- font --- */
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

/* --- reset --- */
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  line-height: 1;
  word-break: keep-all;
}
ul,li{
  list-style: none;
}
a{
  color: inherit;
  text-decoration: none;
}
button{
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  background-color: transparent;
  border: 0;
  color: inherit;
}
input{
  font-family: inherit;
  color: inherit;
  outline: none;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

ol, ul{
  list-style: none;
}
html, body, #app{
  width: 100%;
  height: 100%;
}
/* --- reset --- */
:root{
  --color-point: #FDBA02;
  --color-text: #444;
}

html{
  font-family: 'Pretendard-Regular', sans-serif;
  background-color: #e4e4e4;
}
.inner{
  width: 90%;
  margin: 0 auto;
}
#app{
  overflow: scroll;
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  footer{
    flex-grow: 1;
  }
  .yellow{
    background-color: var(--color-point);
    color: #fff;
  }
}

/*@import "@/assets/style/_reset.scss";*/
/*@import "@/assets/style/_common.scss";*/
</style>
