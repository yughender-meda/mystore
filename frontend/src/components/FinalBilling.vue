<template>
<div>
    <h1>Billing</h1>
    <table>
        <thead>
            <tr>
                <th>Item Name</th>
                <th>price</th>
                <th>Quantity</th>
                <th>Fin.Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr v-show = "items != null" v-for="item in items" :key = item>
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.price * item.quantity}}</td>
            </tr>
        </tbody>
    </table>
    <p> Final Amount:{{ final }}</p>
    <div> 
        <button @click="revertBack">Edit</button>
        <button @click = "setAll">Checkout</button>
    </div>
    <!-- <button @click = "addAll">final</button> -->
    
</div>
</template>

<script>
export default{
    data (){
        return {
            items:this.$store.state.items,
            final: this.$store.state.finalAmount
        }
    },
    methods:{
        revertBack(){
            this.$router.push("/billing")
        },
        setAll(){
            fetch("http://127.0.0.1:8000/getcustomerdetails",{
                method:"POST",
                headers:{
                    "content-Type":"application/json"
                },
                body:JSON.stringify({
                    cust_name:this.$store.state.custName,
                    contact:this.$store.state.custContact,
                    shopvalue:this.$store.state.finalAmount
                })
            })
            this.$store.state.custName = ""
            this.$store.state.custContact = null
            this.$store.state.items = []
            this.$store.state.finalAmount = null
            this.$router.push('/billing')
        }
    
    }
}
</script>

<style scoped>
p {
    color:red;
    font-size: 20px;
}
</style>