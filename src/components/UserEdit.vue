<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="userData.name"
          id="name"
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
          v-if="userData.image"
          :src="userData.image"
          class="image d-block img-thumbnail mb-3"
          style="width: 90px; height: 90px"
        />
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
        />
      </div>

      <div class="form-group">
        <label for="email">E-mail</label>
        <input
          v-model="userData.email"
          id="email"
          type="text"
          name="email"
          class="form-control"
          placeholder="Enter Email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="userData.password"
          id="password"
          type="text"
          name="password"
          class="form-control"
          placeholder="Enter Password"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
const dummyUser = {
  profile: {
    id: 1,
    name: "root",
    email: "root@example.com",
    password: "$2a$10$OJ3jR93XlEMrQtYMWOIQh.EINWgaRFTXkd0Xi5OC/Vz4maztUXEPe",
    image: "https://i.imgur.com/58ImzMM.png",
  },
};

export default {
  data() {
    return {
      userData: {
        id: "",
        name: "",
        email: " ",
        password: "",
        image: "",
      },
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  methods: {
    fetchUser(userId) {
      console.log("UserEdit : ", userId);
      const { profile } = dummyUser;
      const { id, name, email, password, image } = profile;
      this.userData = {
        ...this.userData,
        ...profile,
        id,
        name,
        email,
        password,
        image,
      };
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      for (let [name, value] of formData) {
        console.log(name + ":" + value);
      }
      console.log("Data from UserEdit", formData);
    },
    handleFileChange(e) {
      const files = e.target.files;
      if (files.length === 0) {
        this.userData.image = "";
      } else if (files.length > 0) {
        const fileURL = window.URL.createObjectURL(files[0]);
        this.userData.image = fileURL;
      }
    },
  },
};
</script>