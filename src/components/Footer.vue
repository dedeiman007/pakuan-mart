<template>
    <footer>
        <div class="container">
            <img src="../assets/footer-logo.png" class="footer-logo" alt="">
            <div class="row">
                <div class="col-md-4">
                    <div>
                        <img src="../assets/logo.png" width="190" alt="">
                    </div>
                    <div class="mt-4 size-14 fw-medium">
                        <i class="fa fa-map-marker me-2"></i>
                        {{ datas.address }}
                    </div>
                    <div class="mt-4">
                        <a :href="datas.map_link" target="_blank" class="btn btn-primary btn-sm px-4">
                            <i class="fa fa-map-marker me-2"></i>
                            Open In Map
                        </a>
                    </div>
                </div>
                <div class="col-md-4 z-index-9 m-mt-3">
                    <div class="fw-ekstra-bold size-20">
                        Hubungi Kami
                    </div>
                    <div class="mt-4">
                        <div class="size-14 fw-medium">
                            <i class="fa fa-phone me-2"></i>
                            {{ datas.phone_number }}
                        </div>
                    </div>
                    <div class="mt-2">
                        <div class="size-14 fw-medium">
                            <i class="fa fa-whatsapp me-2"></i>
                            {{ datas.mobile_number }}
                        </div>
                    </div>
                    <div class="mt-2">
                        <div class="size-14 fw-medium">
                            <i class="fa fa-envelope me-2"></i>
                            {{ datas.email }}
                        </div>
                    </div>
                    <div class="mt-3">
                        <a :href="datas.facebook" target="_blank" class="me-3 text-dark" v-if="datas.facebook">
                            <i class="fa fa-facebook"></i>
                        </a>
                        <a :href="datas.instagram" target="_blank" class="me-3 text-dark" v-if="datas.instagram">
                            <i class="fa fa-instagram"></i>
                        </a>
                        <a :href="datas.twitter" target="_blank" class="me-3 text-dark" v-if="datas.twitter">
                            <i class="fa fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    import Api from '../api/Api';
    
    export default {
        name: 'Footer',
        data() {
            return {
                datas: {}
            }
        },
        created(){
            this.getDatas()
        },
        methods: {
            getDatas(){
                Api.get(`/company`)
                .then((res)=>{
                    var data = res.data.data
                    this.datas = data
                })
                .catch(err => {
                    console.log(err)
                });
            },
        }
    }
</script>

<style scoped>
</style>