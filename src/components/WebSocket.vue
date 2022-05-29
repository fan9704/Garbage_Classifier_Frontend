<template>

<v-container class="chatroom" >
    <v-row  v-show="chatroomDrawer">
        <v-col cols="12" class="d-flex justify-end mb-6">
            <h5>Chat To Receptionist</h5>
            <v-btn @click="sendDataToServer">Send Data To Backend</v-btn>
        </v-col>
    </v-row>
            <v-row>
        <v-col cols="12"  class="d-flex justify-end mb-6">
            <v-btn @click="chatroomDrawer = !chatroomDrawer">Chat To Receptionist</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default{
    name:"WebSocket",
    data(){
        return{
            wsIsRun:false,
            webSocket:null,
            ws:"",
            wsTimer:null,
            chatroomDrawer:false,
        }
    },
    async mounted() {
        this.wsIsRun=true;
        this.wsInit();
    },
    methods:{
        sendDataToServer(){
            if(this.webSocket.readyState===1){
                this.webSocket.send("From Frontend Data");
            }else{
                throw Error("Service Unconnected");
            }
        },
        wsInit(){
            const wsuri="ws://localhost:8080/websocket/badao";
            this.ws=wsuri;
            if(!this.wsIsRun)return
            this.wsDestroy()
            this.webSocket=new WebSocket(this.ws)
            this.webSocket.addEventListener("open",this.wsOpenHanler)
            this.webSocket.addEventListener("message",this.wsMessageHanler)
            this.webSocket.addEventListener("error",this.wsErrorHanler)
            this.webSocket.addEventListener("close",this.wsCloseHanler)

            clearInterval(this.wsTimer)
            this.wsTimer=setInterval(()=>{
                if(this.webSocket.readyState===1){
                    clearInterval(this.wsTimer);
                }else{
                    console.log("ws create connection failed");
                    this.wsInit();
                }
            },3000)
        },
        wsOpenHanler(event){
            console.log("ws connection create success");
        },
        wsMessageHanler(event){
            console.log("wsMessageHanler");
            console.log(event.data);
        },
        wsErrorHanler(event){
            console.log(event,"Communication has error");
            this.wsInit();
        },
        wsCloseHanler(event){
            console.log(event,"ws close");
            this.wsInit();
        },
        wsDestroy(){
            if(this.webSocket!==null){
                this.webSocket.removeEventListener('open',this.wsOpenHanler)
                this.webSocket.removeEventListener('message',this.wsMessageHanler)
                this.webSocket.removeEventListener('error',this.wsErrorHanler)
                this.webSocket.removeEventListener('close',this.wsCloseHanler)
                this.webSocket.close();
                this.webSocket=null;
                clearInterval(this.wsTimer);
            }
        }
    }
}
</script>

<style>
.v-container .chatroom{
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 3;
}
.v-container .chatroom.v-row{
    position: relative;
    bottom: auto;
    right: auto;
}
</style>