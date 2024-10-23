const express = require('express')
const playlistsController = require('./controllers/playlists-controller')

const playlistsRouter = express.Router()

//GET ROUTES
playlistsRouter.get('/', playlistsController.index)
playlistsRouter.get('/:id', playlistsController.show)

//POST ROUTES
playlistsRouter.post('/:id/musics', playlistsController.addMusic)
playlistsRouter.post('/', playlistsController.save)

//PUT ROUTES
playlistsRouter.put('/:id', playlistsController.update)

//DELETE ROUTES
playlistsRouter.delete('/:id', playlistsController.delete)
playlistsRouter.delete('/:playlistId/musics/:musicId', playlistsController.removeMusic)


module.exports = playlistsRouter