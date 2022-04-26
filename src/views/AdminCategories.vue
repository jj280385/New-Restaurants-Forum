// ./src/views/AdminCategories.vue
<template>
  <div>
    <div class="admin-container py-3 px-2 mb-5">
      <AdminNav />
      <div>
        <form>
          <div class="form-row">
            <div class="col-auto">
              <input
                type="text"
                v-model="newCategoryName"
                class="form-control"
                placeholder="Add category ..."
                autocomplete="off"
              />
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn btn-outline-info add"
                @click.stop.prevent="createCategory"
                :disabled="isProcessing"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>

      <Spinner v-if="isLoading" class="admin-spinner" />
      <table v-else class="table mt-3 mb-5">
        <thead class="thead">
          <tr class="tr-header">
            <th scope="col" class="column pl-3 col-2 col-sm-2">No.</th>
            <th scope="col" class="column col-6 col-sm-6">Category Name</th>
            <th scope="col" class="column col-4 col-sm-4">Action</th>
          </tr>
        </thead>
        <tbody v-show="!isLoading">
          <tr v-for="category in categories" :key="category.id" class="tr-item">
            <th scope="row" class="id pl-4">
              {{ category.id }}
            </th>
            <td class="position-relative">
              <div v-show="!category.isEditing" class="title">
                {{ category.name }}
              </div>
              <input
                v-show="category.isEditing"
                v-model="category.name"
                type="text"
                class="form-control"
                autocomplete="off"
              />
              <span
                v-show="category.isEditing"
                @click="handleCancel(category.id)"
                class="cancel"
              >
                ✕
              </span>
            </td>
            <td class="d-flex justify-content-between">
              <button
                v-show="!category.isEditing"
                type="button"
                class="btn btn-link mr-2"
                @click.stop.prevent="toggleIsEditing(category.id)"
              >
                Edit
              </button>
              <button
                v-show="category.isEditing"
                type="button"
                class="btn btn-link mr-2"
                @click.stop.prevent="
                  updateCategory({
                    categoryId: category.id,
                    name: category.name,
                  })
                "
              >
                Save
              </button>
              <button
                type="button"
                class="btn delete mr-2"
                @click.stop.prevent="deleteCategory(category.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
import AdminNav from "@/components/AdminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";
import BottomNavTabsForPage from "./../components/BottomNavTabsForPage";

export default {
  name: "AdminCategories",
  components: {
    AdminNav,
    Spinner,
    BottomNavTabsForPage
  },
  data() {
    return {
      newCategoryName: "",
      categories: [],
      isLoading: true,
      isProcessing: false,
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    //取得餐廳類別列表
    async fetchCategories() {
      try {
        const { data } = await adminAPI.categories.get();

        if (data.status === "error") {
          throw new Error(data.message);
        }

        // 在每一個category中都添加一個 isEditing屬性
        this.categories = data.categories.map((category) => ({
          ...category,
          isEditing: false,
          nameCached: "",
        }));

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳類別，請稍後再試",
        });
      }
    },

    // 新增餐廳類別
    async createCategory() {
      try {
        this.isProcessing = true;
        const { data } = await adminAPI.categories.create({
          name: this.newCategoryName,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        // TODO:透過API告知伺服器欲新增的餐廳類別
        // 將新的類別添加到陣列中
        this.categories.push({
          id: data.categoryId,
          name: this.newCategoryName,
        });

        Toast.fire({
          icon: "success",
          title: "已成功新增該餐廳類別",
        });

        this.newCategoryName = ""; // 清空原本欄位中的內容
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法新增該餐廳類別，請稍後再試",
        });
      }
    },

    // 刪除餐廳類別
    async deleteCategory(categoryId) {
      try {
        const { data } = await adminAPI.categories.delete({
          categoryId,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        // TODO: 透過API告知伺服器欲刪除的餐廳類別
        // 將該餐廳類別從陣列中刪除
        this.categories = this.categories.filter(
          (category) => category.id !== categoryId
        );

        Toast.fire({
          icon: "success",
          title: "已成功刪除該餐廳類別",
        });
      } catch (error) {
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "無法刪除該餐廳類別，請稍後再試",
        });
      }
    },

    // 更新編輯後的餐廳類別
    async updateCategory({ categoryId, name }) {
      try {
        const { data } = await adminAPI.categories.update({
          categoryId,
          name,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        // TODO: 透過 API 去向伺服器更新餐廳類別名稱
        this.toggleIsEditing(categoryId);
      } catch (error) {
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "無法更新餐廳類別，請稍後再試",
        });
      }
    },

    // 切換樣板
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCached: category.name,
          };
        }
        return category;
      });
    },

    // 按取消編輯icon時
    handleCancel(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            // 把原本的餐廳類別名稱還回去
            name: category.nameCached,
          };
        }
        return category;
      });
      this.toggleIsEditing(categoryId);
    },
  },
};
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  animation: fadeInUp;
  animation-duration: 3s;
}

.category {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
  font-weight: 500;
}

.btn-link {
  font-weight: 400;
  border: 2px solid transparent;
  text-decoration: none;
}

.btn-link:hover {
  border-bottom: 2px solid #f28705;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}

.title {
  font-weight: 500;
  display: inline-block;
}

.title:hover {
  color: black;
}

@media (max-width: 576px) {
  .back {
    display: none;
  }

  .bottom-navtabs {
    animation: fadeInUp;
    animation-duration: 3s;
  }

  .admin-container {
    border: none;
    margin: 20% 0;
    width: 100%;
  }

  .column, .title, .id {
    font-size: 16px;
  }

  .form-control, .add, 
  .back, .btn-link, .delete {
    font-size: 14px;
  }
}

@media (min-width: 576px) {
  .bottom-navtabs {
    display: none;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .column, .title, .id {
    font-size: 18px;
  }

  .form-control, .add, 
  .back, .btn-link, .delete {
    font-size: 16px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .column, .title, .id {
    font-size: 20px;
  }

  .form-control, .add,
  .back, .btn-link, .delete {
    font-size: 18px;
  }
}

@media (min-width: 992px) {
  .form-control {
    font-size: 18px;
  }

  .column, .title, .id {
    font-size: 24px;
  }

  .form-control, .add, 
  .back, .btn-link, .delete {
    font-size: 22px;
  }
}
</style>