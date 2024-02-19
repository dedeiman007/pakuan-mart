<template>
  <div class="w-100 bd-highlight">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="box radius-lg p-box position-relative">
          <div class="circle-box">
            <center>
              <img src="../assets/list.png" alt="" />
            </center>
          </div>
          <div class="d-flex align-items-center mb-4">
            <div>
              <div class="mb-0 fw-bold size-24">List Transaction</div>
              <div class="text-gray">List All Transaction Exist</div>
            </div>
          </div>
          <div class="row" v-if="transactions.length > 0">
            <div
              class="col-md-6"
              v-for="(data, index) in transactions"
              :key="index"
            >
              <div class="box mt-4 position-relative">
                <div class="number-point me-3">
                  {{ index + 1 }}
                </div>
                <div class="d-flex">
                  <div>
                    <div class="fw-bold capitalize size-16 text-dark">
                      {{ data.code }}
                    </div>
                    <div class="d-flex align-items-center w-100">
                      <div class="size-12 text-gray me-3">
                        Total:
                        {{ currencyFormat(data.total) }}
                      </div>
                      <div class="size-12 text-gray">
                        Sub Total:
                        {{ currencyFormat(data.sub_total) }}
                      </div>
                    </div>
                  </div>
                  <div class="ms-auto size-12 text-gray">
                    {{ moment(data.created_at).format("DD MMM YYYY") }}
                  </div>
                </div>
                <div class="mt-2">
                  <a
                    :href="`/transaction/detail/${data.id}`"
                    class="btn btn-primary btn-sm px-3"
                  >
                    Transaction Detail
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <center>
              <div class="mt-4">
                <img src="../assets/no-data.png" width="60" alt="" />
                <div class="size-16 fw-medium mt-2 text-gray">
                  No Transaction Data
                </div>
              </div>
            </center>
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
  name: "TransactionPage",
  data() {
    return {
      moment: moment,
      transactions: [],
      is_load: false,
      search: "",
      role_name: `${localStorage.getItem("role_name")}`,
    };
  },
  created() {
    this.getTransaction();
  },
  computed: {},
  methods: {
    getTransaction() {
      this.is_load = true;
      var user_id = 0;
      if (this.role_name == "Admin") {
        user_id = 0;
      } else {
        user_id = `${localStorage.getItem("user_id")}`;
      }
      Api.get(`/transaction/${user_id}`)
        .then((res) => {
          var data = res.data.data;
          this.transactions = data;
          this.is_load = false;
        })
        .catch((err) => {
          console.log(err);
          this.is_load = false;
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
.number-point {
  width: 30px;
  height: 30px;
  background: #f7f7f7;
  border-radius: 50px;
  color: #8e44ad;
  text-align: center;
  line-height: 30px;
  font-weight: 600;
  position: absolute;
  left: -10px;
  top: -15px;
}
</style>
