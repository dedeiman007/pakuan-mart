<template>
  <div class="w-100 bd-highlight">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="mb-3">
          <a href="/product" class="text-gray size-16">
            <i class="fa fa-angle-left me-1"></i>
            Back
          </a>
        </div>
        <div class="box radius-lg p-box position-relative">
          <div class="circle-box">
            <center>
              <img src="../assets/file-plus.png" alt="" />
            </center>
          </div>
          <div class="mb-0 fw-bold size-24">Manage Category</div>
          <div class="text-gray">Create your Category Setting!!</div>
          <div class="row">
            <div class="col-md-12 mt-3">
              <label class="mb-1 fw-semibold">Category Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Category Name"
                v-model="req.name"
              />
              <div>
                <small
                  class="text-danger size-12"
                  v-if="validation_errors['name']"
                >
                  {{ validation_errors.name[0] }}
                </small>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <button class="btn btn-primary btn-lg w-100" @click="storeData()">
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
              <template v-else> Save </template>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../api/Api";

export default {
  components: {},
  name: "CategoryPage",
  data() {
    return {
      req: {
        name: "",
      },
      is_save: false,
      validation_errors: [],
    };
  },
  methods: {
    storeData() {
      var data = {
        name: this.req.name,
      };

      this.is_save = true;

      Api.post("categoryproduct", data, {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          this.is_save = false;
          console.log(res);
          this.$toast.success("Create Category Success!!", {
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
          setTimeout(() => (window.location.href = "/product-category"), 1500);
        })
        .catch((err) => {
          this.is_save = false;
          if (err.response.data.data) {
            this.validation_errors = err.response.data.data;
          } else {
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
            this.validation_errors = [];
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
  padding: 11px;
  z-index: 9;
}
.circle-box img {
  width: 40px;
}
</style>
