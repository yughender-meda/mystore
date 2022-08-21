<template>
    <button @click = "isLogin">Login</button>
    <button @click = "isSignup">Signup</button>
</template>

<script>
export default{
    methods:{
        isLogin(){
            this.$router.push("/login")
        },
        isSignup(){
            this.$router.push("/signup")
        }
    }
}
</script>
