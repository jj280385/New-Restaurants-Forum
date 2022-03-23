// ./src/views/UsersTop.vue
<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <div v-for="user in users" :key="user.id" class="col-3">
        <a href="#">
          <img :src="user.image | emptyImage" width="140px" height="140px" />
        </a>
        <h2>{{ user.name }}</h2>
        <span class="badge badge-secondary"
          >追蹤人數：{{ user.FollowerCount }}</span
        >
        <p class="mt-3">
          <button
            v-if="user.isFollowed"
            type="button"
            class="btn btn-danger"
            @click.stop.prevent="deleteFollowed(user)"
          >
            取消追蹤
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            @click.stop.prevent="addFollowed(user)"
          >
            追蹤
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs.vue'
import { emptyImageFilter } from './../utils/mixins'

const dummyData = {
    "users": [
        {
            "id": 1,
            "name": "root",
            "email": "root@example.com",
            "password": "$2a$10$Yxrxlf8.uVNrnfxgfflfCe1KWFgxZOOZxc9E2X6806ZEuW4LH5WbW",
            "isAdmin": true,
            "image": null,
            "createdAt": "2022-02-15T03:53:45.000Z",
            "updatedAt": "2022-02-15T03:53:45.000Z",
            "Followers": [],
            "FollowerCount": 0,
            "isFollowed": false
        },
        {
            "id": 2,
            "name": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$Qm5VdQxvP1RW.FwtkSx3Je1dThQIrZmMld2Hr2YwetRIXvESBr70q",
            "isAdmin": false,
            "image": null,
            "createdAt": "2022-02-15T03:53:45.000Z",
            "updatedAt": "2022-02-15T03:53:45.000Z",
            "Followers": [],
            "FollowerCount": 0,
            "isFollowed": false
        },
        {
            "id": 3,
            "name": "user2",
            "email": "user2@example.com",
            "password": "$2a$10$QIcNKwkTqsNHSE8n2FRLpuW3tFf/uaNxSgkqXGcx6THXnoRLAfmCa",
            "isAdmin": false,
            "image": null,
            "createdAt": "2022-02-15T03:53:45.000Z",
            "updatedAt": "2022-02-15T03:53:45.000Z",
            "Followers": [],
            "FollowerCount": 0,
            "isFollowed": false
        }
    ]
}

export default {
  components: {
    NavTabs,
  },
  mixins: [emptyImageFilter],
  data () {
    return {
      users: []
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      this.users = dummyData.users
    },
    addFollowed(user) {
      user.isFollowed = true;
    },
    deleteFollowed(user) {
      user.isFollowed = false;
    }
  }
}
</script>