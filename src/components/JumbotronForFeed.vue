<template>
  <div class="jumbotron">
    <div class="jumbotron-title">
      <span class="title-area">
        Browse the latest restaurant news and reviews
      </span>
      <span class="introduce"> Click the restaurant name to review. </span>
    </div>
  </div>
</template>

<style scoped>
.jumbotron {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)),
    url(../assets/jumbotron/photo-3.jpg);
}

@keyframes animate {
  0% {
    opacity: 0.6;
  } /* 初始狀態0% */
}
</style>