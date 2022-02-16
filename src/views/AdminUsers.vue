<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Role
          </th>
          <th
            scope="col"
            width="140"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">
            {{user.id}}
          </th>
          <td>{{user.email}}</td>
          <td>
            <span v-show="!user.isAdmin">admin</span>
            <span v-show="user.isAdmin">user</span>
          </td>
          <td>
            <button
              @click.stop.prevent="toggleIsAdmin(user.id)"
              v-show="user.isAdmin"
              type="button"
              class="btn btn-link"
            >
              set as admin
            </button>
            <button
              @click.stop.prevent="toggleIsAdmin(user.id)"
              v-show="!user.isAdmin"
              type="button"
              class="btn btn-link"
            >
              set as user
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav.vue'
import {v4 as uuidv4} from 'uuid'

const dummyData = {
  users: [
    {
      id: uuidv4(),
      email: 'root@examplee.com',
      role: 'admin',
    },
    {
      id: uuidv4(),
      email: 'user1@examplee.com',
      role: 'user',
    },
    {
      id: uuidv4(),
      email: 'user2@examplee.com',
      role: 'user',
    }
  ]
}


export default {
  components: {
    AdminNav,
  },
  data () {
    return {
      users: [],
    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    fetchUser(){
      this.users = dummyData.users.map (user => {
        return {
          ...user,
          isAdmin: false,
        }
      })
    },
    toggleIsAdmin (userId) {
      this.users = this.users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            isAdmin: !user.isAdmin,
          }
        }
        return user
      })
    },
  }
}
</script>