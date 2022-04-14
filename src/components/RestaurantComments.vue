<template>
  <div class="comments my-3 px-5 py-3">
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
          class="name"
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
  border-top: 1px solid #595959;
}

.title,
strong {
  font-size: 30px;
  font-family: serif;
}

.comments-list {
  border-bottom: 1px solid #595959;
}

.name {
  height: 40px;
  text-decoration: none;
  color: #595959;
  font-size: 25px;
}

.comment {
  font-size: 18px;
}

.comments-list:hover .name,
.comments-list:hover .comment {
  color: black;
}

.comments-list:hover .name {
  border-bottom: 2px solid #f28705;
  transition-duration: 2s;
}

.comments-list:hover .time {
  color: #f28705;
  transition-duration: 2s;
}

.btn {
  font-size: 16px;
  font-style: italic;
}

.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

h2.my-4 {
  margin-bottom: 1rem !important;
  font-size: 18px;
}

h3 {
  margin-bottom: 3px;
  line-height: 1.3;
}

.blockquote-footer {
  font-size: 12.5px;
}
</style>