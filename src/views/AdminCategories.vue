// ./src/views/AdminCategories.vue
<template>
  <div>
    <div class="admin-container py-3 px-5">
      <AdminNav />
      <div>
        <form class="my-4">
          <div class="form-row">
            <div class="col-auto">
              <input
                type="text"
                v-model="newCategoryName"
                class="form-control"
                placeholder="Add category ..."
              />
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn btn-outline-info"
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
      <table v-else class="table my-4">
        <thead class="thead">
          <tr class="tr-header">
            <th scope="col" class="column pl-3" width="100">No.</th>
            <th scope="col" class="column">Category Name</th>
            <th scope="col" width="250" class="column">Action</th>
          </tr>
        </thead>
        <tbody v-show="!isLoading">
          <tr v-for="category in categories" :key="category.id" class="tr-item">
            <th scope="row" class="id pl-4">
              {{ category.id }}
            </th>
            <td class="position-relative">
              <div v-show="!category.isEditing" class="category">
                {{ category.name }}
              </div>
              <input
                v-show="category.isEditing"
                v-model="category.name"
                type="text"
                class="form-control"
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
    <button type="button" class="btn btn-link back" @click="$router.back()">
      &lt; GO BACK
    </button>
  </div>
</template>

<script>
import AdminNav from "@/components/AdminNav";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

export default {
  name: "AdminCategories",
  components: {
    AdminNav,
    Spinner,
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
          title: "成功新增餐廳類別",
        });

        this.newCategoryName = ""; // 清空原本欄位中的內容
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法新增餐廳類別，請稍後再試",
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
          title: "成功刪除餐廳類別",
        });
      } catch (error) {
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "無法刪除餐廳類別，請稍後再試",
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

.form-control {
  font-size: 18px;
}

.category {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
  font-size: 20px;
  font-weight: 500;
}

.btn-link {
  font-size: 16px;
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

.back {
  position: fixed;
  bottom: 0;
  left: 5%;
  border-radius: 5px 5px 0 0;
  border: 1px solid #f28705;
  border-bottom: none;
  color: #595959;
  font-size: 20px;
  font-weight: 500;
  animation: fadeInUp;
  animation-duration: 5s;
}

.back:hover {
  color: white;
  background-color: #f28705;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
}
</style>