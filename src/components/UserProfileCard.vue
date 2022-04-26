<template>
  <div class="card mx-4 mb-4 mt-3 pb-3">
    <div class="row no-gutters">
      <div class="col-md-12 col-sm-12 header">
        <img
          :src="user.image | emptyImage"
          class="avatar col-6 col-sm-6"
        />
        <div class="card-body px-3 col-6 col-sm-6">
          <h5 class="user-name">
            {{ user.name }}
          </h5>
          <p class="user-mail">
            {{ user.email }}
          </p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>Comments :</strong>
              {{ user.Comments.length }}
            </li>
            <li>
              <strong>Collection :</strong>
              {{ user.FavoritedRestaurants.length }}
            </li>
            <li>
              <strong>Following :</strong>
              {{ user.Followings.length }}
            </li>
            <li>
              <strong>Followers :</strong>
              {{ user.Followers.length }}
            </li>
          </ul>
          <template v-if="isCurrentUser">
            <div class="user-edit">
              <router-link
                :to="{ name: 'users-edit', params: { id: user.id } }"
                class="btn btn-outline-info py-2 px-4"
              >
                Edit
              </router-link>
            </div>
          </template>
          <template v-else>
            <button
              v-if="isFollowed"
              @click.stop.prevent="deleteFollowing(user.id)"
              type="button"
              class="btn btn-danger"
            >
              取消追蹤
            </button>
            <button
              v-else
              @click.stop.prevent="addFollowing(user.id)"
              type="submit"
              class="btn btn-primary"
            >
              追蹤
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  mixins: [emptyImageFilter],
  props: {
    user: {
      type: Object,
      required: true,
    },
    isCurrentUser: {
      type: Boolean,
      required: true,
    },
    initialIsFollowed: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isFollowed: this.initialIsFollowed,
    };
  },
  watch: {
    initialIsFollowed(isFollowed) {
      this.isFollowed = isFollowed;
    },
  },
  methods: {
    async addFollowing(userId) {
      try {
        const { data } = await usersAPI.addFollowing({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.isFollowed = true;
      } catch (error) {
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤，請稍後再試",
        });
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data } = await usersAPI.deleteFollowing({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.isFollowed = false;
      } catch (error) {
        console.error(error.message);
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
.card {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid transparent;
  padding: 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.user-avatar {
  object-fit: cover;
  border-radius: 3px;
  opacity: 0.6;
}

.user-mail {
  font-family: serif;
  color: #8c0303;
}

.user-edit {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

@media (max-width: 575px) {
  .user-name {
    font-size: 32px;
  }

  .user-mail {
    font-size: 20px;
  }

  strong, li, .btn {
    font-size: 16px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .user-avatar {
    width: 100%;
    height: 80%;
  }

  .user-name {
    font-size: 35px;
  }

  .user-mail {
    font-size: 22px;
  }

  strong, li, .btn {
    font-size: 16px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .user-avatar {
    width: 100%;
    height: 100%;
  }

  .user-name {
    font-size: 40px;
  }

  .user-mail {
    font-size: 25px;
  }

  strong, li, .btn {
    font-size: 18px;
  }
}

@media (min-width: 992px) {
  .user-avatar {
    width: 300px;
    height: 300px;
  }

  .user-name {
    font-size: 50px;
  }

  .user-mail {
    font-size: 30px;
  }

  strong, li, .btn {
    font-size: 20px;
  }
}
</style>