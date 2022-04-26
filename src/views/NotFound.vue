<template>
  <div class="error-page">
    <span style="font-size: 150px">404</span>
    <span style="font-size: 80px">Not Found</span>
    <div class="btns">
      <button type="button" class="btn btn-info mr-5 my-5">
        <router-link class="link" to="/restaurants"> HOME </router-link>
      </button>
      <button
        type="button"
        class="btn btn-warning previous mr-5 my-5"
        @click="$router.back()"
      >
        PREVIOUS PAGE
      </button>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 992px) {
  span {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }

  .btns {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn {
    width: 20%;
  }

  .link,
  .previous {
    font-size: 20px;
  }

  .link {
    text-decoration: none;
    color: white;
  }
}
</style>