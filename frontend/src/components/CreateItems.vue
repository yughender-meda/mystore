<template>
  <div>
    <label>name</label>
    <input type="text" v-model="name" />
  </div>
  <div>
    <label>price</label>
    <input type="numbers" v-model="price" />
  </div>
  <div>
    <label>quantity</label>
    <input type="numbers" v-model="quantity" />
  </div>
  <div>
    <label>metric</label>
    <input type="text" v-model="metric" />
  </div>
  <p id = "output">{{ output }}</p>
  <p id = "error">{{ error }}</p>
  <div class = "gap">
  <button @click="createItem">create</button>
  <button @click="updateItem">update</button>
  <button @click="deleteItem">delete</button><br/>
  <button @click="getAll">Get All</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      quantity: "",
      price: "",
      metric: "",
      output:null,
      error:null
    };
  },
  methods: {
    createItem() {
      this.output = null
      this.error = null
      console.log(this.name,this.quantity,this.price)
      fetch("http://127.0.0.1:8000/add_item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.state.token}`
        },
        body: JSON.stringify({
          name: this.name,
          quantity: this.quantity,
          price: this.price,
          metric: this.metric
        }),
      })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }else{
          throw new Error("please check the values you have entered")
        }
      })
      .then(data => {
        this.output = data
      })
      .catch(error => {
        this.error = error.message
      })
      
    },
    updateItem() {
      this.output = null
      this.error = null
      fetch("http://127.0.0.1:8000/update_items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.state.token}`
        },
        body: JSON.stringify({
          name: this.name,
          quantity: this.quantity,
          price: this.price,
          metric: this.metric,
        }),
      })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }else{
          throw new Error("please check the values you have entered")
        }
      })
      .then(data => {
        this.output = data
      })
      .catch(error => {
        this.error = error.message
      })
    },
    deleteItem() {
      fetch("http://127.0.0.1:8000/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.state.token}` 
        },
        body: JSON.stringify({
          name: this.name,
          metric: this.metric
        }),
      })
      .then(response => {
        if(response.ok){
          return response.json()
        }
      })
      .then(data => {
        this.output = data
      })
    },
    getAll(){
      this.$router.push("/getall")
    }
  },
};
</script>

<style>
#output {
  color:blue;
  font-size:16px;
}
#error {
  color: red;
  font-size:18px;
}


</style>
