<template>
  <div class="home">
    <div>
      <Headerdemo class="Header"></Headerdemo>
    </div>
    <div class="main">
        <router-view></router-view>
    </div>
    <div style="clear: both">这个是底部了</div>
  </div>
</template>

<script>
import { Location, Menu, Document, Setting, Delete } from '@element-plus/icons-vue';
import Headerdemo from '/src/components/home/Headerdemo';
export default {
  name: 'HomeView',
  data() {
    return {
    }
  },
  components: {
    Location, Menu, Document, Setting, Delete, Headerdemo
  },
  created() {
  },
  methods: {
  },
}
</script>
<style scoped>
.Header {
  top:0px;/*不添加上面就空出一行*/
  position: fixed;
  width: 1500px;
  /* background-color: aliceblue; */
  z-index: 3;
  height: 50px;
}

.home {
  background-color: rgba(255, 255, 255, 1);
}

</style>
