<template>
  <div class="jumbotron">
    <div class="jumbotron-title">
      <span class="title-area">
        Let's explore delicious restaurants around the world
      </span>
      <span class="introduce"> Bon Appétit ! </span>
    </div>
  </div>
</template>

<style scoped>
.jumbotron {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)),
    url(../assets/jumbotron/photo-1.jpg);
}

@keyframes animate {
  0% {
    opacity: 0.6;
  } /* 初始狀態0% */
}

@media (min-width: 576px) and (max-width: 767px) {
  .introduce {
    font-size: 20px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .introduce {
    font-size: 28px;
  }
}

@media (min-width: 992px) {
  .introduce {
    font-size: 45px;
  }
}
</style>