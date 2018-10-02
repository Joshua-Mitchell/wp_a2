module.exports = function(io) {
    console.log("Server socket initialised");
    io.on('connection', (socket) => {
        console.log('user connected');
        socket.on('addMessage', function(message) {

        });

        socket.on('join', function(data) {
            let room = data.selectedGroup + '-' +  data.selectedChannel 
            socket.join(room);
            
            console.log(data.username + ' joined the room : ' + room);
            socket.broadcast.to(room).emit('newUser', {user:data.username, message:'has joined this channel'});

        });
        socket.on('leave', function(data) {
            let room = data.selectedGroup + '-' +  data.selectedChannel 
            
            console.log(data.username + ' left the room : ' + room);

            socket.broadcast.to(room).emit('leave Room', {user:data.username, message:'has left this channel'});
            socket.leave(room);
        });

        socket.on('message', function(data) {
            let room = data.selectedGroup + '-' +  data.selectedChannel
            
            console.log(data);
            io.in(room).emit('receive message', {user:data.username, message:data.message});
        })
    })
}