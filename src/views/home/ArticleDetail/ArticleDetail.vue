<template>
    <div class="article">
        <div>
<!-- 1           标题-->
            <div>
                <div class="body-title-avatar" >
                        <el-avatar :size="40" @error="errorHandler">
                            <img :src="user.avatar"/>
                        </el-avatar>
                </div>
                <div class="body-title-body">{{ articles.title }}</div>
            </div>
<!-- 2          时间:观看人数:评论 -->
            <div style="clear:both">
                <div  class="body-author">
                    {{user.nickname}}
                </div>
                <div class="body-create-date" >
                    发布时间:{{articles.createDate}}
                </div>
                <div class="body-view-counts">
                    阅读:{{articles.viewCounts}}
                </div>
                <div class="body-comment-counts">
                    评论人数:{{articles.commentCounts}}
                </div>
            </div>
<!-- 3      文章内容      -->
            <el-button style="width: 100px" @click="contentGai=!contentGai">切换</el-button>
            <el-row style="clear:both">
                <el-col :span="3">
                </el-col>
                <el-col :span="18">
                    <el-card>
                        <div v-if="contentGai">
                            <md-editor v-model="body.content"  previewOnly showCodeRowNumber  />
                        </div>
                        <div v-else>
                            <div v-html="body.contentHtml"></div>
                        </div>

                    </el-card>
                </el-col>
                <el-col :span="3">
                </el-col>
            </el-row>
<!--            评论区空行-->
            <div style="height: 50px">
            </div>
<!--            评论区-->
            <div style="clear:both">
                <el-row style="clear:both">
                    <el-col :span="3">
                    </el-col>
                    <el-col :span="18">
                            <div class="div-comment">
                                评论区:
                                <div class="div-comment-pl">
                                    <div class="div-comment-pl-avatar">
                                        <el-avatar :size="40" @error="errorHandler">
                                            <img :src="user.avatar"/>
                                        </el-avatar>
                                    </div>
                                    <div class="div-comment-pl-input">
                                        <el-form :model="plIn" ref="formPlRef" >
                                            <el-form-item :rules="rules.plInup" prop="plInup" label="评论" label-width="100px">
                                                <el-input
                                                        v-model="plIn.plInup"
                                                        :rows="4"
                                                        type="textarea"
                                                        show-word-limit="true"
                                                        placeholder="评论"
                                                />
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                    <div class="div-comment-pl-button">
                                        <el-button class="div-comment-pl-button-div1" @click="postComment(formPlRef)">
                                            <div style="position: relative;left: 15px;bottom: 15px;">发</div>
                                            <div style="position: relative;left: 20px;bottom: 15px;">表</div>
                                            <div style="position: relative;left: -25px;top: 10px;">评</div>
                                            <div style="position: relative;left: -20px;top: 10px;">论</div>
                                        </el-button>
                                    </div>
                                </div> <!--    发表评论  -->
                                <div style="clear:both;;height: 20px" /> <!--  空行  -->
                                <div v-if="comments.length!=0">
                                <div class="father-comments"  v-for="(item, index) in comments" @key="item.id">
                                    <div>
                                        <div class="father-comments-div">
                                            <!--评论用户的头像 -->
                                            <div class="father-comments-avatar" >
                                                <el-avatar :size="40" @error="errorHandler">
                                                    <img :src="item.author.avatar"/>
                                                </el-avatar>
                                            </div>
                                        </div>
                                        <div class="father-comments-div2">
                                            <!--评论的用户名 -->
                                            <div class="father-comments-nickname">
                                                {{item.author.nickname}}:
                                            </div>
                                            <!--评论的内容 -->
                                            <div class="father-comments-content">
                                                {{item.content}}
                                            </div>
                                        </div>
                                        <div style="clear: both">
                                            <div class="father-comments-floor">
                                                第{{item.layer}}楼:
                                            </div>
                                            <div class="father-comments-createDate">
                                                {{item.createDate}}
                                            </div>
                                            <el-button class="father-comments-reply" text @click="reply(item.id,item.author.id)">
                                                    回复
                                            </el-button>
                                        </div>
                                        <div style="clear: both"  v-if="item.childrens.length!=0">
                                            <el-card body-style="background-color: rgba(245, 245, 245, 0.762);">
                                                <div class="child-comments" v-for="(item2, index2) in item.childrens" @key="item2.id">
                                                    <div class="child-comments-div">
                                                        <div class="child-comments-avatar" >
                                                            <el-avatar :size="40" @error="errorHandler">
                                                                <img :src="item2.author.avatar"/>
                                                            </el-avatar>
                                                        </div>
                                                    </div>
                                                    <div class="child-comments-div2">
                                                        <!--子评论的用户名 -->
                                                        <div class="child-comments-nickname">
                                                            {{item2.author.nickname}}  回复  @{{item2.toUser.nickname}}:
                                                        </div>
                                                        <!--子评论的内容 -->
                                                        <div class="child-comments-content">
                                                            {{item2.content}}
                                                        </div>
                                                    </div>
                                                    <div style="clear: both">
                                                        <div class="child-comments-floor">
                                                            第{{item2.layer}}楼
                                                        </div>
                                                        <div class="child-comments-createDate">
                                                            {{item2.createDate}}
                                                        </div>
                                                        <el-button class="child-comments-reply" text @click="reply(item.id,item2.author.id)">
                                                            回复
                                                        </el-button>
                                                    </div>
                                                    <el-divider />
                                                </div>
                                            </el-card>
                                        </div>
                                        <el-divider />
                                    </div>
                                </div>
                                </div> <!--  有评论时  -->
                                <div v-else style="text-align: center">
                                    无人评论
                                </div> <!--  无评论时  -->
                            </div>
                    </el-col>
                    <el-col :span="3">
                    </el-col>
                </el-row>
            </div>
