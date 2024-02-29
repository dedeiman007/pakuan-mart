<template>
  <div class="w-100 bd-highlight">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="box border-top p-0">
          <div class="p-4">
            <div class="d-flex">
              <div>
                <h3 class="mb-0 capitalize">{{ profile_data.name }}</h3>
                <div class="text-gray mb-3">
                  ({{ moment().format("DD MMMM YYYY") }})
                </div>
              </div>
              <div class="ms-auto">
                <img src="../assets/logo-univ.png" width="55" alt="" />
              </div>
            </div>
            <div
              class="box invoice-detail mt-2"
              v-for="(data, index) in transactions"
              :key="index"
            >
              <div class="d-flex align-items-center">
                <div class="me-3">
                  <img
                    :src="data.images[0].image"
                    class="img-product-transaction"
                    alt=""
                  />
                </div>
                <div>
                  <div class="size-14 fw-bold">
                    {{ data.name }}
                  </div>
                  <div class="size-12 text-gray">
                    Total Item: {{ data.qty }}
                  </div>
                </div>
                <div class="ms-auto">
                  <div class="fw-bold">{{ currencyFormat(data.price) }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-rashed mt-2"></div>
          <div class="p-4">
            <div class="d-flex align-items-center">
              <div class="fw-medium">Total</div>
              <div class="fw-medium ms-auto">
                {{ currencyFormat(total_price) }}
              </div>
            </div>
            <div class="d-flex align-items-center mt-2">
              <div class="fw-medium">Tax({{ tax.tax }}%)</div>
              <div class="fw-medium ms-auto">
                {{ currencyFormat((total_price * tax.tax) / 100) }}
              </div>
            </div>
            <div class="d-flex align-items-center mt-2">
              <div class="fw-medium">Service({{ tax.service }}%)</div>
              <div class="fw-medium ms-auto">
                {{ currencyFormat((total_price * tax.service) / 100) }}
              </div>
            </div>
            <div class="d-flex align-items-center mt-2">
              <div class="fw-bold">Subtotal</div>
              <div class="fw-bold ms-auto">
                {{ currencyFormat((total_price * 15) / 100 + total_price) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../api/Api";
import moment from "moment";

export default {
  components: {},
  props: ["profile_data"],
  name: "TransactionDetailPage",
  data() {
    return {
      moment: moment,
      transactions: [],
      tax: {},
      total_price: 0,
    };
  },
  created() {
    this.getTax();
    this.getTransactionDetail();
  },
  computed: {},
  methods: {
    getTax() {
      Api.get(`/tax`)
        .then((res) => {
          this.tax = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTransactionDetail() {
      this.is_load = true;
      Api.get(
        `/transaction/${localStorage.getItem("user_id")}/${
          this.$route.params.id
        }`
      )
        .then((res) => {
          this.transactions = res.data.data;
          let total_price = 0;
          this.transactions.forEach((val) => {
            total_price += Number(val.price * val.qty);
          });
          this.total_price = total_price;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.p-box {
  padding: 32px;
}
.circle-box {
  width: 65px;
  height: 65px;
  border-radius: 50px;
  background-color: #8e44ad;
  position: absolute;
  top: -20px;
  right: -20px;
  padding: 11px;
  z-index: 9;
}
.circle-box img {
  width: 40px;
}
.invoice-detail {
  border-radius: 10px !important;
  border: 1.5px solid #f7f7f7;
  box-shadow: unset !important;
  padding: 14px;
}
.img-product-transaction {
  width: 20px;
  height: 29px;
  -o-object-fit: cover;
  object-fit: cover;
}
.border-rashed {
  border: none;
  border-top: 3px dashed #f7f7f7;
  color: #fff;
  background-color: #fff;
  height: 1px;
}
.border-top {
  border-top: 3px solid #8e44ad !important;
}
</style>
