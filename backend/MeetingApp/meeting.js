const meeting = (io) => {
    io.on('connection', socket => {
        socket.on('user-join-room', (roomId, userId) => {
            socket.join(roomId);
            // socket.to(roomId).emit('new-user-connected', userId)
            socket.broadcast.to(roomId).emit('new-user-connected', userId);
    
            socket.on('message', (message) => {
                io.to(roomId).emit('createMessage', message, userId)
            })

            socket.on('disconnect', () => {
                socket.broadcast.to(roomId).emit('user-disconnected', userId);
            });


        })
    })
}

module.exports = meeting;