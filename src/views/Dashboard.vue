<template>
  <div class="d-flex w-100">
    <div class="projects-section">
      <div class="projects-section-header">
        <div>
          <p class="mb-0">Product Lists</p>
          <div class="text-gray">See All Your Product List</div>
        </div>
        <div>
          <div class="fw-bold size-16">{{ moment().format("dddd") }},</div>
          <div class="text-gray">{{ moment().format("DD MMMM YYYY") }}</div>
        </div>
      </div>
      <hr />
      <div class="row project-boxes">
        <template v-if="product_lists.length > 0">
          <div
            class="col-md-4 mt-4"
            v-for="(data, index) in product_lists"
            :key="index"
          >
            <div class="box border-gray no-shadow position-relative">
              <div class="no-stock-box" v-if="data.stock == 0"></div>
              <div
                class="pic-count"
                v-bind:class="{
                  red: data.stock == 0,
                }"
              >
                <template v-if="data.stock > 0">
                  {{ decimalFormat(data.stock) }}Pcs
                </template>
                <template v-else> Out of Stock </template>
              </div>
              <center>
                <img :src="data.images[0].image" class="img-product" alt="" />
                <h6 class="mb-0 fw-bold mt-2">{{ data.name }}</h6>
                <p class="size-14">{{ currencyFormat(data.price) }}</p>
              </center>
              <div class="mt-3">
                <button class="btn btn-primary w-100" @click="addCart(data.id)">
                  Add to Chart
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="col-md-12 mt-5">
            <center>
              <img src="../assets/no-data.png" width="110" alt="" />
              <div class="mt-3 text-gray size-16">No Product Data</div>
            </center>
          </div>
        </template>
      </div>
    </div>
    <div class="messages-section">
      <div class="projects-section-header mb-4">
        <p>Chart List</p>
      </div>
      <template v-if="carts.length > 0">
        <div class="messages" v-for="(data, index) in carts" :key="index">
          <div class="message-box align-items-center">
            <img :src="data.images[0].image" class="img-product-small" alt="" />
            <div class="message-content">
              <div class="message-header">
                <div class="name">{{ data.product_name }}</div>
                <div>
                  <a
                    href="javascript:void(0)"
                    class="text-danger"
                    @click="deleteListCart(data.id)"
                  >
                    <i class="fa fa-trash"></i>
                  </a>
                </div>
              </div>
              <div class="input mt-1">
                <button
                  class="plus-minus minus"
                  aria-label="Decrease by one"
                  :disabled="data.qty == 1"
                  @click="changeCounter('-1', data)"
                >
                  <svg
                    width="16"
                    height="2"
                    viewBox="0 0 16 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      y1="1"
                      x2="16"
                      y2="1"
                      stroke="#9b59b6"
                      stroke-width="2"
                      class="icon"
                    />
                  </svg>
                </button>
                <div class="number dim">{{ data.qty }}</div>
                <button
                  class="plus-minus plus"
                  aria-label="Increase by one"
                  @click="changeCounter('1', data)"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon"
                  >
                    <line
                      x1="8"
                      y1="4.37114e-08"
                      x2="8"
                      y2="16"
                      stroke="#9b59b6"
                      stroke-width="2"
                    />
                    <line
                      y1="8"
                      x2="16"
                      y2="8"
                      stroke="#9b59b6"
                      stroke-width="2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="message-box" v-else>
        <div class="box no-shadow border-gray w-100 text-center">
          <img src="../assets/no-data.png" width="40" alt="" />
          <div class="mt-2 text-gray">Cart is Empty</div>
        </div>
      </div>
      <div class="p-16">
        <div class="box no-shadow border-gray">
          <div class="text-center fw-bold">Payment Details</div>
          <hr />
          <template v-if="carts.length > 0">
            <div class="d-flex align-item-center">
              <div class="size-14">Total</div>
              <div class="ms-auto size-14 fw-medium">
                {{ currencyFormat(total_price) }}
              </div>
            </div>
            <div class="d-flex align-item-center mt-1">
              <div class="size-14">Tax({{ tax.tax }})</div>
              <div class="ms-auto size-14 fw-medium">
                {{ currencyFormat((total_price * tax.tax) / 100) }}
              </div>
            </div>
            <div class="d-flex align-item-center mt-1">
              <div class="size-14">Service({{ tax.service }}%)</div>
              <div class="ms-auto size-14 fw-medium">
                {{ currencyFormat((total_price * tax.service) / 100) }}
              </div>
            </div>
            <hr />
            <div class="d-flex align-item-center">
              <div class="size-14 fw-bold">Subtotal</div>
              <div class="ms-auto size-14 fw-bold">
                {{ currencyFormat((total_price * 15) / 100 + total_price) }}
              </div>
            </div>
          </template>
          <template v-else>
            <center>
              <img src="../assets/no-data.png" width="40" alt="" />
              <div class="text-gray mt-2">Payment is Empty</div>
            </center>
          </template>
        </div>
        <div class="mt-3">
          <button
            class="btn btn-primary w-100"
            @click="checkout()"
            :disabled="carts.length <= 0"
          >
            <template v-if="is_checkout == true">
              <div class="d-flex align-items-center justify-content-center">
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span class="ms-1">Loading...</span>
              </div>
            </template>
            <template v-else> Checkout </template>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../api/Api";
