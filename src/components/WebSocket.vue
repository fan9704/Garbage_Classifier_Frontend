<template>

<v-container class="chatroom" >
    <v-row  class="receptionRoom" v-show="chatroomDrawer">
        <v-col >
            <h3 @click="chatroomDrawer = !chatroomDrawer">Chat To Receptionist</h3>
          <span
              :key="index"
              v-for="(msg, index) in messages"

          >
            <v-chip
                v-if="msg.username"
                    class="ma-2"
                    size="large">
              {{msg.content}}
            </v-chip>

            <v-chip
                v-else
                    size="large">
>
              {{msg.content}}
            </v-chip>
          </span>
          <div>
            <v-text-field
                label="Message!"
            ></v-text-field>
<!--            <v-btn @click="sendDataToServer">Send Message To Backend</v-btn>-->
          </div>

        </v-col>
    </v-row>
    <v-row v-show="!chatroomDrawer">
        <v-col  >
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
            messages:[
              {
                "username":"0",
                "content":"[INFO] Welcome to Garbage Classifier Customer service system"
               },
            ],
            wsIsRun:false,
            webSocket:null,
            ws:"",
            wsTimer:null,
            chatroomDrawer:false,
            UserKeyIn:"",
        }
    },
    async mounted() {
        this.wsIsRun=true;
        this.wsInit();
        window.addEventListener("keypress", function(e) {
          if(e.keyCode === 13 &&this.chatroomDrawer==true){
            console.log("Enter")
            this.sendDataToServer();
          }
        });
    },
    methods:{
        sendDataToServer(){
            if(this.webSocket.readyState===1){
                if(this.UserKeyIn!=""){
                  this.webSocket.send(this.UserKeyIn);
                }else{
                  this.webSocket.send("From Frontend Data");
                }

            }else{
                throw Error("Service Unconnected");
            }
        },
        wsInit(){
            let wsuri="140.125.207.230:8080/websocket/badao";
            wsuri=window.location.protocol=='https:'?`wss://${wsuri}`:`ws://${wsuri}`;
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
        wsOpenHandler(event){
            console.log("ws connection create success");
        },
        wsMessageHandler(event){
            console.log("wsMessageHandler");
            console.log(event.data);
        },
        wsErrorHandler(event){
            console.log(event,"Communication has error");
            this.wsInit();
        },
        wsCloseHandler(event){
            console.log(event,"ws close");
            this.wsInit();
        },
        wsDestroy(){
            if(this.webSocket!==null){
                this.webSocket.removeEventListener('open',this.wsOpenHandler)
                this.webSocket.removeEventListener('message',this.wsMessageHandler)
                this.webSocket.removeEventListener('error',this.wsErrorHandler)
                this.webSocket.removeEventListener('close',this.wsCloseHandler)
                this.webSocket.close();
                this.webSocket=null;
                clearInterval(this.wsTimer);
            }
        }
    }
}
</script>

<style>
.chatroom{
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 3;
}
.receptionRoom{
  background: #FFF;
  width: 50%;
  border-radius: 10px;
}
.chatroom.v-row{
    position: relative;
    bottom: auto;
    right: auto;
}
</style>