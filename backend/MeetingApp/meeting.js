const meeting = (io) => {
    io.on('connection', socket => {
        socket.on('user-join-room', (roomId, userId) => {
            // join room with ROOM ID
            socket.join(roomId);
            // emit an event when a new user connected to the same ROOM ID
            socket.broadcast.to(roomId).emit('new-user-connected', userId);

            // when we rcv a message from a user
            socket.on('message', (message) => {
                io.to(roomId).emit('createMessage', message, userId)
            })
            
            
            // when a user click end call button
            socket.on('user-self-call-end', () => {
                socket.broadcast.to(roomId).emit('user-disconnected-manually', userId);
            });

            // when a user close the window
            socket.on('disconnect', () => {
                socket.broadcast.to(roomId).emit('user-disconnected', userId);
            });
        })
    })
}

module.exports = meeting;