const roomform=document.getElementById('roomform')
const roomjoin=document.getElementById('roomjoin')
const msg=document.querySelector('#msg')
const sendmsg=document.querySelector('#sendmsg')
const msgs=document.querySelector('.msgs')
const username=document.querySelector('.username')
const userinfoS=username.getAttribute('data-userinfo')
let time=document.querySelector('.time')
const message=document.querySelector('.message')
var socket=io()

console.log(`///////////// the userinfoS is ${userinfoS}////////`)
let currURL=window.location.href
    console.log(currURL)
    let roomid=currURL.split('/')[4]
    console.log(roomid)
    socket.emit('join room',roomid)

roomform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formdata=new FormData(roomform)
    const roomname=formdata.get('room')
    console.log(`/////${roomname}////`)
  

    location.href=`/home/${roomname}`

})

//for socket.io



sendmsg.addEventListener('submit',(e)=>{
    e.preventDefault()
   const currentTime = new Date();

// Get the current time
const hours = String(currentTime.getHours()).padStart(2, '0');
const minutes = String(currentTime.getMinutes()).padStart(2, '0');

const year = currentTime.getFullYear();
const month = String(currentTime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(currentTime.getDate()).padStart(2, '0');

// Form the date string
const formattedDate = `${day}/${month}/${year}`


    const formattedTime = `${hours}:${minutes}`;

    time=`${formattedTime}  ${formattedDate}`
    console.log(`the time is ${time}`)
    let username=userinfoS
      

    const msgcont=msg.value;
    console.log(`message content is ${msgcont}`)
   console.log(`room details are ${roomid}`)
   
  socket.emit('chat message',msgcont,roomid,username,time)
  msg.value=''
})


socket.on('chat message',(msg)=>{
    console.log(msg)

   
    let username=userinfoS
    console.log(`the username is ${username}`)
        const chatblock=document.createElement('div')
     
        chatblock.className='chatblock'
        chatblock.textContent=msg
      msgs.append(chatblock)
      message.append(msgs)
})







