<template>
    <button @click="getMyStore">Manage</button>
    <button @click = "getBillingItem">Bill</button>
</template>

<script>
export default{

    
    methods:{
        getBillingItem(){
            console.log("ok")
            this.$router.push("/billing")
        },
        getMyStore(){
            this.$router.push("/createitems")
        }        
    }
}
</script>
