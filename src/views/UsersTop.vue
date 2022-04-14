// ./src/views/UsersTop.vue
<template>
  <div class="main-container">
    <JumbotronForGourmets />
    <div class="card-container">
      <NavTabs />
      <Spinner v-if="isLoading" />

      <template v-else>
        <div class="users row text-center">
          <div
            v-for="user in users"
            :key="user.id"
            class="col-md-4 col-lg-3 user-card my-3"
          >
            <div class="content-border">
              <router-link
                :to="{ name: 'users', params: { id: user.id } }"
                class="link"
              >
                <!-- <div class="card-body"> -->
                  <img
                    :src="user.image | emptyImage"
                    width="140px"
                    height="140px"
                    class="card-img-top"
                  />
                  <p class="title my-3">
                    <router-link 
                    class="title"
                    :to="{ name: 'users', params: { id: user.id } }"
                    >
                      {{ user.name }}
                    </router-link>
                  </p>
                <!-- </div> -->
              </router-link>
              <div class="card-footer">
                <span class="badge badge-secondary"
                  >{{ user.followerCount }} persons Following</span
                >
                <p class="mt-3">
                  <button
                    v-if="user.isFollowed"
                    type="button"
                    class="btn btn-danger"
                    @click.stop.prevent="deleteFollowing(user.id)"
                  >
                    Unfollow
                  </button>
                  <button
                    v-else
                    type="button"
                    class="btn btn-info"
                    @click.stop.prevent="addFollowing(user.id)"
                  >
                    Follow
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs.vue";
import { emptyImageFilter } from "./../utils/mixins";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";
import JumbotronForGourmets from "./../components/JumbotronForGourmets";

export default {
  components: {
    NavTabs,
    Spinner,
    JumbotronForGourmets,
  },
  mixins: [emptyImageFilter],
  data() {
    return {
      users: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        this.isLoading = true;

        const { data } = await usersAPI.getTopUsers();
        console.log("data", data);
        this.users = data.users.map((user) => ({
          id: user.id,
          name: user.name,
          image: user.image,
          followerCount: user.FollowerCount,
          isFollowed: user.isFollowed,
        }));
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;

        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得美食達人，請稍後再試",
        });
      }
    },
    async addFollowing(userId) {
      try {
        const { data } = await usersAPI.addFollowing({ userId });

        console.log("data", data);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.users = this.users.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              followerCount: user.followerCount + 1,
              isFollowed: true,
            };
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤，請稍後再試",
        });
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data } = await usersAPI.deleteFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.users = this.users.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              followerCount: user.followerCount - 1,
              isFollowed: false,
            };
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.users {
  animation: zoomIn;
  animation-duration: 3s;
}

.title ::after {
  height: 2px;
}

.content-border:hover {
  border: 1px solid #8c0303;
  border-radius: 10px;
  box-shadow: 10px 0 20px rgba(0, 0, 0, 0.2);
}

.content-border:hover .card-img-top {
  opacity: 1;
  border-radius: 10px;
}

.content-border:hover .badge {
  color: #f28705;
}

.content-border:hover .title {
  color: black;
}

.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-border {
  border: 1px solid #d5cec0;
  border-radius: 3px;
  padding: 20px 30px 0 30px;
  margin: 10px 0;
}

.title {
  display: inline-block;
  font-size: 30px;
  font-weight: 600;
  text-decoration: none;
  color: #595959;
}

.badge.badge-secondary {
  color: #8c0303;
  background-color: transparent;
  font-size: 18px;
  font-weight: 400;
  padding: 0;
  letter-spacing: 0.2px;
}

.btn {
  font-size: 18px;
}

</style>