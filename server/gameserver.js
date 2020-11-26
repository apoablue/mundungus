const gameserver = exports

const socketio = require('socket.io')

let io
const userSocketIdMap = new Map()
const gameNamesData = {}

/* Connection listener called when server starts */
gameserver.setServer = (server) => {
  io = socketio(server)

  io.sockets.on('connection', (socket) => {
    gameserver.handleJoin(socket)
    socket.on('disconnect', () => {
      gameserver.removeClientFromMap(socket.nickname, socket.id)
    })
  })
}

gameserver.handleJoin = (socket) => {
  console.log('Player joined', socket.id)
  gameserver.addListeners(socket)
}

gameserver.addListeners = (socket) => {
  socket.on('setUsername', username => {
    socket.nickname = username
    gameserver.addClientToMap(username, socket.id)
  });

  socket.on('newGame', gameId => {
    gameserver.startNewGame(gameId)
  });

  socket.on('submitNames', ioObject => {
    gameserver.addNamesToDataset(ioObject.names, ioObject.gameId)
  });
}

gameserver.addClientToMap = (userName, socketId) => {
  if (!userSocketIdMap.has(userName)) {
    // user is joining for the first time
    userSocketIdMap.set(userName, new Set([socketId]));
  } else {
    // user already joined from one client and is now joining from another client
    userSocketIdMap.get(userName).add(socketId);
  }
  io.emit('onUserUpdate', Array.from(userSocketIdMap.keys()))
}

gameserver.removeClientFromMap = (userName, socketId) => {
  if (userSocketIdMap.has(userName)) {
    let userSocketIdSet = userSocketIdMap.get(userName);
    userSocketIdSet.delete(socketId);
    //if there are no clients for a user, remove that user from online list (map)
    if (userSocketIdSet.size === 0 ) {
      userSocketIdMap.delete(userName);
    }
  }
  io.emit('onUserUpdate', Array.from(userSocketIdMap.keys()))
}

gameserver.startNewGame = (gameId) => {
  io.emit('startNewGame', gameId)
}

gameserver.addNamesToDataset = (names, gameId) => {
  const existingNames = gameNamesData[gameId]
  if (existingNames && existingNames.length > 0) {
    gameNamesData[gameId] = existingNames.concat(names)
  } else {
    gameNamesData[gameId] = names 
  }
  io.emit('onNamesUpdate', gameNamesData
  
  [gameId])
}