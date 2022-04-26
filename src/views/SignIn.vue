// ./src/views/SignIn.vue
<template>
  <div class="main-container">
    <form class="form" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group my-4">
        <label for="email">Email</label>
        <input
          v-model="email"
          id="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="Email"
          autocomplete="off"
          autofocus
        />
      </div>

      <div class="form-label-group my-4">
        <label for="password">Password</label>
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="off"
        />
      </div>

      <button class="btn btn-block" type="submit" :disabled="isProcessing">
        Submit
      </button>

      <div class="text-center">
        <router-link to="/signup" class="signup"> Sign Up </router-link>
      </div>

      <p class="copy text-center">&copy; 2022 UI from Zora Chen</p>
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
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit(event) {
      try {
        console.log("event", event);
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
        this.isProcessing = true;

        // 使用 authorizationAPI 的 signIn 方法
        // 並且帶入使用者填寫的 email 和 password
        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password,
        });

        const { data } = response;

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.token);

        // 將資料傳到Vuex中
        this.$store.commit("setCurrentUser", data.user);

        // 成功登入後轉址到餐廳首頁
        this.$router.push("/restaurants");
      } catch (error) {
        // 將密碼欄位清空
        (this.password = ""),
          // 因為登入失敗，所以要把按鈕狀態還原
          (this.isProcessing = false),
          // 顯示錯誤提示
          Toast.fire({
            icon: "warning",
            title: "email 或 password 輸入錯誤，請重新填寫",
          });
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  height: 100vh;
  background-image: url(./../assets/login/photo-2.jpg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  position: relative;
}

form {
  width: 50%;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -40%);
  background-color: rgba(232, 232, 234, 0.4);
  border-radius: 8px;
  padding: 25px 40px;
  animation: fadeIn;
  animation-duration: 3s;
}

.form-label-group {
  width: 100%;
}

h1 {
  color: white;
  font-family: "Helvetica Neue";
}

input:hover {
  border: 1px solid #8c0303;
}

.btn:active {
  background-color: #6f001c;
}

.btn,
.btn.btn-border:hover {
  color: white;
  background-color: #a6450d;
  border: 2px solid #a6450d;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-border,
.btn:hover,
.btn-primary:hover {
  background: #8c0303;
  color: white;
  text-decoration: none;
  border: 2px solid #8c0303;
  opacity: 0.8;
}

.btn:focus {
  box-shadow: none;
}

.btn:not(:disabled):not(.disabled).active,
.btn:not(:disabled):not(.disabled):active,
.show > .btn.dropdown-toggle {
  border: 2px solid #8c0303;
  color: white;
  background: #8c0303;
}

.btn-primary.disabled,
.btn-primary:disabled {
  color: #fff;
  background-color: #8c0303;
  border-color: #8c0303;
}

.btn-outline-success {
  border-color: white;
  border-width: 1px;
}

.btn-outline-success:hover {
  color: rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 0.85);
  border-width: 1px;
}

.signup:hover {
  color: #6f001c;
}

@media (max-width: 575px) {
  form {
    width: 85%;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -30%);
    padding: 10px;
  }

  label {
    color: white;
    font-size: 18px;
  }

  input {
    height: 40px;
    font-size: 16px;
  }

  .btn {
    font-size: 16px;
    margin: 15px 0;
  }

  .signup {
    font-size: 16px;
  }

  .copy {
    margin-top: 60px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  form {
    padding: 20px 15px;
  }

  label {
    color: white;
    font-size: 18px;
  }

  input {
    height: 40px;
    font-size: 16px;
  }

  .btn {
    font-size: 16px;
    margin: 15px 0;
  }

  .signup {
    font-size: 16px;
  }

  .copy {
    margin-top: 60px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  label {
    color: white;
    font-size: 18px;
  }

  input {
    height: 40px;
    font-size: 18px;
  }

  .btn {
    font-size: 18px;
    margin: 15px 0;
  }

  .signup {
    font-size: 18px;
  }

  .copy {
    margin-top: 50px;
  }
}

@media (min-width: 992px) {
  label {
    color: white;
    font-size: 24px;
  }

  input {
    height: 50px;
    font-size: 20px;
  }

  .btn {
    font-size: 20px;
    margin: 40px 0 25px 0;
  }

  .signup {
    font-size: 18px;
  }

  .copy {
    margin-top: 20px;
  }
}
</style>