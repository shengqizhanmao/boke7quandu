import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from '../plugins/element'
import './assets/iconfont.css'
import './assets/css/global.css'
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import quillEditor from 'vue-quill-editor';
import VueCookies from 'vue-cookies'
import axios from "axios";

// window object
window.$cookies.config('30d')

axios.defaults.baseURL = "http://127.0.0.1:8085"
axios.defaults.timeout = 10000;
axios.interceptors.request.use(req => {
    req.headers.Authorization = window.sessionStorage.getItem('token')
    // req.headers.Authorization = window.$cookies.get("token")
    return req
})
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.code == "ERR_NETWORK") {
            console.log("网络错误")
            // message.error("出错了");
            return null;
        }
        return Promise.reject(error);
    }
);
const app = createApp(App)
app.config.globalProperties.$cookies = VueCookies
app.config.globalProperties.$http = axios
installElementPlus(app)
app.use(router).mount('#app')
