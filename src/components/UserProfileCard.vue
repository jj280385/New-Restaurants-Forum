<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="userProfile.image" width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ userProfile.name }}</h5>
          <p class="card-text">
            {{ userProfile.email }}
          </p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{ userProfile.commentsLength }}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{ userProfile.favoritedRestaurantsLength }}</strong>
              收藏的餐廳
            </li>
            <li>
              <strong>{{ userProfile.followingsLength }}</strong> followings
              (追蹤者)
            </li>
            <li>
              <strong>{{ userProfile.followersLength }}</strong> followers
              (追隨者)
            </li>
          </ul>
          <p></p>
          <form
            action="/following/3?_method=DELETE"
            method="POST"
            style="display: contents"
          >
            <button type="submit" class="btn btn-danger">取消追蹤</button
            ><router-link
              :to="{
                name: 'admin-user-edit',
                params: {
                  id: userProfile.id,
                },
              }"
              class="edit"
              >修改個人資料</router-link
            >
          </form>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.edit {
  text-decoration: none;
  color: #ffffff;
  padding: 9px;
  margin-left: 5px;
  border: 1px solid blue;
  border-radius: 5px;
  background-color: blue;
}
.edit:focus {
  background-color: dodgerblue;
  border-color: dodgerblue;
}
</style>
<script>
export default {
  props: {
    userProfile: {
      type: Object,
      required: true,
    },
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  methods: {
    fetchUser(userId) {
      console.log(userId);
    },
  },
};
</script>