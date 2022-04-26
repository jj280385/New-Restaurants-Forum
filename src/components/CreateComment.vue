// ./src/components/CreateComment.vue
<template>
  <!-- 當使用者提交表單時，不要做瀏覽器的預設動作，取而代之的，要去觸發一個叫 handleSubmit 的函式。 -->
  <form @submit.stop.prevent="handleSubmit" class="create-comment mx-5">
    <div class="form-group mb-4">
      <label for="text" class="title">Leave a comment :</label>
      <textarea v-model="text" class="form-control" rows="6" name="text" />
      <div class="btn-area">
        <button
          type="submit"
          class="btn btn-outline-info submit mt-3"
          :disabled="isProcessing"
        >
          Submit
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import commentsAPI from "./../apis/comments";
import { Toast } from "./../utils/helpers";

export default {
  name: "CreateComment",
  props: {
    restaurantId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      text: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.text) {
          Toast.fire({
            icon: "warning",
            title: "評論內容不可空白",
          });
          return;
        }

        this.isProcessing = true;
        const { data } = await commentsAPI.create({
          restaurantId: this.restaurantId,
          text: this.text,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: "已成功新增評論！",
        });

        // TODO: 向API發送POST請求
        //伺服器新增Comment成功後...
        this.$emit("after-create-comment", {
          commentId: data.commentId, //尚未串接API暫時使用隨機的id
          restaurantId: this.restaurantId,
          text: this.text,
        });

        this.isProcessing = false;
        this.text = ""; //將表單內資料清空
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法新增評論，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.create-comment:hover .title {
  color: black;
}

.form-control:hover,
.form-control:focus {
  border: 1px solid #8c0303;
}

.form-group {
  margin: 15px 0;
}

.title {
  font-family: serif;
  font-weight: 600;
}

.btn-area {
  display: flex;
  justify-content: flex-end;
}

@media (min-width: 768px) and (max-width: 991px) {
  .title {
    font-size: 25px;
  }

  .submit {
    font-size: 16px;
    width: 15%;
  }
}

@media (min-width: 992px) {
  .title {
    font-size: 30px;
  }

  .submit {
    font-size: 18px;
    width: 10%;
  }
}
</style>