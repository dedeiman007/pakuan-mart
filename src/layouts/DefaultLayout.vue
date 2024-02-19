<template>
  <div class="app-container">
    <div class="app-header">
      <div class="app-header-left">
        <span>
          <img src="../assets/logo-univ.png" width="35" alt="" />
        </span>
        <p class="app-name">Pakuan Mart</p>
        <div
          class="search-wrapper"
          v-if="$route.fullPath.includes('dashboard')"
        >
          <input
            class="search-input"
            type="text"
            placeholder="Search Product Name"
            v-model="search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="feather feather-search"
            viewBox="0 0 24 24"
          >
            <defs></defs>
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
        </div>
      </div>
      <div class="app-header-right">
        <button class="notification-btn">
          <div class="cart">
            <span class="count">{{ cart_count }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              viewBox="0 0 576 512"
            >
              <path
                d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
              />
            </svg>
          </div>
        </button>
        <div class="dropdown">
          <button
            class="profile-btn dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src="../assets/user-default.png" width="" />
            <span class="capitalize">
              {{ profile_name }}
            </span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a
                class="dropdown-item text-danger"
                href="javascript:void(0)"
                @click="logout()"
              >
                <i class="fa fa-sign-out"></i>
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
      <button class="messages-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-message-circle"
        >
          <path
            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
          />
        </svg>
      </button>
    </div>
    <div class="app-content">
      <div class="app-sidebar">
        <a
          href="/dashboard"
          class="app-sidebar-link"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Dashboard"
          :class="{
            '': true,
            active: this.$route.name == 'Dashboard',
          }"
        >
          <i class="fa fa-home size-22"></i>
        </a>
        <a
          href="/product"
          class="app-sidebar-link"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Product List"
          :class="{
            '': true,
            active:
              this.$route.name == 'ProductCreate' ||
              this.$route.name == 'ProductEdit' ||
              this.$route.name == 'Product',
          }"
          v-if="role_name == 'Admin'"
        >
          <i class="fa fa-cube size-22"></i>
        </a>
        <a
          href="/product-category"
          class="app-sidebar-link"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Product Category"
          :class="{
            '': true,
            active:
              this.$route.name == 'ProductCategory' ||
              this.$route.name == 'ProductCategoryCreate' ||
              this.$route.name == 'ProductCategoryEdit',
          }"
          v-if="role_name == 'Admin'"
        >
          <i class="fa fa-folder-o size-22"></i>
        </a>
        <a
          href="/tax"
          class="app-sidebar-link"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Tax"
          :class="{
            '': true,
            active: this.$route.name == 'Tax',
          }"
          v-if="role_name == 'Admin'"
        >
          <i class="fa fa-hdd-o size-22"></i>
        </a>
        <a
          href="/transaction"
          class="app-sidebar-link"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="List Transaction"
          :class="{
            '': true,
            active:
              this.$route.name == 'Transaction' ||
              this.$route.name == 'TransactionDetail',
          }"
        >
          <i class="fa fa-file-o size-22"></i>
        </a>
        <a
          href="/report"
          class="app-sidebar-link"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Report"
          :class="{
            '': true,
            active: this.$route.name == 'Report',
          }"
        >
          <i class="fa fa-bar-chart size-22"></i>
        </a>
        <a
          href="/profile"
          class="app-sidebar-link"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Profile"
          :class="{
            '': true,
            active: this.$route.name == 'Profile',
          }"
        >
          <i class="fa fa-cog size-22"></i>
        </a>
      </div>
      <router-view
        :product_lists="filterDataList"
        :cart_count="cart_count"
        :profile_data="profile_data"
        @update-data-profile="getProfile"
        @update-data-event="getProduct"
        @update-count-cart="getCartCount"
      />
    </div>
  </div>
</template>

<script>
import Api from "../api/Api";
import { Tooltip } from "bootstrap";

export default {
  props: "",
  data() {
    return {
      products: [],
      cart_count: 0,
      search: "",
      name: `${localStorage.getItem("name")}`,
      user_id: `${localStorage.getItem("user_id")}`,
      role_name: `${localStorage.getItem("role_name")}`,
      profile_data: {},
      profile_name: "",
    };
  },
  computed: {
    filterDataList() {
      return this.products.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  created() {
    this.getProduct();
    this.getCartCount();
    this.getProfile();
  },
  mounted() {
    new Tooltip(document.body, {
      selector: "[data-bs-toggle='tooltip']",
    });
  },
  methods: {
    getProduct() {
      Api.get(`/product`)
        .then((res) => {
          var data = res.data.data;
          this.products = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCartCount() {
      Api.get(`/cart/count/${localStorage.getItem("user_id")}`)
        .then((res) => {
          this.cart_count = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      this.$toast.success("Log Out Success", {
        position: "top-right",
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: false,
        icon: true,
        rtl: false,
      });
      localStorage.clear();
      setTimeout(() => {
        this.$router.push({ path: "/" });
      }, 1500);
    },
    getProfile() {
      Api.get(`/detail/${localStorage.getItem("user_id")}`)
        .then((res) => {
          var data = res.data.data;
          this.profile_data = data;
          this.profile_name = data.name;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.cart {
  position: relative;
  display: block;
  width: 28px;
  margin-top: 10px;
}
.cart .count {
  position: absolute;
  top: -7px;
  right: -6px;
  z-index: 999;
  font-size: 10px;
  border-radius: 50%;
  background: #d60b28;
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  text-align: center;
  color: white;
}
.dropdown-toggle::after {
  display: none;
}
.dropdown-menu.show {
  border: unset !important;
  box-shadow: 0 1px 12px -1px rgb(141 145 162 / 25%);
  margin-top: 20px !important;
}
.dropdown-item.active,
.dropdown-item:active {
  background-color: #fff !important;
}
</style>
