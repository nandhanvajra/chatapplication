const lfb=document.querySelector('.loginformblock')
const close=document.querySelector('.close')
const loginform=document.querySelector('#loginform')
const emaildexist=document.querySelector('#emaildexist')
const wrpass=document.querySelector('#wrpass')



close.addEventListener('click',()=>{
    window.location.href='/'
})
window.addEventListener('click', (e) => {
    if (!lfb.contains(e.target)) {    
       window.location.href='/'
    }
});


loginform.addEventListener('submit',(e)=>{
    e.preventDefault()

    //getting the form data
const formdata=new FormData(loginform)

const email=formdata.get('email')

const password=formdata.get('password')

console.log(`the email and password that iam sending are ${email,password}`)
//post request of login from c to s

fetch("/login",{
    method:'post',
    headers:{
        'Content-type':'application/json'
    },
    body:JSON.stringify({email,password})
})
.then((res)=>res.json())
.then((res)=>{
      
    emaildexist.textContent=res.result.email
    wrpass.textContent=res.result.password
    if(res.result.redirect){
        window.location.href=res.result.redirect
      }
})
.catch(err=>console.log(err))


})