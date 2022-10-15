<template>
    <div class="artcile2">
<!--        <el-button @click="conectWebSocket()">连接</el-button>-->
<!--        <el-button @click="closeWebSocket()">断开</el-button>-->
        <hr />
        <br />
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
            }
        },
        created() {
            this.conectWebSocket();
        },
        destroyed() {
            this.websocket.close() //离开路由之后断开websocket连接
        },
        methods: {
            conectWebSocket(){
                let user=JSON.parse(window.sessionStorage.getItem('user'))
                let that=this
                if ('WebSocket'in window) {
                    this.websocket = new WebSocket("ws://localhost:8085/websocket/"+user.username);
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
                    that.setMessageInnerHTML(event.data);
                    console.log(event.data);
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
                 this.message.push(innerHTML);
                // document.getElementById('message').innerHTML += innerHTML + '<br/>';
            },
            //关闭连接
             closeWebSocket() {
                 this.websocket.close();
            },
            //发送消息
             send() {
                 this.websocket.send(this.text);
            },
            // initWebSocket(){ //初始化weosocket
            //     const wsuri = "ws://localhost:8085";
            //     this.websock = new WebSocket(wsuri);
            //     this.websock.onmessage = this.websocketonmessage;
            //     this.websock.onopen = this.websocketonopen;
            //     this.websock.onerror = this.websocketonerror;
            //     this.websock.onclose = this.websocketclose;
            // },
            // websocketonopen(){ //连接建立之后执行send方法发送数据
            //     let actions = {"test":"12345"};
            //     this.websocketsend(JSON.stringify(actions));
            // },
            // websocketonerror(){//连接建立失败重连
            //     this.initWebSocket();
            // },
            // websocketonmessage(e){ //数据接收
            //     const redata = JSON.parse(e.data);
            // },
            // websocketsend(Data){//数据发送
            //     this.websock.send(Data);
            // },
            // websocketclose(e){  //关闭
            //     console.log('断开连接',e);
            // },
        }
    }
</script>

<style scoped>
    .artcile2{
        float: left;
        width: 1300px;
        padding-left: 100px;
        padding-top:100px;
        background-color: rgba(245, 245, 245, 0.762);
    }
</style>