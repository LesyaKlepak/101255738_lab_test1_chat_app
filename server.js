//console.log('Welcome to socket programming')
const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const express = require('express')
const mongoose  = require('mongoose')
const usersModel = require('./model/users')
const PORT = 3000



//mongodb
mongoose.connect('mongodb+srv://Lesya:October2021@COMP3123.pe9rd.mongodb.net/COMP3123?retryWrites=true&w=majority',
    {useNewUrlParser: true});
//Create Server Socket
const io = require('socket.io')(http)



app.use(express.json())
//user list
users = []

app.get("/", (req, res) => {
    res.send("Chat Server running...")
})


app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//new request
io.on('connection', (socket) => {
    console.log('Connected ')
    
    socket.emit( + socket.id)
   

    //Custom message event to socket
    socket.on('message', (data) => {
        const msg = {
            sender: socket.id,
            message: data
        }
        io.sockets.emit('newMessage', msg)

    })

    //Get User name
    socket.on('newUser', (name) => {
        console.log(name)
        users.push(name)
        console.log(users)
    })


    socket.on('room_message', (data) =>{   
        const msg = {
            sender: socket.id,
            message: data.message
        }
        socket.broadcast.to(data.room).emit('newMessage', msg)
    })
   

    socket.on('join', (roomName) => {
        socket.join(roomName)
        const msg = {
            sender: socket.id,
            message: 'Joined the room '
        }
        io.sockets.emit('newMessage', msg)
    })
   

    //Disconnected
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })
})

http.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})