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
              </center>
              <h6 class="mb-0 fw-bold mt-2">{{ data.name }}</h6>
              <p class="size-14 mb-0">{{ currencyFormat(data.price) }}</p>
              <div class="tag-html size-12" v-html="data.description"></div>
              <div class="mt-2">
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
            @click="openModalCheckout()"
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
    <div class="modal-vue">
      <div class="overlay" v-if="modalCheckout"></div>
      <div class="modal-body-chat sm" v-if="modalCheckout">
        <div class="d-flex bd-highlight align-items-lg-center">
          <div class="flex-grow-1 bd-highlight">
            <h5 class="mb-0 fw-bold">Select Bank Payment & Shipping</h5>
          </div>
        </div>
        <div class="text-gray">
          Select Bank Payment & Shipping Method to Checkout
        </div>
        <div class="row mt-3">
          <template v-for="(item, index) in payment_lists">
            <div class="col-md-6 mt-2" :key="index">
              <label class="plan payment" :for="item.value">
                <input
                  type="radio"
                  :id="item.value"
                  name="bank-item"
                  v-model="item_bank"
                  :value="item"
                />
                <div class="plan-content text-center capitalize fw-bold p-2">
                  <img :src="item.image" width="100" alt="" />
                  <div class="mt-2 text-gray">
                    {{ item.no_rek }}
                  </div>
                </div>
              </label>
            </div>
          </template>
          <template v-for="(item, index) in shipping_lists">
            <div class="col-md-6 mt-3" :key="index">
              <label class="plan payment" :for="item.value">
                <input
                  type="radio"
                  :id="item.value"
                  name="bank-shipping"
                  v-model="item_shipping"
                  :value="item"
                />
                <div class="plan-content text-center capitalize fw-bold p-2">
                  <img
                    :src="item.image"
                    width="100"
                    v-bind:class="{
                      'pt-jne pb-jne': item.name == 'JNE',
                    }"
                    alt=""
                  />
                </div>
              </label>
            </div>
          </template>
        </div>
        <div class="mt-3" v-if="item_bank && item_shipping">
          <div>
            <label class="mb-1 fw-semibold">Upload Invoice</label>
          </div>
          <label type="file" :class="!imagePhoto ? 'upload__btn' : ''">
            <img v-if="imagePhoto" class="photo" :src="paymentPictureUrl" />
            <p v-else class="mb-0" style="color: #adb5bd">
              <i class="fa fa-plus"></i>
            </p>
            <input
              class="cursor-pointer"
              id="upload"
              type="file"
              name="file"
              ref="file"
              @change="uploadPhoto"
            />
          </label>
        </div>
        <hr />
        <div class="mt-3 row">
          <div class="col-md-6">
            <button
              class="btn btn-outline-primary btn-lg w-100"
              @click="modalCheckout = false"
            >
              Cancel
            </button>
          </div>
          <div class="col-md-6">
            <button
              class="btn btn-primary btn-lg w-100"
              :disabled="
                item_bank == null || item_shipping == null || req.photo == ''
              "
              @click="checkoutPayment()"
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
              <template v-else> Continue </template>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../api/Api";
import moment from "moment";
import bca from "../assets/bca.png";
import mandiri from "../assets/mandiri.png";
import noImage from "../assets/no-photo.png";
import JNE from "../assets/jne.svg";
import JNT from "../assets/jnt.png";

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
      modalCheckout: false,
      payment_lists: [
        { name: "Bank BCA", value: "bca", image: bca, no_rek: "0953657128" },
        {
          name: "Bank Mandiri",
          value: "mandiri",
          image: mandiri,
          no_rek: "1240011353597",
        },
      ],
      shipping_lists: [
        { name: "JNE", value: "JNE", image: JNE },
        {
          name: "JNT",
          value: "JNT",
          image: JNT,
        },
      ],
      item_bank: null,
      item_shipping: null,
      imagePhoto: "",
      req: {
        photo: "",
      },
    };
  },
  created() {
    this.getTax();
    this.getCartList();
  },
  methods: {
    uploadPhoto(event) {
      var input = event.target;
      this.req.photo = input.files[0];
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imagePhoto = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
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
    openModalCheckout() {
      console.log("ada");
      this.modalCheckout = true;
    },
    checkoutPayment() {
      this.is_checkout = true;
      const selectedCarts = this.carts.map((item) => ({
        id: item.product_id,
        qty: item.qty,
      }));
      var data = new FormData();
      selectedCarts.forEach((item, itemIndex) => {
        for (const key in item) {
          if (Array.isArray(item[key])) {
            item[key].forEach((handlingItem, handlingIndex) => {
              data.append(
                `products[${itemIndex}][${key}][${handlingIndex}]`,
                handlingItem
              );
            });
          } else {
            data.append(`products[${itemIndex}][${key}]`, item[key]);
          }
        }
      });
      data.append("user_id", `${localStorage.getItem("user_id")}`);
      data.append("total", this.total_price);
      data.append("service", this.tax.service);
      data.append("tax", this.tax.tax);
      data.append("bank", this.item_bank.name);
      data.append("courier", this.item_shipping.value);
      data.append("no_rek", this.item_bank.no_rek);
      data.append(
        "sub_total",
        (this.total_price * 15) / 100 + this.total_price
      );
      if (this.req.photo) {
        data.append("payment_proof", this.req.photo);
      }

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
  computed: {
    paymentPictureUrl() {
      return this.imagePhoto.length > 0 ? this.imagePhoto : noImage;
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
.upload__btn {
  color: #dee2e6;
  text-align: center;
  cursor: pointer;
  background-color: #ffffff;
  border: dashed;
  border-radius: 10px;
  width: 13vw;
  height: 150px;
  padding: 55px;
  position: relative;
}
.photo {
  border-radius: 10px;
  cursor: pointer;
  width: 13vw;
  height: 150px;
  object-fit: cover;
  border: dashed;
  color: #dee2e6;
}
.btn-lg {
  width: 150px;
}
input[type="file"] {
  display: none;
}
.upload__btn p i {
  font-size: 30px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.pt-jne {
  padding-top: 9px;
}
.pb-jne {
  padding-bottom: 9px;
}
</style>
