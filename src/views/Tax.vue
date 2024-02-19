<template>
  <div class="w-100 bd-highlight">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="box radius-lg p-box position-relative">
          <div class="circle-box">
            <center>
              <img src="../assets/tax.png" alt="" />
            </center>
          </div>
          <div class="mb-0 fw-bold size-24">Setting Tax</div>
          <div class="text-gray">Create or Update your Tax Setting!!</div>
          <div class="mt-3">
            <div>
              <label class="fw-bold mb-1">Tax</label>
            </div>
            <div class="position-relative">
              <money v-model="req.tax" v-bind="decimal" class="form-control" />
              <span class="right-position-content"> % </span>
            </div>
          </div>
          <div class="mt-2">
            <div>
              <label class="fw-bold mb-1">Service</label>
            </div>
            <div class="position-relative">
              <money
                v-model="req.service"
                v-bind="decimal"
                class="form-control"
              />
              <span class="right-position-content"> % </span>
            </div>
          </div>
          <div class="mt-3">
            <button class="btn btn-primary btn-lg w-100" @click="updateData()">
              <template v-if="is_save == true">
                <div class="d-flex align-items-center justify-content-center">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span class="ms-1">Loading...</span>
                </div>
              </template>
              <template v-else> Update </template>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Money } from "v-money";
import Api from "../api/Api";

export default {
  components: {
    Money,
  },
  name: "TaxPage",
  data() {
    return {
      req: {},
      decimal: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 0,
        masked: false,
      },
      is_save: false,
    };
  },
  created() {
    this.getTax();
  },
  methods: {
    getTax() {
      Api.get(`/tax`)
        .then((res) => {
          this.req = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateData() {
      var data = {
        tax: this.req.tax,
        service: this.req.service,
      };

      this.is_save = true;

      Api.post(`tax/update/${this.req.id}`, data, {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          this.is_save = false;
          console.log(res);
          this.$toast.success("Update Tax Success!!", {
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
          this.getTax();
        })
        .catch((err) => {
          this.is_save = false;
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
  padding: 6px;
  z-index: 9;
}
.circle-box img {
  width: 45px;
}
.right-position-content {
  top: 0.3rem;
  font-size: 17px;
  right: 12px;
  position: absolute;
}
</style>
