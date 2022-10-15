<template>
    <div>
        <div class="my-myArticle-title">我的文章列表</div>
        <div class="my-myArticle-add"><el-button @click="dialogFormVisible = true">添加</el-button></div>
        <div class="my-myArticle-pattern"><el-button @click="SwitchMode=!SwitchMode">切换模式</el-button></div>
        <div class="my-myArticle-article">
            <div v-if="SwitchMode">
                <el-table :data="articles2" style="width: 100%">
                    <el-table-column prop="createDate" label="Date" width="180" />
                    <el-table-column prop="title" label="Name" width="150" />
                    <el-table-column  label="操作" width="330">
                        <template #default="scope">
                            <el-button style="float: left;" @click="getdetail(scope.row.id)">查看详细</el-button>
                            <el-button style="float: left;" @click="updateArticle(scope.row.id)">修改</el-button>
                            <el-button style="float: left" @click="deleteArticle(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-else>
                <el-timeline>
                    <el-timeline-item
                            v-for="(item, index) in articles2"
                            :key="index"
                            :timestamp="item.createDate">
                        {{ item.title }}
                        <el-button style="float: right" @click="deleteArticle(item.id)">删除</el-button>
                        <el-button style="float: right" @click="updateArticle(item.id)">修改</el-button>
                        <el-button style="float: right" @click="getdetail(item.id)">查看详细</el-button>
                    </el-timeline-item>
                </el-timeline>
            </div>
            <el-pagination :page-sizes="pageSize2" layout="sizes, prev, pager, next, total,jumper"
                           :default-page-size="pagesize2" :total="total2" @size-change="handleSizeChange2"
                           @current-change="handleCurrentChange2" />
        </div>

<!--  添加  -->
        <el-dialog v-model="dialogFormVisible" title="添加文章" width="1400px">
            <el-form :model="ArticleParam" ref="articleAddRef">
                <el-form-item :rules="rules.articleAddRules.title" label="标题" prop="title" label-width="140px">
                    <el-input v-model="ArticleParam.title" autocomplete="off" />
                </el-form-item>
                <el-form-item :rules="rules.articleAddRules.summary" label="简介"  prop="summary" label-width="140px">
                    <el-input v-model="ArticleParam.summary" autocomplete="off" />
                </el-form-item>
<!--                <el-form-item :rules="rules.articleAddRules.contentHtml" label="内容"  prop="contentHtml" label-width="140px">-->
<!--                    <el-input-->
<!--                            v-model="ArticleParam.contentHtml"-->
<!--                            :rows="6"-->
<!--                            type="textarea"-->
<!--                            show-word-limit="true"-->
<!--                    />-->
<!--                </el-form-item>-->

                <el-form-item :rules="rules.articleAddRules.content" label="内容"  prop="content" label-width="140px">
                    <md-editor v-model="ArticleParam.content" @onHtmlChanged="saveHtml" @onUploadImg="onUploadImg"  noMermaid="true"  showCodeRowNumber="true" noPrettier="false" />
                </el-form-item>

                <el-form-item label="分类" label-width="140px">
                    <el-select v-model="ArticleParam.category.id" placeholder="Please select a zone">
                        <el-option :label="item.categoryName" :value="item.id"  v-for="(item, index) in categories" :key="index"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签" label-width="140px" >
                    <el-checkbox v-model="ArticleParam.tags" :label="item" size="small"  v-for="(item, index) in tags" :key="index">
                        {{item.tagname}}
                    </el-checkbox>
                </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="PostAddArticle()">添加</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">退出</el-button
        >
      </span>
            </template>
        </el-dialog>
<!--  修改  -->
        <el-dialog v-model="dialogFormUpdateArticle" title="修改文章" width="1400px">
            <el-form :model="ArticleUpdateParam" ref="articleUpdateRef">
                <el-form-item :rules="rules.articleUpdateRules.title" label="标题" prop="title" label-width="140px">
                    <el-input v-model="ArticleUpdateParam.title" autocomplete="off" />
                </el-form-item>
                <el-form-item :rules="rules.articleUpdateRules.summary" label="简介" prop="summary" label-width="140px">
                    <el-input v-model="ArticleUpdateParam.summary" autocomplete="off" />
                </el-form-item>
