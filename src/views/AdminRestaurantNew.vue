// ./src/views/AdminRestaurantNew.vue
<template>
  <div class="container py-5">
    <AdminRestaurantForm 
    @after-submit="handleAfterSubmit"/>
  </div>
</template>

<script>
import AdminRestaurantForm from './../components/AdminRestaurantForm.vue'

export default {
  components: {
    AdminRestaurantForm
  },
  methods: {
    handleAfterSubmit(formData) {
      // 透過API將表單送到伺服器
      for(let [name, value] of formData.entries()) {
        console.log(name + ':' + value)
      }
    }
  }
}
</script>