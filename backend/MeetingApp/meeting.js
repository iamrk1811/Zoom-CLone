const meeting = (io) => {
    io.on('connection', socket => {
        socket.on('user-join-room', (roomId, userId) => {
            socket.join(roomId);
            // socket.to(roomId).emit('new-user-connected', userId)
            socket.broadcast.to(roomId).emit('new-user-connected', userId);
    
            // socket.on('disconnect', () => {
            //     socket.to(roomId).broadcast.emit('user-disconnected', userId)
            // });
        })
    })
}

module.exports = meeting;