<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
        v-for="user in users"
        :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin ? 'admin' : 'user' }}</td>
          <td>
            <button 
            v-if="currentUser.id !== user.id"
            type="button" 
            class="btn btn-link"
            @click="
                toggleUserRole({ userId: user.id, isAdmin: user.isAdmin })
              "
            >
            {{ user.isAdmin ? 'set as user' : 'set as admin' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from './../components/AdminNav'

const dummyData = {
  users: [
    {
      id: 1,
      name: "root",
      email: "root@example.com",
      password: "$2a$10$Yxrxlf8.uVNrnfxgfflfCe1KWFgxZOOZxc9E2X6806ZEuW4LH5WbW",
      isAdmin: true,
      image: null,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$Qm5VdQxvP1RW.FwtkSx3Je1dThQIrZmMld2Hr2YwetRIXvESBr70q",
      isAdmin: false,
      image: null,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$QIcNKwkTqsNHSE8n2FRLpuW3tFf/uaNxSgkqXGcx6THXnoRLAfmCa",
      isAdmin: false,
      image: null,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
    },
  ],
};

const dummyUser = {
  currentUser: {
    id: 1,
    name: "管理者",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true,
  },
  isAuthenticated: true,
};

export default {
  components: {
    AdminNav,
  },
  data() {
    return {
      users: [],
      currentUser: {},
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      this.users = dummyData.users
      this.currentUser = dummyUser.currentUser
    },
    toggleUserRole ({ userId, isAdmin }) {
      this.users = this.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              isAdmin: !isAdmin
            }
          }
          return user
        })
    }
  }
};
</script>
