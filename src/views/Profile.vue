<template>
  <div class="w-100 bd-highlight">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="box radius-lg p-box position-relative">
          <div class="circle-box">
            <center>
              <img src="../assets/user.png" alt="" />
            </center>
          </div>
          <div class="mb-0 fw-bold size-24">Setting Profile</div>
          <div class="text-gray">Create or Update your Profile Setting!!</div>
          <div class="mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              v-model="profile_data.name"
            />
          </div>
          <div class="mt-2">
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              v-model="profile_data.email"
              disabled
            />
          </div>
          <div class="mt-2">
            <input
              type="number"
              class="form-control"
              placeholder="Phone Number"
              v-model="profile_data.phone"
            />
          </div>
          <div class="mt-2">
            <date-picker
              type="date"
              v-model="profile_data.date_of_birth"
              value-type="format"
              format="YYYY-MM-DD"
              :clearable="false"
              placeholder="Birth Date"
            >
            </date-picker>
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
              <template v-else> Save or Update </template>
            </button>
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
  name: "ProfilePage",
  props: ["profile_data"],
  data() {
    return {
      req: {},
      is_save: false,
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    updateData() {
      var data = {
        name: this.profile_data.name,
        phone: this.profile_data.phone,
        date_of_birth: this.profile_data.date_of_birth,
      };

      this.is_save = true;

      Api.post(`/update/${this.profile_data.id}`, data, {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          this.is_save = false;
          console.log(res);
          this.$toast.success("Update Profile Success!!", {
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
          this.$emit("update-data-profile");
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
</style>