<!--            评论区底部-->
            <div style="height: 50px">
            </div>
        </div>

        <!--  对话框组件,回复评论     -->
        <el-dialog v-model="replyDialogVisible" title="评论" width="30%" draggable>
            <div class="div-comment-pl">
                <div >
                    <el-input
                            v-model="plInup2"
                            :rows="2"
                            type="textarea"
                            show-word-limit="true"
                            placeholder="评论"
                    />
                </div>
            </div>

              <span class="dialog-footer">
                <el-button @click="replyDialogVisible = false">取消评论</el-button>
                <el-button type="primary" @click="postReply()">进行评论</el-button
                >
              </span>
        </el-dialog>
    </div>
</template>

<script>
// @ is an alias to /src
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
MdEditor.config({
    editorConfig: {
        renderDelay: 0,
    }
});
import {formatDate} from '../../../utils/sjzhuanh';
import { ChatRound, View } from '@element-plus/icons-vue'
import {friendlyDate} from "../../../utils/friendlyDate";
export default {
    name: 'ArticleDetail',
    data() {
        return {
            id: 0,              //文章id
            articles: {},       //接受文章所有信息的容器
            body: {},           //接受文章内容所有信息的容器
            user:{},            //接受作者信息的容器
            contentHtml: '',    //接受文章内容信息的内容信息的容器
            comments:{},        //接受评论信息的容器
            plIn:{
                plInup:''   //父评论内容
            },
            postComments:{
                articleId:0,        //文章id
                content:'',         //内容
                parent:0,           //回复评论的id,父评论没有回复给谁,所以为0
                toUserId:0          //回复给谁的id,父评论没有回复给谁,所以为0
            },
            //子评论的评论内容和所要传的参数
            plInup2:'',     //子评论内容
            postReplys:{
                articleId:0,        //文章id
                content:'',         //内容
                parent:'',       //回复评论的id
                toUserId:0      //回复给谁的id
            },
            replyDialogVisible:false,    //对话框评论
            rules:{
                    plInup:[
                        { required: true, message: '发表评论不能为空'},
                    ]
            },
            contentGai:true
        }
    },
    components: {
        ChatRound, View,MdEditor
    },
    created() {
        this.id = this.$route.params.id
        this.getArticles()
    },
    methods: {
        async getArticles() {   //根据文章id获取文章
            let { data: res } = await this.$http.get('/articles/get/view/' + this.id)
            if (res.success === false) return this.$message.error(res.msg)
            this.articles = res.data
            this.body = res.data.body
            // this.user = res.data.user
            // console.log(this.body)
            // console.log("数据库时间"+this.articles.createDate)
            // console.log("数据库时间"+this.articles.createDate[4])
            // let years=this.articles.createDate[0]+this.articles.createDate[0]+this.articles.createDate[0]+this.articles.createDate[0];
            // let months=this.articles.createDate[5]+this.articles.createDate[6];
            // let days=this.articles.createDate[8]+this.articles.createDate[9];
            // let hours=this.articles.createDate[11]+this.articles.createDate[12];
            // let minutes=this.articles.createDate[14]+this.articles.createDate[15];
            // let seconds=this.articles.createDate[17]+this.articles.createDate[18];
            // console.log("-----------------------")
            // console.log("数据库的年份"+years)
            // console.log("数据库的月份"+months)
            // console.log("数据库的日份"+days)
            // console.log("数据库的小时"+hours)
            // console.log("数据库的分钟"+minutes)
            // console.log("数据库的秒"+seconds)
            // console.log("数据库的秒"+typeof parseInt(seconds))
            // console.log("数据库时间:"+friendlyDate(this.articles.createDate))
            this.getAuthor()
            this.getComments()
        },
        async getAuthor(){  //根据文章的作者id获取作者信息
            let { data: res } = await this.$http.get('/user/' +  parseInt(this.articles.authorId))
            if (res.success === false) return this.$message.error(res.msg)
            this.user = res.data
        },
        async getComments(){    //根据文章id获取评论
            let { data: res } = await this.$http.get('/comment/article/' +  parseInt(this.articles.id))
            if (res.success === false)return this.$message.error(res.msg)
            this.comments = res.data
        },
        async postComment(){    //发表评论
            // console.log(this.postcomment)
            // console.log(this.postComment.articleId=this.id)
            // console.log(this.postComment.content=this.plInup)
            // console.log(this.postComment)
            this.$refs["formPlRef"].validate(async(valid) => { //进行规则效验
                if(valid){
                    this.postComments.articleId=this.id
                    this.postComments.content=this.plIn.plInup
                    let { data: res } = await this.$http.post('/comment/create',this.postComments)
                    if (res.success === false){
                        this.getLogin();
                        return this.$message.error(res.msg)
                    }
                    this.$message.success(res.msg)
                    this.plIn.plInup=''
                    await this.getComments();
                }else{
                    this.$message.error(this.rules.plInup[0].message)
                }
            })
        },
        async postReply(){      //回复评论
            this.postReplys.articleId=this.id
            this.postReplys.content=this.plInup2
            let { data: res } = await this.$http.post('/comment/create',this.postReplys)
            if (res.success === false) return this.$message.error(res.msg)
            this.$message.success(res.msg)
            this.plInup2=''
            this.replyDialogVisible = false
            await this.getComments();
        },
        reply(id,toUserId){     //获取回复评论的:评论id,回复谁的用户id,并弹出回复框
            this.replyDialogVisible = true
            this.postReplys.parent=id
            this.postReplys.toUserId=toUserId
        },
        getLogin(){
            this.$router.push('/login')
        }
    }
}
</script>
<style scoped>
    .article{
        float: left;
        padding-left: 200px;
        padding-top:100px;
        background-color: rgb(255, 255, 255);
        width: 1000px;
    }
