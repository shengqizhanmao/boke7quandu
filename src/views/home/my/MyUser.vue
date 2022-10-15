<template>
    <div class="my-user">
        <div class="my-user-title">
            我的信息
        </div>
        <el-form
                ref="userRef"
                label-width="100px"
                :model="user"
                style="max-width: 460px"
                :rules="UserRules"
        >
                    <div class="my-user-username">
                        账号名:
                            <div class="my-user-username-div">{{user.username}}</div>
                    </div>
            <el-form-item :rules="UserRules.nickname" prop="nickname" label="用户名" style="clear: both;padding-top: 40px">
                <el-input v-model="user.nickname" />
            </el-form-item>
            <el-form-item :rules="UserRules.email" prop="email" label="邮箱" style="padding-top: 20px" disabled="true">
                <el-input v-model="user.email" />
            </el-form-item>
        </el-form>
        <div class="my-user-button">
            <el-button @click="dialogFormUpdateUserEmailFun(user.email)">更改邮箱</el-button>
            <el-button @click="postUpdateUser()">保存</el-button>
        </div>
        <div class="my-user-password-button">
            <el-button @click="dialogFormUserPassword=true">修改密码</el-button>
        </div>
<!--  修改密码      -->
        <el-dialog v-model="dialogFormUserPassword" title="修改密码" width="500px">
            <el-form :model="UserUpdatePasswordParam" :rules="UserPasswordRules" ref="passwordRef">
                <el-form-item :rules="UserPasswordRules.password" prop="password" label="旧密码" label-width="100px">
                    <el-input type="password" v-model="UserUpdatePasswordParam.password" autocomplete="off" />
                </el-form-item>
                <el-form-item :rules="UserPasswordRules.xpassword" prop="xpassword" label="新密码" label-width="100px">
                    <el-input type="password" v-model="UserUpdatePasswordParam.xpassword" autocomplete="off" />
                </el-form-item>
            </el-form>
            <el-button  @click="">忘记密码</el-button>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="postUpdateUserPassword()">修改</el-button>
        <el-button type="primary" @click="dialogFormUserPassword = false">退出</el-button
        >
      </span>
            </template>
        </el-dialog>
