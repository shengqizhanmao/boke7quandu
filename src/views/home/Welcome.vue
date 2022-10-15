<template>
    <div class="article">
        <Articles></Articles>
    </div>
</template>

<script>
// @ is an alias to /src
import { ChatRound, View } from '@element-plus/icons-vue'
import Articles from '../../components/home/Articles';
export default {
    name: 'Welcome',
    data() {
    },
    components: {
        ChatRound, View, Articles
    },
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

</style>
