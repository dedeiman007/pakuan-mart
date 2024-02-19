<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="box radius-login mt-box-login p-5">
          <center>
            <img src="../assets/logo-univ.png" width="70" alt="" />
          </center>
          <h3 class="mb-0 fw-bold text-center mt-3">Pakuan Mart</h3>
          <div class="text-center text-gray mt-1">Log in to continue</div>
          <div class="mt-4">
            <input
              type="email"
              class="form-control"
              autofocus
              placeholder="Email"
              v-model="email"
            />
            <div>
              <small
                class="text-danger size-12"
                v-if="validation_errors.length != 0"
              >
                {{ validation_errors.email[0] }}
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
          <div class="mt-4">
            <button class="btn btn-primary w-100" @click="Login()">
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
              <template v-else> Login </template>
            </button>
          </div>
          <div class="mt-2 text-center text-gray">Or</div>
          <div class="mt-2">
            <a href="/user/sign-up" class="btn btn-outline-primary w-100"
              >Sign Up</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../api/Api";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      validation_errors: [],
      is_load: false,
    };
  },
  methods: {
    Login() {
      this.is_load = true;
      var data = {
        email: this.email,
        password: this.password,
      };
      Api.post(`/login`, data)
        .then((res) => {
          console.log(res);
          this.is_load = false;
          this.$toast.success("Login Success!!", {
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
          setTimeout(() => (window.location.href = "/dashboard"), 1500);
          localStorage.setItem("token", res.data.data.remember_token);
          localStorage.setItem("user_id", res.data.data.id);
          localStorage.setItem("name", res.data.data.name);
          localStorage.setItem("role_name", res.data.data.role_name);
        })
        .catch((err) => {
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
          this.is_load = false;
          console.log(err.response);
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