<!--    修改邮箱    -->
        <el-dialog v-model="dialogFormUpdateUserEmail" title="修改邮箱" width="500px">
            <el-form :model="UserUpdateUserEmailParam" :rules="UserEmailRules" ref="emailRef">
                <el-form-item :rules="UserEmailRules.email" prop="email" label="旧邮箱" label-width="100px">
                    <el-input  v-model="UserUpdateUserEmailParam.email" autocomplete="off" disabled="true"/>
                </el-form-item>
                <el-form-item :rules="UserEmailRules.xemail" prop="xemail" label="新邮箱" label-width="100px">
                    <el-input  v-model="UserUpdateUserEmailParam.xemail" autocomplete="off" />
                </el-form-item>
                <el-form-item :rules="UserEmailRules.code" label="验证码" prop="code" label-width="100px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-input v-model="UserUpdateUserEmailParam.code"  >
                            </el-input>
                        </el-col>
                        <el-col :span="12" >
                            <div v-if="codeSwitch">
                                <el-button type="success" size="small" @click="stopGetCode()" >发送验证码</el-button>
                            </div>
                            <div v-else>
                                <el-button type="info" disabled="true">{{codeGetTimeout}}秒</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <el-button  @click="">忘记密码</el-button>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="postUpdateUserPassword()">修改</el-button>
        <el-button type="primary" @click="dialogFormUserPassword = false">退出</el-button
        >
      </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "MyUser",
        data() {
            let emailPattern=(rule,value,callback)=>{
                let emailDreg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
                if(!emailDreg.test(value)){
                    callback(new Error("邮箱格式不对,如:xxx@163.com"))
                }else{
                    callback();
                }};
            return {
                codeSwitch:true,
                codeGetTimeout:60,
                dialogFormUpdateUserEmail:false,  //修改文章功能
                user:'',
                dialogFormUserPassword:false,
                UserUpdatePasswordParam:{
                    password:'',
                    xpassword:''
                },
                UserUpdateUserEmailParam:{
                    email:'',
                    xemail:'',
                    code:''
                },
                UserEmailRules: {
                    email:[
                        {required: true, message: '邮箱不能为空'},
                        {validator:emailPattern,trigger: 'blur'}
                    ],
                    xemail:[
                        {required: true, message: '邮箱不能为空'},
                        {validator:emailPattern,trigger: 'blur'}
                    ],
                    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
                },
                UserRules:{  //进行规则效验
                    nickname:[
                        {required: true, message: '名称不能为空'},
                    ],
                    email:[
                        {required: true, message: '邮箱不能为空'},
                        {validator:emailPattern,trigger: 'blur'}
                    ],
                },
                UserPasswordRules:{
                    password:[
                        {required: true, message: '密码不能为空'},
                        {pattern: /^[a-zA-Z]\w{5,17}$/, message: "字母开头,请输入数字或者字母,6-18位", trigger: "blur"}
                    ],
                    xpassword:[
                        {required: true, message: '密码不能为空'},
                        {pattern: /^[a-zA-Z]\w{5,17}$/, message: "字母开头,请输入数字或者字母,6-18位", trigger: "blur"}
                    ],
                }

            }
        },
        components: {},
        created() {
            this.getMyUser();
        },
        methods: {
            dialogFormUpdateUserEmailFun(eamil){
                this.UserUpdateUserEmailParam.email=eamil;
                this.dialogFormUpdateUserEmail=true
            },
            async stopGetCode(){
                await this.$refs["emailRef"].validateField("email", async v => {
                    if (!v) return
                    this.codeSwitch = false;
                    const {data: res} = await this.$http.post('/getEmailCode', this.UserUpdateUserEmailParam)
                    if (res.success === false){
                        this.codeSwitch=true;
                        return this.$message.error(res.msg)
                    }
                    this.$message.success(res.msg)
                    var times = setInterval(() => {
                        this.codeGetTimeout--; //递减
                        if (this.codeGetTimeout <= 0) {
                            // <=0 变成获取按钮
                            this.codeSwitch = true;
                            clearInterval(times);
                        }
                    }, 1000);
                })
            },
            async postUpdateUserEmail(){
                await this.$refs["emailRef"].validate( async v => {
                    if (!v) return
                    const {data: res} = await this.$http.post('/getEmailCode', this.UserUpdateUserEmailParam)
                    if (res.success === false) return this.$message.error(res.msg)
                    this.$message.success(res.msg);
                    this.dialogFormUpdateUserEmail=false
                })
            },
            async getMyUser(){
                const { data: res } = await this.$http.get('/user/getUser')
                // console.log(res)
                if (res.success === false) return this.$message.error(res.msg)
                this.user=res.data
                console.log(this.user)
            },
            async postUpdateUser(){
                this.$refs["userRef"].validate(async(valid) => {  //进行规则效验
                    if(valid){
                        const { data: res } = await this.$http.post('/user/updateUser',this.user)
                        // console.log(res)
                        if (res.success === false) return this.$message.error(res.msg)
                        return this.$message.success(res.msg);
                    }
                })
                // console.log(this.user)
            },
            async postUpdateUserPassword(){
                this.$refs["passwordRef"].validate(async(valid) => { //进行规则效验
                    if(valid){
                        const { data: res } = await this.$http.post('/user/setUserPassword',this.UserUpdatePasswordParam)
                        if (res.success === false) return this.$message.error(res.msg)
                        this.$message.success(res.msg);
                        this.dialogFormUserPassword=false
                    }
                })
            }
        }
    }
</script>

<style scoped>
.my-user{
    padding-left: 40px;
}
    .my-user-title{
        float: left;
        padding-left: 20px;
        color: #79b0ff;
        font-size: 20px;
    }
    .my-user-username{
        clear: both;
        float: left;
        padding-left: 40px;
        padding-top: 40px;
    }
    .my-user-username-div{
        padding-left: 40px;
        float: right;
    }
    .my-user-nickname{
        clear: both;
        float: left;
        padding-left: 40px;
        padding-top: 40px;
    }
    .my-user-nickname-div{
        padding-left: 40px;
        float: right;
    }
    .my-user-email{
        padding-left: 40px;
        clear: both;
        float: left;
        padding-top: 40px;
    }
    .my-user-email-div{
        padding-left: 40px;
        float: right;
    }
    .my-user-button{
        clear: both;
        float: left;
        padding-left: 40px;
        padding-top: 40px;
    }
    .my-user-password-button{
        float: left;
        padding-left: 40px;
        padding-top: 40px;
    }
</style>