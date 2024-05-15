const express=require('express')
const app=express()
const {Server}=require('socket.io')
const http=require('http')
const server=http.createServer(app)
const io=new Server(server)
const path=require('path')
const ejs=require('ejs')
const mongodburi='mongodb://localhost:27017/chatapp'
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const cookieparser=require('cookie-parser')


//using cookie parser
app.use(cookieparser())

//using body parser

 app.use(bodyparser.json())
 app.use(bodyparser.urlencoded({extended:true}))


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/javascripts', express.static(path.join(__dirname, 'public/javascripts')));


//connecting to the DB
mongoose.connect(mongodburi)
   .then(()=>{
    console.log("connected to the DB")
})


//creating a port and listining to the server
const port=3000
server.listen(port)

// handling get requests
app.use('/',require('./routes/home.js'))
app.use('/login',require('./routes/login.js'))
app.use('/signup',require('./routes/signup.js'))
app.use('/home',require('./routes/homepg.js'))
app.use('/logout',require('./routes/logout.js'))


// Serve CSS file with correct MIME type
app.get('/home/stylesheets/homepg.css', (req, res) => {
    res.type('text/css');
    res.sendFile(__dirname + '/public/stylesheets/homepg.css');
});

// Serve JavaScript file with correct MIME type
app.get('/home/javascripts/rooms.js', (req, res) => {
    res.type('text/javascript');
    res.sendFile(__dirname + '/public/javascripts/rooms.js');
});

// getting room info schema
const roominfoschema=require('./models/roominfo.js')


io.on('connection', (socket) => {
    console.log(`///the socket id is ${socket.id}`);
    socket.on('disconnect', () => {
        console.log('got disconnected');
    });
    try{
    socket.on('join room', (roomname) => {
        
        console.log(`////////////////room name is ${roomname}`)
        socket.join(roomname);
    });
    }
    catch(err){
        console.log(err)
    }

    socket.on('chat message', async(msg, room,username,time) => {
        if (room) {
            console.log(`room=${room} and msg=${msg}`)
            const isroompresent=await roominfoschema.findOne({roomname:room})
            if(isroompresent){
                
                  await roominfoschema.updateOne(
                    {roomname:room},
                    {$push:{messages:{
                        message:msg,
                        username:username,
                        time:time
                    }}}

                  )
            }
            else{

            const roominf=new roominfoschema({roomname:room,messages:[{message:msg,username:username,time:time}]})
            roominf.save()
            }
            io.to(room).emit('chat message', msg);
        }
    });
});

module.exports=io