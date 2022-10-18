<template>
    <div class="artcile2">
        <div>
            <div style="width: 20px">
                <el-affix :offset="120">
                    <el-card style="width: 100px;height:auto;padding-right:20px">
                        <el-badge :value="item.size" v-for="item in articleYearMonth" :key="item" @click="getListArticleByYearMonth(item.year,item.month)">
                            <el-button style="width: 70px;height:auto;margin: 5px;">
                                {{item.year}}-{{item.month}}
                            </el-button>
                        </el-badge>
                    </el-card>
                </el-affix>

            </div>
            <div class="artcile">
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
            </div>
        </div>
    </div>
</template>

<script>
    import { ChatRound, View } from '@element-plus/icons-vue'
    import {friendlyDate} from "../../utils/friendlyDate";

    export default {
        name: 'Artcile2',
        data() {
            return {
                articleYearMonth:{},
                articles:{},
            }
        },
        components: {
            ChatRound, View
        },
        created() {
            this.getListArticleYearMonth();
        },
        methods: {
            async getListArticleYearMonth(){
                const { data: res } = await this.$http.get('/articles/getListArticleYearMonth')
                if (res.success === false) return this.$message.error(res.msg)
                this.articleYearMonth = res.data
                await this.getListArticleByYearMonth(res.data[0].year, res.data[0].month)
            },
            async getListArticleByYearMonth(year,month){
                const { data: res } = await this.$http.get('/articles/getListArticleByYearMonth/'+year+"/"+month)
                if (res.success === false) return this.$message.error(res.msg)
                this.articles = res.data
                for (let i=0;i<this.articles.length;i++){
                    this.articles[i].createDate=friendlyDate(this.articles[i].createDate)
                }
            },
            getdetail(detailId) {
                this.$router.push({ name: "ArticleDetail", params: { id: detailId } })
            },
            getCategoryVue(id,categoryName){
                this.$router.push({ name: "category", query: { id: id,categoryName:categoryName } })
            },
            getCategoryByTagsVue(tagname,tagsId){
                this.$router.push({ name: "category", query: { tagsId: tagsId,tagname:tagname } })
            }
        }
    }
</script>
<style scoped>
    .artcile2{
        float: left;
        width: 1400px;
        padding-left: 100px;
        padding-top:100px;
        background-color: rgba(245, 245, 245, 0.762);
    }
    .artcile{
        padding-left: 200px;
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
