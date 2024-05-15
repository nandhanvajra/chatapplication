const roomform=document.getElementById('roomform')
const roomjoin=document.getElementById('roomjoin')
//import socket from './socket.js'



roomform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formdata=new FormData(roomform)
    const roomname=formdata.get('room')
    console.log(roomname)
    
  //   console.log('client side socket.io established')
   // socket.emit('join room',roomname)

    location.href=`/home/${roomname}`


    

})


