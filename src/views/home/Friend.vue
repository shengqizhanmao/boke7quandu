<template>
    <div class="artcile2">

        <div class="friend-box">
            <hr />
            <div class="friends-box">
                <div class="friend1-box" style="width:200px;background-color: aqua;height: 30px;">好友框</div>
                <hr />
                <el-card class="friend-avatar-box" v-for="item in friends" @key="item.id" @click="conectWebSocket(item.toNickName,item.toUserName,item.toUserId)">
                    <div style="float: left">
                        <el-avatar shape="square" :size="40" fit="fill" :src="item.toAvatar" style="float: left;" />
                        <div style="float: left">{{item.toNickName}}</div>
                    </div>
                </el-card>
            </div>
            <div class="friend2-box">聊天框</div>
            <hr />
            <div class="chat-box">
                <ul  class="infinite-list" style="overflow: auto">
                    <div v-for="i in chat" :key="i.id" >
                        <div v-if="i.formUserId==toUser.id">
                            <li  class="infinite-list-item">{{toUser.toNickName}}:{{i.msg}}</li>
                        </div>
                        <div v-else>
                            <li  class="infinite-list-item2">{{user.nickname}}:{{ i.msg }}</li>
                        </div>
                    </div>
                </ul>
                <div class="chat2-box">
                    <div >
                        <el-input
                                v-model="textarea"
                                :rows="9"
                                type="textarea"
                                class="char2-1-box"
                        />
                        <el-button class="char2-2-box" @click="send()">发送消息</el-button>
                    </div>

                </div>
            </div>
        </div>
        消息：<input id="text" type="text"  v-model="text" />
        <el-button @click="send()">发送消息</el-button>
        <div v-for="item in message" @key="item">
            {{item}}<br>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Friend",
        data() {
            return {
                username:"",
                websocket: null,
                // message:"",
                text:"",
                message:[],
                friends:[],
                count:54,
                load:10,
                textarea:"",
                user:"",
                toUser:{
                    id:"",
                    toUsername:"",
                    toNickName:""
                },
                chat:[],
            }
        },
        created() {
            // this.conectWebSocket();
            this.getFriend();
        },
        destroyed() {
            this.websocket.close() //离开路由之后断开websocket连接
        },
        methods: {
            async getFriend() {
                this.user=JSON.parse(window.sessionStorage.getItem('user'))
                const { data: res } = await this.$http.get('/friends/'+ this.user.id)
                this.friends=res.data;
            },
            async getFriends(){
                this.user=JSON.parse(window.sessionStorage.getItem('user'))
                const { data: res } = await this.$http.get('/friends/'+ this.user.id+"/"+this.toUser.id)
                this.chat=res.data;
            },
            conectWebSocket(toNickName,toUserName,toUserId){
                this.toUser.id=toUserId;
                this.toUser.toUserName=toUserName;
                this.toUser.toNickName=toNickName;
                this.getFriends()
                let that=this
                if ('WebSocket'in window) {
                    this.websocket = new WebSocket("ws://localhost:8085/websocket/"+this.user.username+"/"+toUserName);
                } else {
                    alert('Not support websocket')
                }
                //连接发生错误的回调方法
                this.websocket.onerror = function() {
                    that.setMessageInnerHTML("error");
                };
                 //连接成功建立的回调方法
                this.websocket.onopen = function(event) {
                    that.setMessageInnerHTML("成功建立连接:");
                }
                //接收到消息的回调方法
                this.websocket.onmessage = function(event) {
                    that.setMessageInnerHTML(JSON.parse(event.data));
                    console.log(JSON.parse(event.data));
                }
                //连接关闭的回调方法
                this.websocket.onclose = function() {
                    // that.setMessageInnerHTML("Loc MSG:关闭连接");
                }
                //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
                window.onbeforeunload = function() {
                    that.websocket.close();
                }
            },
            //将消息显示在网页上
             setMessageInnerHTML(innerHTML) {
                 this.chat.push(innerHTML);
                // document.getElementById('message').innerHTML += innerHTML + '<br/>';
            },
            //关闭连接
             closeWebSocket() {
                 this.websocket.close();
            },
            //发送消息
             send() {
                 this.websocket.send(this.textarea);
            },
        }
    }
</script>

<style lang="less" scoped>
    .artcile2{
        float: left;
        width: 1400px;
        padding-left: 100px;
        padding-top:100px;
        background-color: rgba(245, 245, 245, 0.762);
    }
    .friend-box{
        position: relative;
        width: 1000px;
        height: 1000px;
        background-color: rgba(255, 255, 255, 1);
        .friends-box{
            float: left;
        }
        .friend-avatar-box{
            width: 200px;
            height:70px;
        }
        .friend1-box{
            width:200px;
            background-color: aqua;
            height: 30px;
        }
        .friend2-box{
            width:1000px;
            background-color: sandybrown;
            height: 30px;
        }
        .chat-box{
            float: left;
            /*position: relative;*/
            top:-100px;
            left:200px;
            width: 798px;
            height: 600px;
            background-color: rgb(95, 66, 66);
            .infinite-list {
                height: 500px;
                padding: 0;
                margin: 0;
                list-style: none;
            }
            .infinite-list .infinite-list-item {
                display: flex;
                align-items: center;
                justify-content: left;
                height: 50px;
                background: var(--el-color-primary-light-9);
                margin: 10px;
                color: var(--el-color-primary);
            }
            .infinite-list .infinite-list-item2 {
                display: flex;
                align-items: center;
                justify-content: right;
                height: 50px;
                background: var(--el-color-primary-light-9);
                margin: 10px;
                color: var(--el-color-primary);
            }
            .infinite-list .infinite-list-item + .list-item {
                margin-top: 10px;
            }
            .chat2-box{
                border: 1px black;
                width: 798px;
                height: 198px;
                background-color: #ec0e0e;
                .chat2-1-box{
                    width: 798px;
                    float: left;
                }
                .char2-2-box{
                    position: relative;
                    top: -30px;
                    left: 355px;
                }
            }
        }
    }

</style>