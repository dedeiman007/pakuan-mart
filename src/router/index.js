import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/Profile.vue";
import Product from "../views/Product.vue";
import ProductCreate from "../views/ProductCreate.vue";
import ProductEdit from "../views/ProductEdit.vue";
import ProductCategory from "../views/ProductCategory.vue";
import ProductCategoryCreate from "../views/ProductCategoryCreate.vue";
import ProductCategoryEdit from "../views/ProductCategoryEdit.vue";
import Tax from "../views/Tax.vue";
import Transaction from "../views/Transaction.vue";
import TransactionDetail from "../views/TransactionDetail.vue";
import Report from "../views/Report.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    meta: {
      layout: "login",
      requiresAuth: false,
    },
    component: Login,
  },
  {
    path: "/",
    name: "SignUp",
    meta: {
      layout: "login",
      requiresAuth: false,
    },
    component: SignUp,
    children: [
      {
        path: "/admin/sign-up",
        name: "Login",
        meta: {
          layout: "login",
          requiresAuth: false,
        },
        component: SignUp,
      },
      {
        path: "/user/sign-up",
        name: "Login",
        meta: {
          layout: "login",
          requiresAuth: false,
        },
        component: SignUp,
      },
    ],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      layout: "default",
      requiresAuth: Dashboard,
    },
    component: Dashboard,
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      layout: "default",
      requiresAuth: false,
    },
    component: Profile,
  },
  {
    path: "/product",
    name: "Product",
    meta: {
      layout: "default",
      requiresAuth: false,
    },
    component: Product,
  },
  {
    path: "/create-product",
    name: "ProductCreate",
    meta: {
      layout: "default",
      requiresAuth: false,
    },
    component: ProductCreate,
  },
  {
    path: "/edit-product/:id",
    name: "ProductEdit",
    meta: {
      layout: "default",
      requiresAuth: false,
    },
    component: ProductEdit,
  },
  {
    path: "/product-category",
    name: "ProductCategory",
    meta: {
      layout: "default",
      requiresAuth: false,
    },
    component: ProductCategory,
  },
  {
    path: "/product-category/create",
    name: "ProductCategoryCreate",
    meta: {
      layout: "default",
      requiresAuth: false,
    },
    component: ProductCategoryCreate,
  },
  {
    path: "/product-category/edit/:id",
    name: "ProductCategoryEdit",
    meta: {
      layout: "default",
      requiresAuth: false,
    },
    component: ProductCategoryEdit,
  },
  {
    path: "/tax",
    name: "Tax",
    meta: {
      layout: "default",
      requiresAuth: false,
    },
    component: Tax,
  },
  {
    path: "/transaction",
    name: "Transaction",
    meta: {
      layout: "default",
      requiresAuth: false,
    },
    component: Transaction,
  },
  {
    path: "/transaction/detail/:id",
    name: "TransactionDetail",
    meta: {
      layout: "default",
      requiresAuth: false,
    },
    component: TransactionDetail,
  },
  {
    path: "/report",
    name: "Report",
    meta: {
      layout: "default",
      requiresAuth: false,
    },
    component: Report,
  },
  {
    path: "/:pathMatch(.*)*",
    meta: {
      layout: "login",
      requiresAuth: false,
    },
    component: () => import("../components/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const onError = (e) => {
  if (e.name !== "NavigationDuplicated") throw e;
};

const _push = router.__proto__.push;
router.__proto__.push = function push(...args) {
  try {
    const op = _push.call(this, ...args);
    if (op instanceof Promise) op.catch(onError);
    return op;
  } catch (e) {
    onError(e);
  }
};
(function () {})();
export default router;
