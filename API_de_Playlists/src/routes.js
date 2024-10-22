const express = require('express')
const playlistController = require('./playlistController')

const router = express.Router()

//GET ROUTES
router.get("/playlists", playlistController.index)
router.get("/playlists/:id", playlistController.show)

//POST ROUTES
router.post("/playlists", playlistController.save)
router.post("/playlists/:id/addSong", playlistController.addSong)

//PUT ROUTES
router.put("/playlists/:id", playlistController.update)

//DELETE ROUTES
router.delete("/playlists/:id", playlistController.delete)
router.delete("/playlists/:id/deleteSong", playlistController.deleteSong)

module.exports = router