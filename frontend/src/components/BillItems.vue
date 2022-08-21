<template>
  <h2>Customer Details</h2>
  <form>
    <div>
      <label>customer name</label>
      <input type="text" v-model="custName" />
    </div>
    <div>
      <label>contact</label>
      <input type="numbers" v-model="custContact" />
    </div>
  </form>
  <h2>Billing</h2>
  <section id = "quantitywarn" v-if = "checkQuantity != 'valid'">
    <label>Quantity Alert:</label>
    <p id = "warn2">{{ checkQuantity }}</p>
  </section>
  <thead>
    <tr>
      <th>Item Name</th>
      <th>metric</th>
      <th>price</th>
      <th>quantity</th>
      <th>Fin.Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input type="text"  v-model="itemName"/></td>
      <td><input type = "text" v-model="metric"/></td>
      <td><input type="numbers" @keyup.tab="fetchPrice"   v-model="price"/></td>
      <td><input type="numbers"  @keyup.enter="addItems" v-model="quantity" /></td> 

      <td>{{price*quantity}}</td>
    </tr>
  </tbody>
  <tbody>
    <tr
      v-show="items != null"
      v-for="(item, index) in this.$store.state.items"
      :key="item"
    >
      <td class = "try">{{ item.name }}</td>
      <td>{{item.metric}}</td>
      <td>{{ item.price }}</td>
      <td>{{ item.quantity }}</td>
      <td>{{ item.price * item.quantity }}</td>
      <td><button class = "remove" @click="removeItems(index)">Remove</button></td>
    </tr>

  </tbody>
  <button @click = "finalItems">finalise</button>

  <!-- <button @keyup.enter="onEnter">Add</button> -->
</template>

<script>
export default {
  data() {
    return {
      custName: null,
      custContact: null,
      clearInput: false,
      itemName: "",
      quantity: null,
      price: null,
      items: this.$store.state.items,
      metric:"",
      total:null,
      checkQuantity:"valid"
    };
  },
  methods: {

    addItems() {
      fetch("http://127.0.0.1:8000/removequantity",{
        method:"POST",
        headers:{
          "content-Type":"application/json"
        },
        body:JSON.stringify({
          name:this.itemName,
          metric:this.metric,
          quantity:this.quantity
        })
        })
        .then(response => {
          if(response.ok){
            return response.json()
          }else{
            throw new Error("please check the values you have entered")
          }
        })
        .then(data => {
          this.checkQuantity = data
          if(data=="valid"){
            console.log("move on")
            if (this.items === null) {
              this.$store.state.items = [
            { name: this.itemName, quantity: this.quantity, price: this.price,metric:this.metric },
          ];
          this.$store.state.items = this.items;
        } else {
          this.items.push({
            name: this.itemName,
            quantity: this.quantity,
            price: this.price,
            metric:this.metric
          });
          this.$store.state.items = this.items;
          this.itemName = ""
          this.quantity=""
          this.metric = ""
          this.price = null
        }

          }
        })
        .catch((error) => {
          this.checkQuantity = error.message
        })
    },
    removeItems(idx) {
      // console.log(this.items[idx].itemName)
      fetch("http://127.0.0.1:8000/addquantity",{
        method:"POST",
        headers:{
          "content-Type":"application/json"
        },
        body:JSON.stringify({
          name:this.items[idx].name,
          metric:this.items[idx].metric,
          quantity:this.items[idx].quantity
        })
      })
      this.items.splice(idx, 1);
      this.$store.state.items = this.items;
    },
    fetchPrice(){
      fetch("http://127.0.0.1:8000/getprice",{
        method:"POST",
        headers:{
          "content-Type":"application/json",
        },
        body:JSON.stringify({
          itemname:this.itemName,
          metric:this.metric 
        })
      })
      .then(response => {
        if(response.ok){
          return response.json()
        }
      })
      .then(data => {
        this.price= data.price
      })
    },
    finalItems(){
        if (this.items.length == 0){
            this.total = "please add items"
            this.$router.push("/finalbilling") 
            return this.$store.state.finalAmount = this.total
        }else{
            for(let i = 0; i<this.items.length; i++){
            console.log(this.items[i].price,this.items[i].quantity,this.items.length)
            this.total += this.items[i].price*this.items[i].quantity
        }
        this.$store.state.custName = this.custName
        this.$store.state.custContact = this.custContact
        this.$store.state.finalAmount = this.total
        this.$router.push("/finalbilling") 
        }
      }

  },
};
</script>

<style>
#quantitywarn {
  width:500px;
  background-color: red;
  display:inline-block;
  margin:10%;
  
}

td{
  font-size:25px;
  color:grey;
}
h2 {
  color:red;
}
.remove{
  background-color:blue;
  color:white;
}
#warn2{
  color:white;
  font-size:25px;
}

</style>
