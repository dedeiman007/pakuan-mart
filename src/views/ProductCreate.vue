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
          <div class="mb-0 fw-bold size-24">Manage Product</div>
          <div class="text-gray">Create your Product Setting!!</div>
          <div class="row">
            <div class="col-md-6 mt-3">
              <label class="mb-1 fw-semibold">Product Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Product Name"
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
            <div class="col-md-6 mt-3">
              <label class="mb-1 fw-semibold">Category Name</label>
              <select
                class="form-control form-select"
                v-model="req.category_id"
              >
                <option value="">Select Category</option>
                <template v-for="(category, index) in categories">
                  <option :value="category.id" :key="index">
                    {{ category.name }}
                  </option>
                </template>
              </select>
              <div>
                <small
                  class="text-danger size-12"
                  v-if="validation_errors['category_id']"
                >
                  {{ validation_errors.category_id[0] }}
                </small>
              </div>
            </div>
            <div class="col-md-6 mt-2">
              <label class="mb-1 fw-semibold">Stock</label>
              <money
                v-model="req.stock"
                v-bind="decimal"
                class="form-control"
              />
              <div>
                <small
                  class="text-danger size-12"
                  v-if="validation_errors['stock']"
                >
                  {{ validation_errors.stock[0] }}
                </small>
              </div>
            </div>
            <div class="col-md-6 mt-2">
              <label class="mb-1 fw-semibold">Price</label>
              <money
                v-model="req.price"
                v-bind="priceFormat"
                class="form-control"
              />
              <div>
                <small
                  class="text-danger size-12"
                  v-if="validation_errors['price']"
                >
                  {{ validation_errors.price[0] }}
                </small>
              </div>
            </div>
            <div class="col-md-12 mt-2">
              <label class="mb-1 fw-semibold">Expired Date</label>
              <date-picker
                type="date"
                v-model="req.expired_date"
                value-type="format"
                format="YYYY-MM-DD"
                :clearable="false"
                placeholder="Expired Date"
              >
              </date-picker>
              <div>
                <small
                  class="text-danger size-12"
                  v-if="validation_errors['expired_date']"
                >
                  {{ validation_errors.expired_date[0] }}
                </small>
              </div>
            </div>
            <div class="col-md-12 mt-2">
              <div>
                <label class="mb-1 fw-semibold">Product Image</label>
              </div>
              <label type="file" :class="!imagePhoto ? 'upload__btn' : ''">
                <img v-if="imagePhoto" class="photo" :src="productPictureUrl" />
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
              <div>
                <small
                  class="text-danger size-12"
                  v-if="validation_errors['images']"
                >
                  {{ validation_errors.images[0] }}
                </small>
              </div>
            </div>
            <div class="col-md-12 mt-2">
              <label class="mb-1 fw-semibold">Description</label>
              <textarea id="description"></textarea>
              <div>
                <small
                  class="text-danger size-12"
                  v-if="validation_errors['description']"
                >
                  {{ validation_errors.description[0] }}
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
import { Money } from "v-money";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import noImage from "../assets/no-photo.png";
import Api from "../api/Api";
import $ from "jquery";

export default {
  components: {
    Money,
    DatePicker,
  },
  name: "ProfilePage",
  data() {
    return {
      req: {
        name: "",
        stock: "",
        price: "",
        expired_date: "",
        description: "",
        category_id: "",
        photo: "",
      },
      decimal: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 0,
        masked: false,
      },
      priceFormat: {
        decimal: ",",
        thousands: ".",
        prefix: "Rp",
        suffix: "",
        precision: 0,
        masked: false,
      },
      imagePhoto: "",
      is_save: false,
      validation_errors: [],
      categories: [],
    };
  },
  created() {
    this.getCategories();
  },
  mounted() {
    $("#description").summernote({
      placeholder: "Description",
      tabsize: 2,
      height: 230,
    });
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
    storeData() {
      var description = $("#description").summernote("code");
      var data = new FormData();
      data.append("name", this.req.name);
      data.append("stock", this.req.stock);
      data.append("price", this.req.price);
      data.append("expired_date", this.req.expired_date);
      data.append("category_id", this.req.category_id);
      data.append("description", description);
      if (this.req.photo) {
        data.append("images[]", this.req.photo);
      }

      this.is_save = true;

      Api.post("product", data, {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          this.is_save = false;
          console.log(res);
          this.$toast.success("Create Product Success!!", {
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
          setTimeout(() => (window.location.href = "/product"), 1500);
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
    getCategories() {
      Api.get(`/categoryproduct`)
        .then((res) => {
          var data = res.data.data;
          this.categories = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    productPictureUrl() {
      return this.imagePhoto.length > 0 ? this.imagePhoto : noImage;
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
</style>
