module.exports = function(io) {
    console.log("Server socket initialised");
    io.on('connection', (socket) => {
        console.log('user connected');
        socket.on('addMessage', function(message) {

        });

        socket.on('join', function(data) {

            socket.join(data.selectedChannel);
            let room = data.selectedGroup + '-' +  data.selectedChannel 
            console.log(room);
            console.log(data.username + ' joined the room ' + room);
            socket.broadcast.to(room).emit('new user joined', {user:data.username, message:'has joined this channel'});

        });
    })
}