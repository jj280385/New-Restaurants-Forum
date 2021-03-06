<template>
  <div class="main-container">
    <form class="form" @submit.stop.prevent="handleSubmit">
      <div class="text-center mb-1">
        <h1 class="font-weight-normal">Sign Up</h1>
      </div>

      <div class="form-label-group my-2">
        <label for="name">Name</label>
        <input
          v-model="name"
          id="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="Name"
          autocomplete="off"
          required
          autofocus
        />
      </div>

      <div class="form-label-group my-2">
        <label for="email">Email</label>
        <input
          v-model="email"
          id="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="Email"
          autocomplete="off"
          required
        />
      </div>

      <div class="form-label-group my-2">
        <label for="password">Password</label>
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="off"
          required
        />
      </div>

      <div class="form-label-group my-2">
        <label for="password-check">Password Check</label>
        <input
          v-model="passwordCheck"
          id="password-check"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="off"
          required
        />
      </div>

      <button class="btn btn-block" type="submit" :disabled="isProcessing">
        {{ isProcessing ? "處理中..." : "Submit" }}
      </button>

      <div class="text-center">
        <router-link to="/signin" class="signin"> Sign In </router-link>
      </div>

      <p class="copy text-center">&copy; 2022 UI from Zora Chen</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (
          !this.name ||
          !this.email ||
          !this.password ||
          !this.passwordCheck
        ) {
          Toast.fire({
            icon: "warning",
            title: "請確認已填寫所有欄位",
          });
          return;
        }
        if (this.password !== this.passwordCheck) {
          Toast.fire({
            icon: "warning",
            title: "兩次輸入的密碼不同",
          });
          this.passwordCheck = "";
          return;
        }

        this.isProcessing = true;

        const { data } = await authorizationAPI.singUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: data.message,
        });

        // 若是註冊成功轉址至登入頁面
        this.$router.push({ name: "sign-in" });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: `無法註冊 - ${error.message}`,
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
  padding: 10px 40px 0 40px;
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

label {
  color: white;
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

.signin:hover {
  color: #6f001c;
}

@media (max-width: 575px) {
  form {
    width: 85%;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -30%);
    padding: 15px;
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
    font-size: 18px;
    margin: 15px 0;
  }

  .signin {
    font-size: 18px;
  }

  .copy {
    margin-top: 60px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  label {
    font-size: 16px;
  }

  input {
    height: 35px;
    font-size: 15px;
  }

  .btn {
    font-size: 18px;
    margin: 12px 0 6px 0;
  }

  .signin {
    font-size: 18px;
  }

  .copy {
    margin-top: 10px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  label {
    font-size: 16px;
  }

  input {
    height: 35px;
    font-size: 16px;
  }

  .btn {
    font-size: 18px;
    margin: 15px 0 8px 0;
  }

  .signin {
    font-size: 18px;
  }

  .copy {
    margin-top: 12px;
  }
}

@media (min-width: 992px) {
  label {
    font-size: 18px;
  }

  input {
    height: 38px;
    font-size: 18px;
  }

  .btn {
    font-size: 20px;
    margin: 20px 0 12px 0;
  }

  .signin {
    font-size: 20px;
  }

  .copy {
    margin-top: 15px;
  }
}
</style>