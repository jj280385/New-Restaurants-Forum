// ./src/components/CreateComment.vue
<template>
  <!-- 當使用者提交表單時，不要做瀏覽器的預設動作，取而代之的，要去觸發一個叫 handleSubmit 的函式。 -->
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea v-model="text" class="form-control" rows="3" name="text" />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button 
      type="button" 
      class="btn btn-link" 
      @click="$router.back()"
      >
        回上一頁
      </button>
      <button
        type="submit"
        class="btn btn-primary mr-0"
        :disabled="isProcessing"
      >
        Submit
      </button>
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
          return
        }

        this.isProcessing = true;
        const { data } = await commentsAPI.create({
          restaurantId: this.restaurantId,
          text: this.text,
        });
        
        console.log('data',data);

        if (data.status === "error") {
          throw new Error(data.message);
        }

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