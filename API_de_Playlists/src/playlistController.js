const playlists = []

module.exports = {
    
    // GET /playlists
    index: (req, res) => {
        res.json(playlists)
    },

    // GET /playlists/:id
    show: (req, res) => {
        const { id } = req.params

        const playlist = playlists.find(playlist => playlist.id === +id)

        if (!playlist) {
            res.status(404)
            res.json({message: "Playlist not found!"})
        } else{
            res.json(playlist)
        }
    },

    // POST /playlists
    save: (req, res) => {
        const { name, tags, songs } = req.body

        const newPlaylist = {
            id: Math.floor(Math.random() * 999999),
            name,
            tags,
            songs
        }
        
        playlists.push(newPlaylist)
        res.status(201)
        res.json(newPlaylist)
    },

    // PUT /playlists/:id
    update: (req, res) => {
        const { id } = req.params
        const { name, tags } = req.body
        
        const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)

        if (playlistIndex === -1) {
            return res.status(404).json({message: "Playlist not found!"})
        }

        playlists[playlistIndex].name = name
        playlists[playlistIndex].tags = tags

        res.status(201)
        res.json(playlists[playlistIndex])
    },

    // DELETE /playlists/:id
    delete: (req, res) => {
        const { id } = req.params
        
        const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)

        if (playlistIndex === -1) {
            return res.status(404).json({message: "Playlist not found!"})
        }

        playlists.splice(playlistIndex, 1)
        res.status(204).end()
    },

    // POST /playlists/:id/addSong
    addSong: (req, res) => {
        const { id } = req.params
        const { titulo, year, artist, album } = req.body
        
        if (!titulo || !year || !artist || !album) {
            return res.status(400).json({ message: "All song fields (titulo, year, artist, album) are required!" });
        }

        const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)

        const newSong = {
            titulo, 
            year, 
            artist, 
            album
        }

        if (playlistIndex === -1) {
            return res.status(404).json({message: "Playlist not found!"})
        }

        if (playlists[playlistIndex].songs.some(song => song.titulo === titulo)) {
            return res.status(400).json({message: "The song is already added!"})
        }
        
        playlists[playlistIndex].songs.push(newSong)
        res.status(201)
        res.json(playlists[playlistIndex].songs)
    },

    // DELETE /playlists/:id/deleteSong
    deleteSong: (req, res) => {
        const { id } = req.params
        const { titulo } = req.body
        
        const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)
        const playlistSongIndex = playlists[playlistIndex].songs.findIndex(song => song.titulo === titulo)

        if (playlistIndex === -1) {
            return res.status(404).json({message: "Playlist not found!"})
        }

        if (playlistSongIndex === -1) {
            return res.status(404).json({message: "Song not found!"})
        }

        playlists[playlistIndex].songs.splice(playlistSongIndex, 1)
        res.status(204).end() 
    }
    
}

