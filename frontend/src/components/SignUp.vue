<template>
    <form @submit.prevent = "doSignup">
        <section>
            <div>
                <label>Name:</label>
                <input type = "text" name = "username" v-model.trim = "username" @blur="isUsernameValid"/>
                <p  class ="warn" v-if = "usernameValidity == 'invalid'">please enter valid username</p>
            </div>
            <div>
                <label>UserId:</label>
                <input type = "text" name = "userId" v-model.trim = "userid" @blur = "isUserIdValid" />
                <p class = "warn" v-if ="userIdValidity == 'invalid'">should contain atleast three characters</p>
            </div>
            <div>
                <label>Password:</label>
                <input type = "password" name = "password" v-model.trim = "password" @blur = "isPasswordValid"/>
                <p class = "warn" v-if = "passwordValidity == 'invalid'">should contain atleast five characters</p>
            </div>
            <div>
                <label>Contact:</label>
                <input type = "text" name="contact" v-model.trim ="contact" @blur = "isContactValid"/>
                <p class="warn" v-if = "contactValidity=='invalid'">Give proper contact Number</p>
            </div>
            <p class = "warn" v-if="signupReturn != 'ok'">{{ signupReturn }}</p>
            <div class = "gap">
                <button @click = "doSignUp">SignUp</button>
                <button @click = "backToLogin">Login</button>
            </div>
        </section>
    </form>
</template>

<script>
export default{
    data(){
        return{
            username:"",
            password:"",
            userid:"",
            contact:"",
            usernameValidity:null,
            passwordValidity:null,
            userIdValidity:null,
            contactValidity:null,
            signupReturn:null

        }
    },
    methods:{
        isUsernameValid(){
            if(this.username.length <= 3){
                this.usernameValidity = "invalid"
            }else{
                this.usernameValidity = "valid"
            }
        },
        isPasswordValid(){
            if(this.password.length <= 5){
                this.passwordValidity = "invalid"
            }else{
                this.passwordValidity = "valid"
            }
        },
        isUserIdValid(){
            if(this.userid.length < 3){
                this.userIdValidity = "invalid"
            }else{ 
                this.userIdValidity = "valid"
            }
        },
        isContactValid(){
            if(this.contact.length != 10 || isNaN(this.contact) == true ){
               console.log("dsad")
               this.contactValidity = 'invalid'
            }else{
                console.log("dsdasdas")
                this.contactValidity = 'valid'
            }

        },
        backToLogin(){
            this.$router.push("/login")
        },
        doSignUp(){
            if(this.usernameValidity=="invalid" & this.passwordValidity=="invalid"){
                this.invalidForm = true
                return;
             }
            console.log(this.username,this.userid,this.password)
            fetch("http://127.0.0.1:8000/signup",{
                method:"POST",
                headers:{
                    "content-Type":"application/json",
                },
                body:JSON.stringify({
                    name:this.username,
                    userid:this.userid,
                    password:this.password,
                    contact:7661069707
                })
                })
                .then(response =>{
                    if(response.ok){
                        return response.json()
                    }
                })
                .then(data => {
                    this.signupReturn = data
                    if(data =='ok'){
                        this.$router.push("/login")
                    }
                })
        }
        
    }
}
</script>
