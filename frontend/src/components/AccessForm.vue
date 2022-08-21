<template>
  <div id = "parent">
    <form @submit.prevent = "formValid">
        <section>
          <div>  
              <label>UserId:</label>
              <input type ="text" name = "userid" v-model.trim="username" @blur = "userIsValid"/>
              <p class = "warn" v-if = "usernameValidity=='invalid'">please enter username</p>
          </div>
          <div>
              <label>password:</label>
              <input type = "password"  v-model.trim="password" @blur = "passwordIsValid"/>
              <p class = "warn" v-if = "passwordValidity=='invalid'">please enter password</p>
          </div>
          <p class = "warn" v-if="invalidForm">one or more fields empty</p>
          <p class = "bigwarn" v-if="error != null">{{ error}}</p>
          <div class = "gap">
            <button>Login</button>
            <button @click = "goToSignup">Signup</button>
          </div>  
        </section> 
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      username:"",
      password:"",
      passwordValidity:null,
      usernameValidity:null,
      invalidForm:false,
      token :null,
      error: null

    }
  },
  methods:{
    passwordIsValid(){
      if(this.password == ""){
        this.passwordValidity = "invalid"
      }else{
        this.passwordValidity = "valid"
      }
    },
    userIsValid(){
      if(this.username == ""){
        this.usernameValidity = "invalid"
      }else{ 
        this.usernameValidity = "valid"
      }
    },
    formValid(){
      if(this.usernameValidity=="invalid" || this.passwordValidity=="invalid"){
        this.invalidForm = true
        return;
      }
      this.invalidForm =false
      fetch("http://127.0.0.1:8000/getuser",{
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          username:this.username,
          password:this.password
        })
        })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }else{
            throw new Error("Invalid Credentials")
          }
        })
        .then((data) => {
          this.$store.state.token = data.access_token
          console.log(this.$store.state.token)
          this.$router.push('/manage')
          this.$store.state.isLogin = false
        })
        .catch((error) => {
           console.log(error) 
           this.error = error.message
        })
      },
      goToSignup(){
        console.log("ok")
        this.$router.push("/signup")
      },
      tryLogin(){
        this.$router.push("/manage")
      }
    },
  }
</script>

<style>

form {
  margin: auto;
  padding: 1rem;
  vertical-align:middle;
}

label {
  font-weight:bold;
  font-size: 20px;
  width : 240px;
  display:inline-block;
  text-align:left;
  color: grey;
}
section {
  width:400px;
  display:inline-block;
  margin-left:50%;
  margin-right:50%;
  vertical-align:middle;
}

.gap {
  padding:20px;
} 
.link {
  padding:5px;
}

button {
  padding:10px;
  color:white;
  margin-right:10px;
  background-color: #4caf50;
  border-radius:10px;
  border-color:white

} 

input,textarea{
  border:2px solid blue;
  border-radius: 10px;
  height: 30px;
  width:300px;
  font-size:16px;
  font-weight: bold;
}

input:focus,
textarea:focus{
  border-color:yellow;
  border-width:2px;
  font-size: 18px;
  font-weight:bold;
}

p.warn {
  color:red;
  font-size: 12px;
  margin:1px;
  
}
p.bigwarn {
  color:red;
  font-size: 16px;
  margin:1px;
}

</style>