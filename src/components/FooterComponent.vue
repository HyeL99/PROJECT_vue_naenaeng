<template>
<footer>
  <div class="inner">
    <div class="fNav">
      <a href="#">고객센터</a>
      <a href="#">문의</a>
      <a href="#">오류보고</a>
      <a href="#">Team</a>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  name: "FooterComponent"
}
</script>

<style lang="scss">
footer{
  background-color: #8b8b8b;
  color: #fff;
  .inner{
    padding-top: 2rem;
    padding-bottom: 4rem;
    .fNav{
      a{
        display: inline-block;
        margin-right: 2rem;
      }
    }
  }
}
</style>