/*<!-- 1 -->*/
    .body-title-avatar{
        float: left;
        padding-left:130px;
        padding-top: 50px;
        text-align: left;

    }
    .body-title-body{
        float: left;
        padding-top: 50px;
        padding-left:20px;
        text-align: left;
        font-size: 40px;
    }
/*<!-- 2 -->*/
    .body-author{
        float: left;
        padding-left:130px;
        padding-top: 10px;
        text-align: left;
        font-size:10px;
        color: rgb(135, 130, 129);
    }
    .body-create-date{
        float: left;
        padding-left:20px;
        padding-top: 10px;
        text-align: left;
        font-size:10px;
        color: rgb(135, 130, 129);
    }
    .body-view-counts{
        float: left;
        padding-left:20px;
        padding-top: 10px;
        padding-bottom: 30px;
        text-align: left;
        font-size:10px;
        color: rgb(135, 130, 129);
    }
    .body-comment-counts{
        float: left;
        padding-left:20px;
        padding-top: 10px;
        padding-bottom: 30px;
        text-align: left;
        font-size:10px;
        color: rgb(135, 130, 129);
    }
/*<!-- 3 -->*/

/*   4*/
    /* 整体   */
    .div-comment{
        text-align: left;
    }

    /*进行评论*/
    .div-comment-pl-avatar{
        float:left;
    }
    .div-comment-pl-input{
        float:left;
        width: 500px;
        height: 100px;
    }
    .div-comment-pl-button{
        float:left;
        padding-left:10px;
        /*background-color: #3f7fff;*/
    }
    .div-comment-pl-button-div1{
        width: 85px;
        height: 90px;
        clear:both;
        background-color: rgb(2, 162, 214);
        font-size: 20px;
        color: #ffffff;
    }
    /* 评论   */
    .father-comments{
        clear:both;
    }
    .father-comments-div{
        float: left;
    }
    .father-comments-avatar{
        float: left;
        clear:both;
    }
    .father-comments-nickname{
        float: left;
        font-size:20px;
        color: rgb(52, 140, 158);
    }
    .father-comments-content{
        clear:both;
        padding-left: 30px;
        font-size:20px;
        color: rgb(87, 83, 83);
    }
    .father-comments-div2{
        /*padding-bottom: 20px;*/
        /*margin-bottom: 20px;*/
        float: left;
        padding:10px;
    }
    .father-comments-floor{
        clear:both;
        float: left;
        font-size:10px;
        color: rgb(135, 130, 129);
    }
    .father-comments-createDate{
        float: left;
        padding-left: 10px;
        padding-top: 2px;
        font-size:10px;
        color: rgb(135, 130, 129);
    }
    .father-comments-reply{
        float: right;
        font-size:2px;
        color: rgb(135, 130, 129);
    }
    /* 子评论   */
    .child-comments{
        clear:both;
    }
    .child-comments-div{
        float: left;
    }
    .child-comments-avatar{
        float: left;
        clear:both;
    }
    .child-comments-div2{
        /*padding-bottom: 20px;*/
        /*margin-bottom: 20px;*/
        float: left;
        padding:10px;
        /*padding:-20px;*/
    }
    .child-comments-nickname{
        float: left;
        font-size:10px;
        color: rgb(135, 130, 129);
        /*padding-bottom: 20px;*/
    }
    .child-comments-content{
        float: left;
        font-size:20px;
        color: rgb(87, 83, 83);
        padding:-20px;
    }
    .child-comments-floor{
        float: left;
        font-size:10px;
        color: rgb(135, 130, 129);
    }
    .child-comments-createDate{
        float: left;
        padding-left: 10px;
        font-size:10px;
        color: rgb(135, 130, 129);
        /*float: left;*/
    }
    .child-comments-reply{
        float: right;
        font-size:2px;
        color: rgb(135, 130, 129);
    }
    .child-comments-reply:hover{
        float: right;
        font-size:2px;
        color: rgb(135, 130, 129);
        background-color: #8c939d;
    }
</style>