import moment from "moment";

export default {
  name: "DashboardPage",
  props: ["product_lists"],
  data() {
    return {
      moment: moment,
      is_add_cart: false,
      carts: [],
      tax: {},
      total_price: 0,
      is_checkout: false,
    };
  },
  created() {
    this.getTax();
    this.getCartList();
  },
  methods: {
    getTax() {
      Api.get(`/tax`)
        .then((res) => {
          this.tax = res.data.data;
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message, {
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
        });
    },
    getCartList() {
      Api.get(`/cart/${localStorage.getItem("user_id")}`)
        .then((res) => {
          var data = res.data.data;
          this.carts = data;
          let total_price = 0;
          this.carts.forEach((val) => {
            total_price += Number(val.price * val.qty);
          });
          this.total_price = total_price;
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message, {
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
        });
    },
    addCart(id) {
      this.is_add_cart = true;
      var data = {
        product_id: id,
        user_id: `${localStorage.getItem("user_id")}`,
      };

      Api.post(`cart`, data, {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.is_add_cart = false;
          this.$toast.success("Add Cart Success!!", {
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
          this.getCartList();
          this.$emit("update-count-cart");
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message, {
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
          if (err.response.data.is_token_expired == true) {
            localStorage.clear();
            setTimeout(() => {
              this.$router.push({ path: "/" });
            }, 1500);
          }
          this.is_add_cart = false;
        });
    },
    deleteListCart(id) {
      Api.delete(`/cart/${id}`, {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.getCartList();
          this.$toast.success("Delete List Success!!", {
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
          this.$emit("update-count-cart");
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message, {
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
          if (err.response.data.is_token_expired == true) {
            localStorage.clear();
            setTimeout(() => {
              this.$router.push({ path: "/" });
            }, 1500);
          }
        });
    },
    changeCounter(num, data) {
      data.qty += +num;
      !isNaN(data.qty) && data.qty > 0 ? data.qty : (data.qty = 0);
      var payload = {
        qty: data.qty,
      };
      Api.post(`cart/update/${data.id}`, payload, {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.$toast.success("Update Cart Success!!", {
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
          this.getCartList();
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message, {
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
          if (err.response.data.is_token_expired == true) {
            localStorage.clear();
            setTimeout(() => {
              this.$router.push({ path: "/" });
            }, 1500);
          }
        });
    },
    checkout() {
      this.is_checkout = true;
      const selectedCarts = this.carts.map((item) => ({
        id: item.product_id,
        qty: item.qty,
      }));
      var data = {
        products: selectedCarts,
        user_id: `${localStorage.getItem("user_id")}`,
        total: this.total_price,
        service: this.tax.service,
        tax: this.tax.tax,
        sub_total: (this.total_price * 15) / 100 + this.total_price,
      };

      Api.post(`transaction`, data, {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.is_checkout = false;
          this.$toast.success("Checkout Success!!", {
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
          this.getCartList();
          setTimeout(() => (window.location.href = "/transaction"), 1500);
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message, {
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
          if (err.response.data.is_token_expired == true) {
            localStorage.clear();
            setTimeout(() => {
              this.$router.push({ path: "/" });
            }, 1500);
          }
          this.is_checkout = false;
        });
    },
  },
};
</script>

<style scoped>
.input {
  display: flex;
  align-items: center;
  margin-left: auto;
}
button.plus-minus {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  border: 1px solid #9b59b6;
  border-radius: 50px;
  background-color: #fff;
}
button.plus-minus[disabled] {
  opacity: 0.4;
  pointer-events: none;
}

.number {
  font-size: 16px;
  min-width: 30px;
  text-align: center;
}
.icon {
  user-select: none;
}
.dim {
  color: #000;
}
.p-16 {
  padding: 16px;
}
.pic-count {
  position: absolute;
  right: 0;
  top: 15px;
  background-color: #f7f7f7;
  color: #000;
  font-size: 12px;
  font-weight: 500;
  padding: 3px 10px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  &.red {
    background: #e44e4a !important;
    color: #fff !important;
  }
}
.no-stock-box {
  background: #fff;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1rem;
  opacity: 0.8;
}
</style>
