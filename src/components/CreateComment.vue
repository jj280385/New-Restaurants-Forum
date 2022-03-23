// ./src/components/CreateComment.vue
<template>
  <!-- 當使用者提交表單時，不要做瀏覽器的預設動作，取而代之的，要去觸發一個叫 handleSubmit 的函式。 -->
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea 
      v-model="text" 
      class="form-control"
      rows="3" 
      name="text" 
      />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">
        回上一頁
      </button>
      <button type="submit" class="btn btn-primary mr-0">Submit</button>
    </div>
  </form>
</template>

<script>
import { v4 as uuidv4 } from "uuid"

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      text: ""
    }
  },
  methods: {
    handleSubmit() {
      // TODO: 向API發送POST請求
      //伺服器新增Comment成功後...
      this.$emit("after-create-comment",{
        commentId: uuidv4(), //尚未串接API暫時使用隨機的id
        restaurantId: this.restaurantId,
        text: this.text 
      })
      this.text = "" //將表單內資料清空
    }
  }
}
</script>