<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea v-model="text" class="form-control" rows="3" name="text" />
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
import {v4 as uuidv4} from 'uuid'

export default {
  name: "CreateComment",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    handleSubmit() {
      // TODO request data from API
      // serve成功新增comment後...
      this.$emit("after-create-comment", {
        commentId: uuidv4(),
        //因為尚未連結到api，因此這邊先暫時以uuid來編一個id
        restaurantId: this.restaurantId,
        text: this.text,
      });

      this.text = "";
    },
  },
  props: {
    restaurantId: {
      type: Number,
      required: true,
    },
  },
};
</script>a