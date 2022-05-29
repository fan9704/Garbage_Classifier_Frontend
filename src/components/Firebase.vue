<template>
<div id="app" class="container my-3">
  <div class="row justify-content-center">
    <h1 class="fs-3 text-center my-3">vue + firebase 線上即時聊天室(已刪除寫入)</h1>
    <div class="col-md-6">
      <div class="card rounded-3 chatroom">
        <div class="card-body pt-0">
          <div class="input-group py-3 sticky-top bg-white">
            <input type="text" class="form-control" v-model="message" :disabled="!username" @keyup.enter="addMessage" placeholder="請勿人生攻擊，所有內容將被保存在數據">
            <button class="btn btn-outline-secondary" type="button" :disabled="!username" @click="addMessage">送出</button>
          </div>

          <div class="message-block">
            <div class="row gx-2 mb-3" v-for="(item, key) in chatroom" :key="key" :class="{ 'text-end flex-row-reverse': item.username === username }">
              <div class="col-1 d-flex justify-content-center">
                <div class="avator mt-1">
                  {{ item.username.slice(0, 1) }}
                </div>
              </div>
              <div class="col-8">
                <div>
                  <strong>{{ item.username }}</strong>
                  <small class="text-muted ms-2">
                    {{ new Date(item.time).toLocaleDateString() }}
                    {{ new Date(item.time).toLocaleTimeString() }}</small>
                </div>
                <div class="message-content p-2 mt-2 rounded-3" :class="{ 'bg-info text-white': item.username === username,
                    'bg-light': item.username !== username
                    }">
                  <p class="mb-0">{{ item.message }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card">
        <div class="card-body">
          <div class="mb-3">
            <label for="username" class="form-label">輸入使用者名稱</label>
            <input id="username" type="text" class="form-control" v-model="tempUsername" :disabled="username.length" autofocus @keyup.enter="addUsername">
            <small class="form-text text-muted">請輸入個人姓名開始使用聊天室</small>
          </div>
          <button type="button" class="btn btn-info" @click="addUsername" :disabled="username.length">
            開始使用
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
<footer class="bg-info p-3 text-center">
  <p class="m-0 small">copyright by 六角學院卡斯伯</p>
</footer>
</template>

<script>
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCiIDLjTl65lugnCvaoe-1xsN-NEs1fjow",
  authDomain: "online-chatroom-demo.firebaseapp.com",
  databaseURL:
    "https://online-chatroom-demo-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "online-chatroom-demo",
  storageBucket: "online-chatroom-demo.appspot.com",
  messagingSenderId: "938520106251",
  appId: "1:938520106251:web:649b16c56f38d614527e0e",
  measurementId: "G-NVZQJWM59K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.database();
const msgRef = db.ref("message");
export default{
    setup() {
    const message = ref("");
    const username = ref("");
    const chatroom = ref([]);
    const tempUsername = ref("");

    const addUsername = function () {
      username.value = tempUsername.value;
    };
    const addMessage = function () {
      const key = msgRef.push().key;

      msgRef.child(key).set({
        message: message.value,
        username: username.value,
        time: Date.now(),
        key
      });

      message.value = "";
    };

    onMounted(() => {
      msgRef.on("value", (snapshot) => {
        chatroom.value = snapshot.val();
      });
    });

    return {
      message,
      username,
      tempUsername,
      chatroom,
      addMessage,
      addUsername
    };
  },
  name:"Firebase"
    
}



</script>