<template>
    <div class="demo-Header">
        <!-- UI -->
        <div class="row1">博客前端</div>
        <el-divider direction="vertical" />
        <!-- 功能列表 -->
        <div class="row2">
            <div class="row2-2" v-for="(item, index) in Menu1" @key="item.id" :tabindex="index"
                @click="change(index, item.path)">
                {{ item.title }}
                <el-divider direction="vertical" />
            </div>
        </div>
        <div class="row2-3">
            <el-select style="width:100px" v-model="change22" clearable placeholder="其他">
                <el-option v-for="item in Menu2" :key="item.id" :label="item.title" :value="item.title"
                    @click="change(index, item.path)" />
            </el-select>
        </div>
        <!-- 搜索 -->
        <div class="row3">
            <el-input v-model="articlesMondel" size="default" clearable="true" placeholder="搜索文章" maxlength="20"
                :suffix-icon="Search" style="width:300px">
                <template #suffix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <!-- 登录注册 -->
        <div class="row4" v-if="token == null || user.success == false">
            <Loginzhiq></Loginzhiq>
<!--            <el-divider  style="border-style:solid solid solid solid;padding-top:50px;bottom:35px"  direction="horizontal" />-->
        </div>
        <div class="row4" v-else>
            <Login></Login>
        </div>
        <el-divider style="border-style: none none solid none ;padding-top: 10px;"  />
    </div>
</template>

<script>
// @ is an alias to /src
import { Search } from '@element-plus/icons-vue'
import Loginzhiq from './Headerdemo/loginzhiq.vue';
import Login from './Headerdemo/login.vue';


export default {
    name: 'Headerdemo',
    data() {
        return {
            size: 1,
            articlesMondel: '',
            Menu: {},
            Menu1: {},
            Menu2: {},
            change22: "",
            token: '',
            user: ''
        }
    },
    components: {
        Search,
        Loginzhiq,
        Login
    },
    created() {
        this.getMenu();
        this.getToken();
    },
    methods: {
        getToken() {
            this.token = sessionStorage.getItem("token");
            // this.token = window.$cookies.get("token");
            this.user = JSON.parse(sessionStorage.getItem("user"));
            // this.user = window.$cookies.get("user");
        },
        change(index, path) {
            console.log(path)
            if (index < 6) {
                this.change22 = ''
            }
            this.$router.push(path);
        },
        register() {
            this.$router.push('/register')
        },
        login() {
            this.$router.push('/login')
        },
        async getMenu() {
            let { data: res } = await this.$http.get('/menu/getAll')
            if (res.success === false) return this.$message.error(res.msg)
            this.Menu = res.data
            for (let i = 0; i <= this.Menu.length - 1; i++) {
                if (i < 6) {
                    this.Menu1[i] = this.Menu[i]
                } else {
                    this.Menu2[i] = this.Menu[i]
                }
            }
        }
    }
}
</script>
<style scoped>
.demo-Header {
    width: 1480px;
    height: 50px;
    background-color: rgb(255, 255, 255);
}

.row1 {
    float: left;
    width: 230px;
    /* background-color: aqua; */
    height: 50px;
    margin-top: 10px;
}

.row2 {
    float: left;
    width: 600px;
    /* background-color: rgb(255, 255, 255); */
    height: 50px;
}


.row3 {
    float: left;
    width: 200px;
    /* background-color: rgb(255, 255, 255); */
    text-align: center;
    margin-top: 5px;
}

.row4 {
    float: left;
    width: 300px;
    /* background-color: rgb(122, 32, 32); */
    height: 50px;
    margin-top: 5px;
}

.row2-2 {
    float: left;
    width: 100px;
    text-align: center;
    margin-top: 10px;
    height: 50px;
}

.row2-2:hover {
    float: left;
    height: 50px;
    width: 100px;
    text-align: center;
    font-size: large;
    color: burlywood;
}

.row2-2:focus {
    float: left;
    height: 50px;
    width: 100px;
    text-align: center;
    font-size: large;
    color: rgb(0, 38, 253);
}

.row2-3 {
    float: left;
    width: 150px;
    height: 50px;
    margin-top: 5px;
}

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
