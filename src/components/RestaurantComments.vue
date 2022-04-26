<template>
  <div class="comments my-3 px-4 py-3">
    <span class="my-5 title">
      <strong>All Comments :</strong>
    </span>

    <div
      class="comments-list mt-3 px-3 pb-3"
      v-for="comment in restaurantComments"
      :key="comment.id"
    >
      <div class="name">
        <router-link
          class="user-name"
          :to="{ name: 'users', params: { id: comment.User.id } }"
        >
          {{ comment.User.name }} :
        </router-link>
      </div>

      <p class="comment my-3">{{ comment.text }}</p>

      <div class="footer">
        <div class="time pr-3">
          {{ comment.createdAt | fromNow }}
        </div>
        <button
          v-if="currentUser.isAdmin"
          type="button"
          class="btn btn-outline-danger"
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// 載入撰寫好的 mixin
import { fromNowFilter } from "./../utils/mixins";
import commentsAPI from "./../apis/comments";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "RestaurantComments",
  // 透過 mixins 屬性將撰寫好的 mixin 放入
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async handleDeleteButtonClick(commentId) {
      try {
        const { data } = await commentsAPI.delete({
          commentId,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        //TODO: 請求API伺服器刪除id為commentId的評論
        // 觸發父層事件 -$emit('事件名稱',傳遞的資料)
        this.$emit("after-delete-comment", commentId);

        Toast.fire({
          icon: "success",
          title: "已刪除評論",
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法刪除評論，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.comments {
  border-top: 1px solid #d5cec0;
}

.title, strong {
  font-family: serif;
}

.comments-list {
  border-bottom: 1px solid #d5cec0;
}

.user-name {
  text-decoration: none;
  color: #8c0303;
}

.btn {
  font-style: italic;
}

.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.time {
  color: #8c0303;
}

.comments:hover {
  border-top: 1px solid #595959;
}

.comments-list:hover .name,
.comments-list:hover .comment {
  color: black;
}

.comments-list:hover .time,
.comments-list:hover .user-name {
  color: #f28705;
  transition-duration: 1s;
}

.comments-list:hover {
  border-bottom: 1px solid #595959;
}

@media (max-width: 767px) {
  .title, strong {
    font-size: 22px;
  }

  .user-name {
    height: 30px;
    font-size: 18px;
  }

  .comment {
    font-size: 16px;
  }

  .btn {
    font-size: 14px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .title,
  strong {
    font-size: 25px;
  }

  .user-name {
    height: 30px;
    font-size: 20px;
  }

  .comment {
    font-size: 16px;
  }

  .btn {
    font-size: 14px;
  }
}

@media (min-width: 992px) {
  .title,
  strong {
    font-size: 30px;
  }

  .user-name {
    height: 40px;
    font-size: 25px;
  }

  .comment {
    font-size: 18px;
  }

  .btn {
    font-size: 16px;
  }
}
</style>