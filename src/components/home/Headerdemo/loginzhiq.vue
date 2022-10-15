<template>
    <div>
            <div class="log" @click="register()">注册</div>
            <div class="log" @click="login()">登录</div>
    </div>
</template>

<script>
export default {
    name: 'HeaderdemoLoginzhiq',
    data() {
        return {
        }
    },
    components: {
    },
    created() {
    },
    methods: {
        register() {
            this.$router.push('/register')
        },
        login() {
            this.$router.push('/login')
        }
    }
}
</script>


<style scoped>
.log {
    float: right;
    width: 50px;
}

.log {
    width: 50px;
    float: right;
}

.log:hover {
    width: 50px;
    float: right;
    text-align: center;
    font-size: large;
    color: burlywood;
}
</style>
