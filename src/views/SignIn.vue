// ./src/views/SignIn.vue
<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          v-model="email"
          id="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="username"
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
        />
      </div>

      <button 
      class="btn btn-lg btn-primary btn-block mb-3" 
      type="submit"
      :disabled="isProcessing"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
import authorizationAPI from "./../apis/authorization";

export default {
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit(e) {
      try { 
        console.log("event", e);
        // 如果email或password為空，則使用Toast提示
        // 然後return不繼續往後執行
        if (!this.email || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填寫 email 和 password",
          });
          return;
        }
        
        // 關閉submit按紐點擊功能
        this.isProcessing = true
        
        // 使用 authorizationAPI 的 signIn 方法
        // 並且帶入使用者填寫的 email 和 password
        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password,
        })

        const { data } = response;
        
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        
        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.token);

        // 將資料傳到Vuex中
        this.$store.commit('setCurrentUser', data.user)

        // 成功登入後轉址到餐廳首頁
        this.$router.push("/restaurants");

      } catch (error) {
        // 將密碼欄位清空
        this.password = "",
        // 因為登入失敗，所以要把按鈕狀態還原
        this.isProcessing = false,
        // 顯示錯誤提示
        Toast.fire({
          icon: "warning",
          title: "email 或 password 輸入錯誤，請重新填寫",
        });
        console.log("error", error);
      }
    },
  },
};
</script>