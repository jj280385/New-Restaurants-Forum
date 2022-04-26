// ./src/views/UsersTop.vue
<template>
  <div class="main-container">
    <JumbotronForGourmets />
    <!-- BottomNavTabs for RWD <576px -->
    <BottomNavTabs class="bottom-nav" />
    <div class="card-container">
      <!-- NavTabs for RWD >576px -->
      <NavTabs />
      <Spinner v-if="isLoading" />
      <template v-else>
        <div class="page-title mt-5 pt-4 ml-4">
          <span> POPULAR FOODIES </span>
          <p class="hint">● Click the Follow button to follow other user.</p>
        </div>
        <div class="users row text-center cards">
          <div
            v-for="user in users"
            :key="user.id"
            class="col-sm-4 col-md-4 col-lg-3 user-card my-3"
          >
            <div class="content-border">
              <router-link
                :to="{ name: 'users', params: { id: user.id } }"
                class="link"
              >
                <!-- <div class="card-body"> -->
                <img :src="user.image | emptyImage" class="user-avatar" />
              </router-link>
              <div class="user-info">
                <p class="title my-3">
                <router-link
                  class="title"
                  :to="{ name: 'users', params: { id: user.id } }"
                >
                  {{ user.name }}
                </router-link>
              </p>
              <span class="badge badge-secondary"
                >{{ user.followerCount }} persons Following
              </span>
              <p class="mt-3 btns">
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
import BottomNavTabs from "./../components/BottomNavTabs.vue";

export default {
  components: {
    NavTabs,
    Spinner,
    JumbotronForGourmets,
    BottomNavTabs,
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
        Toast.fire({
          icon: "error",
          title: "無法取得美食達人，請稍後再試",
        });
      }
    },
    async addFollowing(userId) {
      try {
        const { data } = await usersAPI.addFollowing({ userId });

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

        Toast.fire({
          icon: "success",
          title: "已成功Follow",
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法加入Follow，請稍後再試",
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

        Toast.fire({
          icon: "success",
          title: "已取消Follow",
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消Follow，請稍後再試",
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
  margin-top: 40px;
}

.title ::after {
  height: 2.2px;
}

.content-border {
  border: 1px solid #d5cec0;
  border-radius: 3px;
}

.content-border:hover {
  border: 1px solid #8c0303;
  border-radius: 10px;
  box-shadow: 10px 0 20px rgba(0, 0, 0, 0.2);
  transition-duration: 1s;
}

.content-border:hover .user-avatar {
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

.link {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  display: inline-block;
  font-weight: 600;
  text-decoration: none;
  color: #595959;
}

.badge.badge-secondary {
  color: #8c0303;
  background-color: transparent;
  font-weight: 400;
  padding: 0;
  letter-spacing: 0.2px;
}

.user-avatar {
  object-fit: cover;
  opacity: 0.6;
}

.user-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
}

span {
  font-size: 40px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 500;
}

.hint {
  font-style: italic;
  width: 60%;
  border-bottom: 1px solid #595959;
}

@media (max-width: 576px) {
  .users {
    margin-top: 0;
    margin-bottom: 15%;
  }

  .user-card,
  .link {
    flex-direction: row;
  }

  .content-border {
    padding: 10px;
    display: flex;
  }

  .user-info {
    margin-left: 10px;
    width: 50%;
    flex-direction: column;
    align-items: flex-start;
  }

  .title {
    font-size: 42px;
  }

  .user-avatar {
    width: 190px;
    height: 190px;
  }

  .badge.badge-secondary {
    font-size: 25px;
  }

  .btn {
    font-size: 18px;
  }
}

@media (min-width: 576px) {
  .bottom-nav,
  .page-title {
    display: none;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .title {
    font-size: 36px;
  }

  .badge.badge-secondary {
    font-size: 20px;
  }

  .user-avatar {
    width: 90%;
    height: 170px;
  }

  .content-border {
    padding: 15px 10px 0 10px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .title {
    font-size: 38px;
  }

  .badge.badge-secondary {
    font-size: 20px;
  }

  .content-border {
    padding: 15px 25px 0 25px;
  }

  .user-avatar {
    width: 100%;
    height: 210px;
  }

  .btn {
    font-size: 15px;
  }
}

@media (min-width: 992px) {
  .title {
    font-size: 40px;
  }

  .badge.badge-secondary {
    font-size: 20px;
  }

  .content-border {
    padding: 20px 25px 0 25px;
    margin: 10px 0;
  }

  .user-avatar {
    width: 100%;
    height: 210px;
  }

  .btn {
    font-size: 18px;
  }
}

@media (min-width: 1439px) {
  .title {
    font-size: 42px;
  }

  .title ::after {
    height: 2.5px;
  }

  .badge.badge-secondary {
    font-size: 22px;
  }

  .content-border {
    width: 90%;
    height: 100%;
    padding: 20px 15px 0 15px;
    margin: 10px;
  }

  .user-avatar {
    width: 100%;
    height: 280px;
  }

  .btn {
    font-size: 20px;
  }
}
</style>