/*const login=document.querySelector('.login')
const signup=document.querySelector('.signup')
const sfb=document.querySelector('.signupformblock')
const close=document.querySelector('.close')
const lfb=document.querySelector('.loginformblock')
const closesignup=document.querySelector('.closesignup')
const signupform=document.querySelector('#signupform')
const loginform=document.querySelector('#loginform')



// handling signup form process
signup.addEventListener('click',(e)=>{
   
      sfb.style.display='block';

      
    
})
closesignup.addEventListener('click',()=>{
    sfb.style.display='none'

})
window.addEventListener('click', (e) => {
    if (!sfb.contains(e.target) && e.target !== signup) {    
        sfb.style.display = 'none';
    }
});

// handling post requests

signupform.addEventListener('submit',(e)=>{
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
    .then((res)=>res.json)
    .then((res)=>{
        console.log(res)
    })
    .catch(err=>console.log(err))
})





//handling login form 

login.addEventListener('click',(e)=>{
   
      lfb.style.display='block';

      
    
})
window.addEventListener('click', (e) => {
    if (!lfb.contains(e.target) && e.target !== login) {    
        lfb.style.display = 'none';
    }
});
close.addEventListener('click',()=>{
    lfb.style.display='none'

})*/
