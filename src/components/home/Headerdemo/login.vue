<template>
    <div>
        <div class="log">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar :src="avatar" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="getMyCenter()">个人信息</el-dropdown-item>
                        <el-dropdown-item @click="getFriend()">好友</el-dropdown-item>
                        <el-dropdown-item>
                            <el-popconfirm title="你确定退出吗" confirm-button-text="确定退出" cancel-button-text="取消退出"
                                @confirm="logout()" @cancel="cancelEvent()">
                                <template #reference>
                                    退出
                                </template>
                            </el-popconfirm>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { ElMessageBox } from 'element-plus'
export default {
    name: 'HeaderdemoLogin',
    data() {
        return {
            user: {},
            avatar:''
        }
    },
    components: {
        ElMessageBox
    },
    created() {
        this.user = JSON.parse(window.sessionStorage.getItem("user"));
        // console.log(this.user.data.avatar)
        this.getAvatar()
    },
    methods: {
        async logout() {
            const { data: res } = await this.$http.get('/logout')
            if (res.success === false) return this.$message.error(res.msg)
            let storage = window.sessionStorage;
            storage.removeItem("token");
            storage.removeItem("user");
            // let cookies = window.$cookies;
            // cookies.remove("token");
            // cookies.remove("user");
            this.$message.success(res.msg)
            // ElMessageBox.alert('退出登录成功')
            await this.$router.push('/login'); //跳回登录地址
        },
        async getAvatar(){
            const { data: res } = await this.$http.get('/user/getUserAvatar')
            if (res.success === false) return this.$message.error(res.msg)
            this.avatar=res.data;
        }
        ,
        cancelEvent() {
            this.$message.success("取消成功")
        },
        getMyCenter() {
            // this.$router.push('/login')
            this.$router.push('/my');
        },
        getFriend(){
            this.$router.push('/friend');
        }
    }
}
</script>


<style scoped>
/* .log {
    float: right;
    width: 100px;
} */

.log {
    float: right;
    width: 300px;
}

/* .log:hover {
    width: 50px;
    float: right;
    text-align: center;
    font-size: large;
    color: burlywood;
} */
</style>
