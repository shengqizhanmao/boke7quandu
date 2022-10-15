<template>
    <div class="category">
        <div class="category-date">
            <div class="category-date-category">
                <div style="float: left;">
                    分类:
                </div>
                <div>
                    <el-radio-group v-model="radioCategory" style="float: left;padding-left: 20px">
                        <el-radio-button text label="全部" @change="postCategory()"/>
                        <el-radio-button text v-for="item in category" style="margin-left: 20px" :key="item.id" :label="item.categoryName" @change="postCategory(item.id)"/>
                        <el-button style="margin-left: 20px" @click="dialogFormAddCategory=true">添加分类</el-button>
                    </el-radio-group>
                </div>
            </div>
            <div style="float: left; clear: both;padding-top: 5px">
                <div style="float: left;">
                    时间:
                </div>
                <div style="float: left; padding-left: 20px">
                    <el-radio-group v-model="radioDate">
                        <el-radio-button text label="全部" @change="postCategoryDate()"/>
                        <el-radio-button text v-for="item in articleDate" style="margin-left: 20px" :key="item" :label="item" @change="postCategoryDate(item)"/>
                    </el-radio-group>
                </div>
            </div>
            <div style="float: left; clear: both;padding-top: 5px">
                <div style="float: left;">
                    标签:
                </div>
                <div style="float: left; padding-left: 20px">
                    <el-radio-group v-model="radioTags">
                        <el-radio-button text label="全部" @change="postTags()"/>
                        <el-radio-button text v-for="item in tags" style="margin-left: 20px" :key="item" :label="item.tagname" @change="postTags(item.id)"/>
                    </el-radio-group>
                </div>
            </div>
            <div style="float: left;clear: both;padding-top: 5px" >
                <div style="float: left;clear: both">
                    排序
                </div>
                <div style="float: left; padding-left: 20px">
                    <el-radio-group v-model="radioViewSort" @change="postViewSort()">
                        <el-radio-button text label="最热门"/>
                        <el-radio-button text label="最新" />
                    </el-radio-group>
                </div>
            </div>
        </div>

        <div class="demo-pagination-block"  style="clear: both">
            <el-card v-for="item in articles" @key="item.id" class="cardss">
                <el-row :gutter="20">
                    <el-col :span="20">
                        <div class="title">{{ item.title }}</div>
                        <div style="float: right;padding-left: 20px">
                            <el-button @click="getCategoryVue(item.category.id,item.category.categoryName)">
                                {{ item.category.categoryName }}
                            </el-button>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content ep-bg-purple">
                            <el-icon>
                                <ChatRound />
                            </el-icon> {{ item.commentCounts }}
                            <el-icon>
                                <View />
                            </el-icon>
                            {{ item.viewCounts }}
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="17">
                        <div class="summary">{{ item.summary }}</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content ep-bg-purple" />
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="dibu">
                    <el-col :span="5">
                        <div class="grid-content ep-bg-purple">作者:{{ item.author }}</div>
                    </el-col>
                    <el-col :span="8">

                        <div style="float: left">
                            <el-button size="small" v-for="(item2, index) in item.tags" @click="getCategoryByTagsVue(item2.tagname,item2.id)">
                                {{ item2.tagname }}
                            </el-button>
                        </div>

                    </el-col>
                    <el-col :span="7">
                        <div>发布时间:{{ item.createDate }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content ep-bg-purple">
                            <el-button type="primary" round @click="getdetail(item.id)">查看详细</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
            <el-pagination :page-sizes="pageSize" layout="sizes, prev, pager, next, total,jumper"
                           :default-page-size="formRadio.pagesize" :total="total" @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" />
        </div>

<!--   添加分类的弹窗     -->
        <el-dialog v-model="dialogFormAddCategory" title="添加分类" width="400px">
            <el-form :model="addCategory" ref="addCategoryRef">
                <el-form-item :rules="rules.addCategoryRules.categoryName" prop="categoryName" label="分类" label-width="130px">
                    <el-input v-model="addCategory.categoryName" autocomplete="off" />
                </el-form-item>
                <el-form-item :rules="rules.addCategoryRules.description" prop="description" label="分类的作用" label-width="130px">
                    <el-input v-model="addCategory.description" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="PostAddCategory()">添加</el-button>
                <el-button type="primary" @click="dialogFormAddCategory = false">退出</el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import { ChatRound, View } from '@element-plus/icons-vue'
    import {friendlyDate} from "../../utils/friendlyDate";

    export default {
        name: 'Category',
        data() {
            return {
                category:'',
                articleDate:'',
                tags:'',
                radioCategory:'全部',
                radioDate:'全部',
                radioTags:'全部',
                radioViewSort:'最新',
                formRadio:{
                    radioCategory:'0',
                    radioDate:'0',
                    radioTags:'0',
                    radioViewSort:'1',
                    page:1,
                    pagesize:3
                },
                articles: {},
                pageSize: [2, 3, 4, 5, 6, 7, 8, 9, 10],
                total: 10,
                dialogFormAddCategory:false,
                addCategory:{
                    categoryName:'',
                    description:''
                },
                rules: {
                    addCategoryRules: {
                        description: [
                            {required: true, message: '分类作用不能为空'}
                        ],
                        categoryName: [
                            {required: true, message: '分类不能为空'}
                        ]
                    }
                }
            }
        },
        components: {
            ChatRound, View
        },
        created() {
            if(this.$route.query.id!=null){
                this.formRadio.radioCategory = this.$route.query.id;
                this.radioCategory = this.$route.query.categoryName;
            }
            if(this.$route.query.tagsId!=null){
                this.formRadio.radioTags = this.$route.query.tagsId;
                this.radioTags = this.$route.query.tagname;
            }
            this.getCatyegory();
            this.getArticleDate();
            this.getTags();
            this.PostGetArticle();
        },
        methods: {
            async getCatyegory(){
                const { data: res } = await this.$http.get('/category/getListCategory')
                if (res.success === false) return this.$message.error(res.msg)
                this.category = res.data
            },
            async getArticleDate(){
                const { data: res } = await this.$http.get('/articles/getArticleDate')
                if (res.success === false) return this.$message.error(res.msg)
                this.articleDate = res.data
            },
            async getTags(){
                const { data: res } = await this.$http.get('/tags/getListTags')
                if (res.success === false) return this.$message.error(res.msg)
                this.tags = res.data
            },
            async PostGetArticle(){
                const { data: res } = await this.$http.post('/articles/getArticleByCategory',this.formRadio)
                if (res.success === false) return this.$message.error(res.msg)
                this.articles = res.data.articles
                this.total=res.data.size
                for (let i=0;i<this.articles.length;i++){
                    // console.log(this.articles[i].createDate)
                    this.articles[i].createDate=friendlyDate(this.articles[i].createDate)
                    console.log(this.articles[i].createDate)
                }
            },
            async PostAddCategory(){
                this.$refs["addCategoryRef"].validate(async(valid) => { //进行规则效验
                    if(valid){
                        const { data: res } = await this.$http.post('/category/addCategory',this.addCategory)
                        if (res.success === false) return this.$message.error(res.msg)
                        this.$message.success(res.msg)
                        this.dialogFormAddCategory = false
                    }
                })
            },
            postCategory(id){
                this.formRadio.radioCategory=id
                if(this.radioCategory=="全部"){
                    this.formRadio.radioCategory=0
                }
                this.PostGetArticle();
            },
            postCategoryDate(item){
                this.formRadio.radioDate=item
                if(this.radioDate=="全部"){
                    this.formRadio.radioDate=0
                }
                this.PostGetArticle();
            },
            postTags(id){
                this.formRadio.radioTags=id
                if(this.radioTags=="全部"){
                    this.formRadio.radioTags=0
                }
                this.PostGetArticle();
            },
            postViewSort(){
                if(this.radioViewSort=="最热门"){
                    this.formRadio.radioViewSort="0"
                }else{
                    this.formRadio.radioViewSort="1"
                }
                this.PostGetArticle();
            },
            handleSizeChange(val) {
                this.formRadio.pagesize = val
                // console.log(`${val} items per page`)
                this.PostGetArticle();
            },
            handleCurrentChange(val) {
                this.formRadio.page = val
                // console.log(`current page: ${val}`)
                this.PostGetArticle();
            },
            getdetail(detailId) {
                this.$router.push({ name: "ArticleDetail", params: { id: detailId } })
            },
            getCategoryVue(id,categoryName){
                if(id!=null){
                    this.formRadio.radioCategory = id;
                    this.radioCategory = categoryName;
                }
                this.getCatyegory();
                this.getArticleDate();
                this.getTags();
                this.PostGetArticle();
            },
            getCategoryByTagsVue(tagname,tagsId){
                if(tagsId!=null){
                    this.formRadio.radioTags = tagsId;
                    this.radioTags = tagname;
                }
                this.getCatyegory();
                this.getArticleDate();
                this.getTags();
                this.PostGetArticle();
            }
        },
    }
</script>
<style scoped>
    .category{
        float: left;
        width: 1300px;
        padding-left: 200px;
        padding-top:100px;
        background-color: rgba(245, 245, 245, 0.762);
    }




.cardss {
    padding: 6px;
    width: 750px;
    height: 200px;
    margin: 30px;
    text-align: left;
}
    .title {
        font-size: 24px;
        font-style: italic;
        font-weight: bold;
        text-align: left;
        float: left;
    }

    .summary {
        text-align: left;
    }

    .el-row {
        margin-bottom: 20px;
        width: 750px;
    }

    .el-row:nth-child(1) {
        height: 20px;
    }

    .el-row:nth-child(1) .el-icon {
        margin-left: 10px;
    }

    .el-row:nth-child(1) .el-col:nth-child(2) {
        text-align: center;
        font-size: 15px;
    }

    .el-row:nth-child(2) {
        height: 75px;
    }
</style>
