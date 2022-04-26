// ./src/components/RestaurantsPagination.vue
<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 回到上一頁 previousPage -->
      <li
        v-show="previousPage"
        :class="['page-item', { disabled: currentPage === 1 }]"
      >
        <router-link
          class="page-link"
          aria-label="Previous"
          :to="{
            name: 'restaurants',
            query: { categoryId, page: previousPage },
          }"
        >
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>

      <!-- 頁碼 -->
      <li
        v-for="page in totalPage"
        :key="page"
        :class="['page-item', { active: currentPage === page }]"
      >
        <router-link
          class="page-link"
          :to="{ name: 'restaurants', query: { categoryId, page } }"
        >
          {{ page }}
        </router-link>
      </li>

      <!-- 前往下一頁 nextPage -->
      <li
        v-show="nextPage"
        :class="['page-item', { disabled: currentPage === totalPage.length }]"
      >
        <router-link
          class="page-link"
          :to="{ name: 'restaurants', query: { categoryId, page: nextPage } }"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "RestaurantsPagination",
  props: {
    categoryId: {
      type: [String, Number],
      default: "",
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Array,
      required: true,
    },
    previousPage: {
      type: Number,
      required: true,
    },
    nextPage: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
}

.page-link {
  color: #8c0303;
}

.page-item.active .page-link,
.page-item.active span,
a.page-link:hover,
a.page-link:hover span {
  color: white;
  background-color: #8c0303;
  border-color: #8c0303;
  z-index: 1;
}

.page-item span {
  color: #8c0303;
}

@media (max-width: 575px) {
  .pagination {
    margin: 5% 0 25% 0;
  }

  .page-link {
    height: 35px;
    padding: 5px 12px;
    font-size: 15px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .pagination {
    margin: 50px 0 20px 0;
  }

  .page-link {
    height: 35px;
    padding: 5px 12px;
    font-size: 15px;
  }

  .page-item span {
    font-size: 14px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .pagination {
    margin: 60px 0 30px 0;
  }

  .page-link {
    height: 35px;
    padding: 5px 15px;
    font-size: 16px;
  }

  .page-item span {
    font-size: 16px;
  }
}

@media (min-width: 992px) {
  .pagination {
    margin-top: 120px;
  }

  .page-link {
    height: 37px;
    padding: 5px 20px;
    font-size: 18px;
  }

  .page-item span {
    font-size: 18px;
  }
}
</style>