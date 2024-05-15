const sfb=document.querySelector('.signupformblock')
const closesignup=document.querySelector('.closesignup')
const signupform=document.querySelector('#signupform')
const passerr=document.querySelector('#passerr')
const confirmpasserr=document.querySelector('#confpasserr')
const emailallexisterr=document.querySelector('#emailallexist')



closesignup.addEventListener('click',()=>{
    window.location.href='/'
})
window.addEventListener('click', (e) => {
    if (!sfb.contains(e.target)) {    
       window.location.href='/'
    }
});
signupform.addEventListener('submit',(e)=>{
    emailallexisterr.textContent=''
    confirmpasserr.textContent=''
    passerr.textContent=''
    e.preventDefault();
    const formdata=new FormData(signupform);
    const username=formdata.get('username');
    const email=formdata.get('email');
    const password=formdata.get('password');
    const confirmpassword=formdata.get('confirmpassword');
    fetch('/signup',{
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({username,email,password,confirmpassword})
    })
    .then((res)=>res.json())
    .then((res)=>{
   
       
        passerr.textContent=res.errors.password
       
        confirmpasserr.textContent=res.errors.passerr
        
            emailallexisterr.textContent=res.errors.email

      if(res.errors.redirect){
        window.location.href=res.errors.redirect
      }
        
    })
    .catch(err=>console.log(err))
})