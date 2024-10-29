module.exports = {

    //GET /api/welcome
    welcome: (req, res) => {
        const displayName = req.authenticatedUser?.name ?? "visitante"
        res.json({message: `Seja bem vindo(a), ${displayName}`})
    }
}