<template>
  <div class="main-container">
    <div class="edit-container py-3 px-3">
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

          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            class="form-control-file"
            autocomplete="off"
            @change="handleFileChange"
          />
        </div>
        <div class="btn-area">
          <button
            type="submit"
            class="btn btn-outline-info"
            :disabled="isProcessing"
          >
            {{ isProcessing ? "Updating..." : "Submit" }}
          </button>
        </div>
      </form>
    </div>
    <div class="back">
      <button type="button" class="btn btn-link back-btn" @click="$router.back()">
        <img src="./../assets/icons/back.png" class="back-icon">
      </button>
    </div>
    <BottomNavTabsForPage class="bottom-navtabs"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import BottomNavTabsForPage from "./../components/BottomNavTabsForPage";


export default {
  name: "UserEdit",
  components: {
    BottomNavTabsForPage
  },
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
    ...mapState(["currentUser"]),
  },
  watch: {
    currentUser(user) {
      if (user.id === -1) return;
      const { id } = this.$route.params;
      this.setUser(id);
    },
  },
  created() {
    if (this.currentUser.id === -1) return;
    const { id } = this.$route.params;
    this.setUser(id);
  },
  beforeRouteUpdate(to, from, next) {
    if (this.currentUser.id === -1) return;
    const { id } = to.params;
    this.setUser(id);
    next();
  },
  methods: {
    setUser(userId) {
      const { id, image, name, email } = this.currentUser;

      if (id.toString() !== userId.toString()) {
        this.$router.push({ name: "not-found" });
        return;
      }
      this.id = id;
      this.name = name;
      this.email = email;
      this.image = image;
    },
    handleFileChange(e) {
      const files = e.target.files;

      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.image = "";
      } else {
        // 否則產生預覽圖
        // 存取到本機圖片，並且暫時將圖片呈現在畫面上。
        const imageURL = window.URL.createObjectURL(files[0]);
        this.image = imageURL;
      }
    },
    async handleSubmit(e) {
      try {
        if (!this.name) {
          Toast.fire({
            icon: "warning",
            title: "您尚未填寫姓名",
          });
          return;
        }

        const form = e.target;
        const formData = new FormData(form);
        this.isProcessing = true;
        const { data } = await usersAPI.update({
          userId: this.id,
          formData,
        });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.$router.push({ name: "users", params: { id: this.id } });

        Toast.fire({
          icon: "success",
          title: "已成功編輯使用者資料！",
        });

      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法更新使用者資料，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.edit-container {
  border: 1px solid #d5cec0;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  animation: zoomIn;
  animation-duration: 3s;
}

.edit-container:hover {
  border: 1px solid #8c0303;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  transition-duration: 1s;
}

.btn-area {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 576px) {
  .edit-container {
    margin: 20% 0;
    width: 80%;
  }

  .back {
    display: none;
  }

  .bottom-navtabs {
    animation: fadeInUp;
    animation-duration: 3s;
  }
}

@media (min-width: 576px) {
  .bottom-navtabs {
    display: none;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .edit-container {
    margin: 12% 0;
    width: 55%;
  }

  .back{
    font-size: 18px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .edit-container {
    margin: 10% 0;
    width: 50%;
  }

  label {
    font-size: 18px;
  }

  .form-control {
    font-size: 16px;
  }

  .btn {
    font-size: 16px;
  }

  .back{
    font-size: 18px;
  }
}

@media (min-width: 992px) {
  .edit-container {
    margin: 10% 0;
    width: 40%;
  }

  label {
    font-size: 20px;
  }

  .form-control {
    font-size: 18px;
  }

  .btn {
    font-size: 18px;
  }

  .back{
    font-size: 20px;
  }
}
</style>