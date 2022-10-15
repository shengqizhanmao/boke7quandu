<template>
    <div class="article">
        <el-card style="height: 500px;width: 900px">
        <div>
        <el-menu
                default-active="2"
                class="el-menu"
                unique-opened="true"
        >
            <el-menu-item index="1-0" class="el-menu-title">个人中心</el-menu-item>
            <div class="title"></div>
            <el-menu-item index="1-1" class="el-menu-demo" @click="getMyUser()">我的信息</el-menu-item>
            <el-menu-item index="1-2" class="el-menu-demo" @click="getMyAvatar()">我的头像</el-menu-item>
            <el-menu-item index="1-4" class="el-menu-demo" @click="getMyArticle()">我的文章</el-menu-item>
        </el-menu>
        </div>
            <div class="MyUser-class">
                <router-view></router-view>
            </div>
        </el-card>
    </div>

</template>

<script>
import {Document, Menu , Location, Setting,} from '@element-plus/icons-vue';
export default {
    name: 'MyCenter',
    data() {
            return {
            }
        },
        components: {Document, Menu, Location, Setting},
        created() {
        },
        methods: {
            getMyUser(){
                this.$router.push('/my/myUser')
            },
            getMyAvatar(){
                this.$router.push('/my/myAvatar')
            },
            getMyArticle(){
                this.$router.push('/my/myArticle')
            }
        }
    }

</script>
<style scoped>
    .article{
        float: left;
        width: 1300px;
        padding-left: 200px;
        padding-top:100px;
        background-color: rgba(245, 245, 245, 0.762);
    }
    .el-menu{
        width: 150px;
        float: left;
    }
    .el-menu-title{
        background-color: #fafafa;
    }
    .el-menu-demo{
        background-color: #c4c4c4;
    }
    .MyUser-class{
        float: left;
    }
    .title{
        position: relative;
        text-align: center;
        overflow: hidden;
        font-size: 14px;
        color: #999;
    }
    .title::before,.title::after{
        content: '';
        display: inline-block;
        width: 100%;
        height: 1px;
        position: absolute;
        background: #ccc;
        top: 50%;
    }
    .title::before{
        margin-left: -10px;
        transform: translateX(-100%);
    }
    .title::after{
        margin-left: 10px;
    }
</style>