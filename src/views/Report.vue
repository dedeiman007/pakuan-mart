<template>
  <div class="w-100 bd-highlight">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="box radius-lg p-box position-relative">
          <div class="d-flex align-items-center mb-4">
            <div>
              <div class="mb-0 fw-bold size-24">Report List</div>
              <div class="text-gray">See All Report List</div>
            </div>
            <div class="ms-auto">
              <button
                class="btn btn-primary btn-lg px-4"
                @click="generatePDF()"
              >
                Export to Pdf
              </button>
            </div>
          </div>
          <div class="row" v-if="transactions.length > 0">
            <div class="col-md-12">
              <div class="box no-shadow border-gray">
                <div class="d-flex">
                  <div>
                    <h3 class="mb-0 capitalize">{{ profile_data.name }}</h3>
                    <div class="text-gray mb-3">
                      ({{ moment().format("DD MMMM YYYY") }})
                    </div>
                  </div>
                  <div class="ms-auto mt-1">
                    <img src="../assets/logo-univ.png" width="55" alt="" />
                  </div>
                </div>
                <div
                  class="box mt-3 p-3"
                  v-for="(data, index) in transactions"
                  :key="index"
                >
                  <div class="d-flex">
                    <div>
                      <div class="fw-bold capitalize size-16 text-dark">
                        {{ data.code }}
                      </div>
                      <div class="d-flex align-items-center w-100">
                        <div class="size-12 text-gray me-3">
                          Tax:
                          {{ currencyFormat((data.total * data.tax) / 100) }}
                        </div>
                        <div class="size-12 text-gray me-3">
                          Service:
                          {{
                            currencyFormat((data.total * data.service) / 100)
                          }}
                        </div>
                        <div class="size-12 text-gray me-3">
                          Total:
                          {{ currencyFormat(data.total) }}
                        </div>
                        <div class="size-12 text-gray me-3">
                          Sub Total:
                          {{ currencyFormat(data.sub_total) }}
                        </div>
                      </div>
                    </div>
                    <div class="ms-auto size-12 text-gray">
                      {{ moment(data.created_at).format("DD MMM YYYY") }}
                    </div>
                  </div>
                </div>
              </div>
              <vue-html2pdf
                :show-layout="false"
                :float-layout="true"
                :enable-download="false"
                :preview-modal="true"
                filename="nightprogrammerpdf"
                :pdf-quality="2"
                :manual-pagination="true"
                pdf-format="a4"
                :pdf-margin="10"
                pdf-orientation="portrait"
                pdf-content-width="750px"
                @progress="onProgress($event)"
                ref="html2Pdf"
              >
                <section slot="pdf-content">
                  <div class="p-print">
                    <div class="box no-shadow border-gray">
                      <div class="d-flex">
                        <div>
                          <h3 class="mb-0 capitalize">
                            {{ profile_data.name }}
                          </h3>
                          <div class="text-gray mb-3">
                            ({{ moment().format("DD MMMM YYYY") }})
                          </div>
                        </div>
                        <div class="ms-auto mt-1">
                          <img
                            src="../assets/logo-univ.png"
                            width="55"
                            alt=""
                          />
                        </div>
                      </div>
                      <div
                        class="box no-shadow border-gray mt-2 p-3"
                        v-for="(data, index) in transactions"
                        :key="index"
                      >
                        <div class="d-flex">
                          <div>
                            <div class="fw-bold capitalize size-16 text-dark">
                              {{ data.code }}
                            </div>
                            <div class="d-flex align-items-center w-100">
                              <div class="size-12 text-gray me-3">
                                Tax:
                                {{
                                  currencyFormat((data.total * data.tax) / 100)
                                }}
                              </div>
                              <div class="size-12 text-gray me-3">
                                Service:
                                {{
                                  currencyFormat(
                                    (data.total * data.service) / 100
                                  )
                                }}
                              </div>
                              <div class="size-12 text-gray me-3">
                                Total:
                                {{ currencyFormat(data.total) }}
                              </div>
                              <div class="size-12 text-gray me-3">
                                Sub Total:
                                {{ currencyFormat(data.sub_total) }}
                              </div>
                            </div>
                          </div>
                          <div class="ms-auto size-12 text-gray">
                            {{ moment(data.created_at).format("DD MMM YYYY") }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="html2pdf__page-break"
                    :key="profile_data.name"
                  ></div>
                </section>
              </vue-html2pdf>
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
import VueHtml2pdf from "vue-html2pdf";

export default {
  components: {
    VueHtml2pdf,
  },
  name: "ReportPage",
  props: ["profile_data"],
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
    generatePDF() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
};
</script>

<style scoped>
.p-box {
  padding: 32px;
}
.p-print {
  padding: 40px;
  padding-right: 0px !important;
}
</style>
