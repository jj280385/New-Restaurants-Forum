<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          v-if="image"
          :src="image"
          class="d-block img-thumbnail mb-3"
          width="200"
          height="200"
        />
        <!-- <input type="file">在瀏覽器上呈現出一個互動介面，讓使用者可以上傳檔案 -->
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "UserEdit",
  data() {
    return {
      id: 0,
      image: "",
      name: "",
      email: "",
      isProcessing: false,
    };
  },
	computed: {
    ...mapState(['currentUser'])
  },
	watch: {
    currentUser (user) {
      if (user.id === -1) return
      const { id } = this.$route.params
      this.setUser(id)
    }
  },
  created() {
		if (this.currentUser.id === -1) return
    const { id } = this.$route.params;
    this.setUser(id);
  },
	beforeRouteUpdate (to, from, next) {
    if (this.currentUser.id === -1) return
    const { id } = to.params
    this.setUser(id)
    next()
  },
  methods: {
    setUser(userId) {
			const { id, image, name, email } = this.currentUser

      if (id.toString() !== userId.toString()) {
        this.$router.push({ name: 'not-found' })
        return
      }
      this.id = id
      this.name = name
      this.email = email
      this.image = image
    },
    handleFileChange(e) {
      const files = e.target.files;
      console.log("files", files);
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.profile.image = "";
      } else {
        // 否則產生預覽圖
        // 存取到本機圖片，並且暫時將圖片呈現在畫面上。
        const imageURL = window.URL.createObjectURL(files[0]);
        this.profile.image = imageURL;
      }
    },
    async handleSubmit(e) {
			try { 
        if (!this.name) {
          Toast.fire({
            icon: 'warning',
            title: '您尚未填寫姓名'
          })
          return
        }
        
				const form = e.target
        const formData = new FormData(form)
        this.isProcessing = true
        const { data } = await usersAPI.update({
          userId: this.id,
          formData
        })
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.$router.push({ name: 'users', params: { id: this.id } })
			} catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法更新使用者資料，請稍後再試'
        })
			}
		}
  },
};
</script>