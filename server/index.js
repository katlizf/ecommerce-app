const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 4000
const sequelize = require('./sequelize')

app.use(express.json())
app.use(cors())


app.get('/api/getTitles', async (req, res) => {
    let allTitles = await sequelize.query(`
        SELECT * FROM anime;`)
        res.status(200).send(allTitles[0])
})

app.get('/api/getApparel', async (req, res) => {
    let allApparel = await sequelize.query(`
        SELECT * FROM products
        WHERE type = 1`)
        res.status(200).send(allApparel[0])
})

app.get('/api/getCollectables', async (req, res) => {
    let allCollectables = await sequelize.query(`
        SELECT * FROM products
        WHERE type = 2`)
        res.status(200).send(allCollectables[0])
})

app.get('/api/getProduct/:id', async (req, res) => {
    let {id} = req.params
    let product = await sequelize.query(`
        SELECT * FROM products
        WHERE id = ${id}`)
        res.status(200).send(product)
})

app.get('/api/getAnimeProducts', async (req, res) => {
    let animeProducts = await sequelize.query(`
        SELECT * FROM products
        JOIN anime
        WHERE products.id = anime.id`)
        res.status(200).send(animeProducts[0])
})



app.listen(PORT, () => console.log(`Server up on port ${PORT}`))