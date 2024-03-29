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
          <div class="d-flex align-items-center">
            <div>
              <div class="mb-0 fw-bold size-24">List Product</div>
              <div class="text-gray">Manage List All Product</div>
            </div>
          </div>
          <div class="d-flex align-items-center mt-4">
            <div class="position-relative">
              <input
                type="text"
                class="form-control form-control-lg pl-search w-search"
                placeholder="Search"
                v-model="search"
              />
              <span class="search-icon left">
                <i class="fa fa-search"></i>
              </span>
            </div>
            <div class="ms-auto">
              <a href="/create-product" class="btn btn-primary btn-lg px-4"
                >Create Product</a
              >
            </div>
          </div>
          <div class="mt-4" v-if="is_load">
            <ListLoader />
          </div>
          <div class="table-responsive-custom" v-else>
            <table class="table table-bordered mt-4">
              <thead class="table-light">
                <tr>
                  <th class="text-center" style="width: 40px" scope="col">
                    No
                  </th>
                  <th class="text-center" scope="col">Product Name</th>
                  <th class="text-center" scope="col">Qty</th>
                  <th class="text-center" scope="col">Price</th>
                  <th class="text-center" scope="col">Expired Date</th>
                  <th class="text-center" scope="col">Product Image</th>
                  <th class="text-center" scope="col">Description</th>
                  <th class="text-center" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in filterDataList" :key="index">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td>{{ data.name }}</td>
                  <td>{{ decimalFormat(data.stock) }}Pcs</td>
                  <td>{{ currencyFormat(data.price) }}</td>
                  <td>
                    {{ moment(data.expired_date).format("DD MM YYYY") }}
                  </td>
                  <td>
                    <center>
                      <img
                        :src="data.images[0].image"
                        class="img-product-small"
                        alt=""
                      />
                    </center>
                  </td>
                  <td>
                    <div class="tag-html" v-html="data.description"></div>
                  </td>
                  <td>
                    <center>
                      <a :href="`/edit-product/${data.id}`" class="me-2">
                        <i class="fa fa-pencil"></i>
                      </a>
                      <a
                        href="javascript:void(0)"
                        @click="deleteProduct(data.id)"
                        class="text-danger"
                      >
                        <i class="fa fa-trash"></i>
                      </a>
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="filterDataList.length == 0">
              <center>
                <div class="mt-4">
                  <img src="../assets/no-data.png" width="60" alt="" />
                  <div class="size-16 fw-medium mt-2 text-gray">No Result</div>
                </div>
              </center>
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
import ListLoader from "../components/ListLoader.vue";

export default {
  components: {
    ListLoader,
  },
  name: "ProductPage",
  data() {
    return {
      moment: moment,
      products: [],
      is_load: false,
      search: "",
    };
  },
  created() {
    this.getProduct();
  },
  computed: {
    filterDataList() {
      return this.products.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    getProduct() {
      this.is_load = true;
      Api.get(`/product`)
        .then((res) => {
          var data = res.data.data;
          this.products = data;
          this.is_load = false;
        })
        .catch((err) => {
          console.log(err);
          this.is_load = false;
        });
    },
    deleteProduct(id) {
      Api.delete(`/product/${id}`, {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.getProduct();
          this.$toast.success("Delete Product Success!!", {
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
.table-responsive-custom {
  overflow-x: auto;
}
.table-responsive-custom table tbody tr td {
  white-space: nowrap;
}
.table-responsive-custom table thead tr th {
  white-space: nowrap;
}
th {
  border-color: #e8e8e9;
  padding: 10px !important;
}
tr {
  border-color: #e8e8e9;
  padding: 10px !important;
}
td {
  padding: 10px !important;
}
.table-light {
  background-color: #f7f7f7 !important;
  --bs-table-border-color: #f7f7f7 !important;
  --bs-table-bg: #f7f7f7 !important;
}
</style>
