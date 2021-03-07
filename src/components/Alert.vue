<template>
    <div class="message-alert">
        <div class="alert alert-dismissble" :class="'alert-'+ item.status"
        v-for="(item,i) in messages" :key="i">
        {{item.message}}
            <button type="button" class="close" @click="removeMessage(i)" arial-label="Close"><!--X的按鈕-->
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

    </div>    
</template>

<script>
export default{
    name:'Navbar',
    data(){
        return{ //這個示範是手動的訊息 並不會自動消失
            messages:[{ //message是一個陣列
                message:'訊息內容',
                status:'danger',
                timestamp:123,
            }]
        }
    },
    methods:{
        updateMessage(message, status){
            const timestamp= Math.floor(new Date()/1000);
            this.messages.push({
                message,
                status,
                timestamp,
            });
            this.removeMessageWithTiming(timestamp);
        },
        removeMessage(num){
            this.messages.splice(num,1);        
        },
        removeMessageWithTiming(timestamp){
            const vm = this;
            setTimeout(()=>{
                vm.messages.forEach((item,i)=>{
                    if(item.timestamp===timestamp){
                        vm.messages.splice(i,1);
                    }
                })
            },5000);//每五秒一到,remove訊息
        },
    },
    created(){
        const vm =this;
        vm.$bus.$on('messsage:push',(message,status='warning')=>{ //用$on註冊"messsage:push"
            vm.updateMessage(message,status);
        });
    },
}

</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;/*最大寬度就是百分之五十*/
  top: 56px;
  right: 20px;
  z-index: 1100;/*出現在最上層*/
}
</style>