<template>
    <div>
        <div class="my-avatar-title">
        这个是头像
        </div>
        <div class="my-avatar-uploader">
        <el-upload
                class="avatar-uploader"
                action="http://localhost:8085/user/setUserAvatar"
                :show-file-list="false"
                :headers="this.myHeaders"
                :with-credentials="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
        >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <img v-else-if="avatar" :src="avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import { ElMessage } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'
    export default {
        name: "MyAvatar",
        data() {
            return {
                imageUrl:'',
                myHeaders: {Authorization:window.sessionStorage.getItem('token')},
                avatar:''
            }
        },
        components: {
            Plus,ElMessage,ref
        },
        created() {
            this.getAvatar()
        },
        methods: {
            async getAvatar(){
                const { data: res } = await this.$http.get('/user/getUserAvatar')
                if (res.success === false) return this.$message.error(res.msg)
                this.avatar=res.data;
            },
            handleAvatarSuccess(res, file){
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log(res.msg)
                if (res.success === false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
            },
            beforeAvatarUpload(file){
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                }
                return isJPG && isLt2M;
            },

        },

    }
</script>

<style scoped>
    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
    .my-avatar-title{
        float: left;
        padding-left: 60px;
        color: #79b0ff;
        font-size: 20px;
    }
    .my-avatar-uploader{
        clear: both;
        float: left;
        padding-left: 40px;
        padding-top: 40px;

    }
</style>