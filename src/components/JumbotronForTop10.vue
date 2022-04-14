<template>
  <div class="jumbotron">
    <div class="jumbotron-title">
      <h1 class="display-3 title-area">Top 10 Most Popular and Favorite Restaurants</h1>
    </div>
    <div class="jumbotron-introduce">
      <span class="introduce">
        Click the save button to save restaurants.
      </span>
    </div>
  </div>
</template>

<style scoped>
.jumbotron {
  animation-name: animate;
  position: relative;
  background-image: linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.7)),url(../assets/jumbotron/photo-4.jpg);
}

@keyframes animate {
  0% {opacity: 0.6;} /* 初始狀態0% */
}
</style>