<!--                <el-form-item :rules="rules.articleUpdateRules.contentHtml" label="内容" prop="contentHtml" label-width="140px">-->
<!--                    <el-input-->
<!--                            v-model="ArticleUpdateParam.contentHtml"-->
<!--                            :rows="6"-->
<!--                            type="textarea"-->
<!--                            show-word-limit="true"-->
<!--                    />-->
<!--                </el-form-item>-->
                <el-form-item :rules="rules.articleUpdateRules.content" label="内容"  prop="content" label-width="140px">
                    <md-editor v-model="ArticleUpdateParam.content" @onHtmlChanged="saveArticleUpdateContentHtml" @onUploadImg="onUploadImg"  noMermaid="true"  showCodeRowNumber="true" noPrettier="false" />
                </el-form-item>
                <el-form-item label="分类" label-width="140px">
                    <el-select v-model="ArticleUpdateParam.category.id" placeholder="Please select a zone">
                        <el-option :label="item.categoryName" :value="item.id"  v-for="(item, index) in categories" :key="index"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签" label-width="140px" >
                    <el-checkbox v-model="ArticleUpdateParam.tags" :label="item" size="small"  v-for="(item, index) in tags" :key="index">
                        {{item.tagname}}
                    </el-checkbox>
                </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="PostUpdateArticle()">修改</el-button>
        <el-button type="primary" @click="dialogFormUpdateArticle = false">退出</el-button
        >
      </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import MdEditor from "md-editor-v3";
    import "md-editor-v3/lib/style.css";
    import {Document, Menu , Location, Setting,} from '@element-plus/icons-vue';
    MdEditor.config({
        editorConfig: {
            renderDelay: 0,
        }
    });
    import { ChatRound, View } from '@element-plus/icons-vue'
    export default {
        name: "MyArticle",
        data() {
            return {
                articles2: {},  //文章
                tags:[],        //标签
                categories:{},  //分类
                pageSize2: [2, 3, 4, 5, 6, 7, 8, 9, 10],    //分页
                page2: 1,
                pagesize2: 3,
                total2: 10,
                SwitchMode:false,           //切换模式
                dialogFormVisible:false,     //添加文章功能
                ArticleParam:{
                    title:'',
                    summary:'',
                    content:'',
                    contentHtml:'',
                    tags:[],
                    category:{
                        id:''
                    }
                },
                dialogFormUpdateArticle:false,  //修改文章功能
                body:{},//文章内容
                ArticleUpdateParam:{
                    id:'',
                    title:'',
                    summary:'',
                    content:'',
                    contentHtml:'',
                    tags:[],
                    category:{}
                },
                rules:{
                    articleAddRules:{
                        title:[
                            { required: true, message: '文章标题不能为空'},
                        ],
                        summary:[
                            { required: true, message: '文章简介不能为空'},
                        ],
                        contentHtml:[
                            { required: true, message: '文章内容不能为空'},
                        ]
                    },
                    articleUpdateRules:{
                        title:[
                            { required: true, message: '文章标题不能为空'},
                        ],
                        summary:[
                            { required: true, message: '文章简介不能为空'},
                        ],
                        contentHtml:[
                            { required: true, message: '文章内容不能为空'},
                        ]
                    }
                }
            }
        },
        components: {
            ChatRound, View,MdEditor
        },
        created() {
            this.getArticles2();
            this.getTags();
            this.getCategories();
        },
        methods: {
            async getArticles2() {
                const { data: res } = await this.$http.get('/articles/getArticleByUserId/' + this.page2.toString() + "/" + this.pagesize2.toString());;
                if (res.success === false) return this.$message.error(res.msg)
                this.articles2 = res.data
                await this.getTotal2();
            },
            async getTotal2() {
                const { data: res } = await this.$http.get('/articles/getTotalByUserId')
                if (res.success === false) return this.$message.error(res.msg)
                this.total2 =parseInt(res.data)
            },
            async getTags() {
                const { data: res } = await this.$http.get('/tags/getListTags')
                if (res.success === false) return this.$message.error(res.msg)
                this.tags =res.data
            },
            async getCategories() {
                const { data: res } = await this.$http.get('/category/getListCategory')
                if (res.success === false) return this.$message.error(res.msg)
                this.categories =res.data
            },
            async PostAddArticle(){
                console.log(this.ArticleParam)
                this.$refs["articleAddRef"].validate(async(valid) => { //进行规则效验
                    if(valid){
                        const { data: res } = await this.$http.post('/articles/createArticle',this.ArticleParam)
                        if (res.success === false) return this.$message.error(res.msg)
                        this.$message.success(res.msg)
                        this.dialogFormVisible = false
                        await this.getArticles2();
                    }
                })
            },
            async getArticlesBody(id){
                const { data: res } = await this.$http.get('/articles/getArticleBodyByArticleId/'+id)
                if (res.success === false) return this.$message.error(res.msg)
                this.body = res.data
                this.ArticleUpdateParam.title=this.body.title;
                this.ArticleUpdateParam.summary=this.body.summary;
                this.ArticleUpdateParam.content=this.body.body.content;
                this.ArticleUpdateParam.contentHtml=this.body.body.contentHtml;
                this.ArticleUpdateParam.tags=this.body.tags;
                this.ArticleUpdateParam.category.id=this.body.category.id;
            },
            async PostUpdateArticle(){
                this.$refs["articleUpdateRef"].validate(async(valid) => { //进行规则效验
                    if(valid){
                        const { data: res } = await this.$http.post('/articles/updateArticle',this.ArticleUpdateParam)
                        if (res.success === false) return this.$message.error(res.msg)
                        this.$message.success(res.msg)
                        this.dialogFormUpdateArticle = false
                        await this.getArticles2();
                    }
                })
            },
            async getDeleteArticle(id){
                const { data: res } = await this.$http.get('/articles/deleteArticle/'+id)
                if (res.success === false) return this.$message.error(res.msg)
                this.$message.success(res.msg)
                await this.getArticles2();
            },
            handleSizeChange2(val) {
                this.pagesize2 = val
                // console.log(`${val} items per page`)
                this.getArticles2()
            },
            handleCurrentChange2(val) {
                this.page2 = val
                // console.log(`current page: ${val}`)
                this.getArticles2()
            },
            getdetail(detailId) {   //跳转到文章详细页
                this.$router.push({ name: "ArticleDetail", params: { id: detailId } })
            },
            deleteArticle(id){      //删除文章
                this.getDeleteArticle(id)
            },
            updateArticle(id){          //修改文章
                this.ArticleUpdateParam.id=id
                this.getArticlesBody(id);   //获取文章和文章内容
                this.dialogFormUpdateArticle=true
            },
            async onUploadImg(files,callback) {            //上传图片效果
                let res = await Promise.all(
                    files.map((file) => {
                        return new Promise((rev, rej) => {
                            let image = new FormData();
                            image.append('image', file);
                            this.$http.post('/upload', image, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                })
                                .then((res) => rev(res))
                                .catch((error) => rej(error));
                        });
                    })
                );
                callback(res.map((item) => item.data.data));
            },
            saveHtml(val){          //修改内容时会获取html
                this.ArticleParam.contentHtml=val
            },
            saveArticleUpdateContentHtml(val){
                this.ArticleUpdateParam.contentHtml=val
            }
        },
    }
</script>

<style scoped>
    .my-myArticle-title{
        padding-top: 4px;
        float: left;
        padding-left: 40px;
        color: #79b0ff;
        font-size: 20px;
    }
    .my-myArticle-add{
        padding-left: 50px;
        float: left;
        padding-top: 4px;
        padding-bottom: 60px;
    }
    .my-myArticle-pattern{
        padding-top: 4px;
        padding-bottom: 60px;
    }
    .my-myArticle-article{
        padding-left: 20px;
    }
</style>