<template>
  <div class="container">
    <!-- <notifications group="foo" position="top right" /> -->
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="box radius-login mt-box-login p-5">
          <center>
            <img src="../assets/logo-univ.png" width="70" alt="" />
          </center>
          <h3 class="mb-0 fw-bold text-center mt-3">Pakuan Mart</h3>
          <div class="text-center text-gray mt-1">
            Sign Up to Create Account
          </div>
          <div class="mt-4">
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              v-model="name"
              autofocus
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
          <div class="mt-2">
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              v-model="email"
            />
            <div>
              <small
                class="text-danger size-12"
                v-if="validation_errors['email']"
              >
                {{ validation_errors.email[0] }}
              </small>
            </div>
          </div>
          <div class="mt-2">
            <input
              type="number"
              class="form-control"
              placeholder="Phone Number"
              v-model="phone"
            />
            <div>
              <small
                class="text-danger size-12"
                v-if="validation_errors['phone']"
              >
                {{ validation_errors.phone[0] }}
              </small>
            </div>
          </div>
          <div class="mt-2">
            <date-picker
              type="date"
              v-model="date_of_birth"
              value-type="format"
              format="YYYY-MM-DD"
              :clearable="false"
              placeholder="Birth Date"
            />
            <div>
              <small
                class="text-danger size-12"
                v-if="validation_errors['date_of_birth']"
              >
                {{ validation_errors.date_of_birth[0] }}
              </small>
            </div>
          </div>
          <div class="mt-2">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <div>
              <small
                class="text-danger size-12"
                v-if="validation_errors['password']"
              >
                {{ validation_errors.password[0] }}
              </small>
            </div>
          </div>
          <div class="mt-2">
            <input
              type="password"
              class="form-control"
              placeholder="Confirm Password"
              v-model="confirm_password"
            />
            <div>
              <small
                class="text-danger size-12"
                v-if="validation_errors['confirm_password']"
              >
                {{ validation_errors.confirm_password[0] }}
              </small>
            </div>
          </div>
          <div class="mt-4">
            <button
              class="btn btn-primary w-100"
              :disabled="is_load"
              @click="register()"
            >
              <template v-if="is_load == true">
                <div class="d-flex align-items-center justify-content-center">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span class="ms-1">Loading...</span>
                </div>
              </template>
              <template v-else> Sign Up </template>
            </button>
          </div>
          <div class="mt-2 text-center text-gray">Or</div>
          <div class="mt-2">
            <a href="/" class="btn btn-outline-primary w-100">Login</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import Api from "../api/Api";

export default {
  components: {
    DatePicker,
  },
  name: "SignUpPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      date_of_birth: "",
      phone: "",
      role_id: 1,
      validation_errors: [],
      is_load: false,
    };
  },
  created() {
    console.log(this.$route.fullPath);
  },
  methods: {
    register() {
      this.is_load = true;
      var role_id = 0;
      if (this.$route.fullPath.includes("user")) {
        role_id = 2;
      } else if (this.$route.fullPath.includes("admin")) {
        role_id = 1;
      }
      var data = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
        date_of_birth: this.date_of_birth,
        phone: this.phone,
        role_id: role_id,
      };
      Api.post(`/register`, data)
        .then((res) => {
          console.log(res);
          this.is_load = false;
          this.$toast.success("Sign Up Success!!", {
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
          setTimeout(() => (window.location.href = "/"), 1500);
        })
        .catch((err) => {
          this.is_load = false;
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
            this.validation_errors = [];
          }
        });
    },
  },
};
</script>

<style scoped>
.radius-login {
  border-radius: 10px;
}
.mt-box-login {
  margin-top: 70px;
}
</style>
