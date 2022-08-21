<template>
  <table style="width:100%">
    <button @click="fetchData">GetAll</button>
    <tr>
      <th>name</th>
      <th>price</th>
      <th>quantity</th>
    </tr>
    <tr v-for="result in results" :key = result>
      <td>{{ result.name }}</td>
      <td>{{ result.price }}</td>
      <td>{{ result.quantity }}</td>
    </tr>
  </table>    
</template>

<script>
export default{
    data(){
      return{
        results:[]
        }
    },
    methods:{
      fetchData(){
        const headers = { Authorization: `Bearer ${this.$store.state.token}` };
        fetch("http://127.0.0.1:8000/all_items", {
          method: "POST",
          headers: headers
        })
        .then((response) => {
          if(response.ok){
            return response.json()
          }
        })
        .then((data) => {
            console.log(data)
            const results = [];
            for (const id in data) {
                results.push({
                    id:id,
                    name:data[id].name,
                    quantity:data[id].quantity,
                    price:data[id].price
                })
            }
            this.results = results;
        });
      }
    }
}

</script>

<style scoped>
td {
  color:red;
  font-size:20px;
}
tr {
  color:blue;
  font-size: 25px;
}

</style>




