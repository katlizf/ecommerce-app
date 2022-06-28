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
        JOIN anime
        ON products.anime = anime.id
        WHERE type = 1;`)
        res.status(200).send(allApparel[0])
})

app.get('/api/getCollectables', async (req, res) => {
    let allCollectables = await sequelize.query(`
        SELECT * FROM products
        JOIN anime
        ON products.anime = anime.id
        WHERE type = 2;`)
        res.status(200).send(allCollectables[0])
})

app.post('/api/addToCart', async (req, res) => {
    let {id} = req.body
    const inCart = await sequelize.query(`
        SELECT * FROM cart_items
        WHERE product_number = ${id};`)

    if (inCart[0].length === 0) { 
        await sequelize.query(`
            INSERT INTO cart_items (product_number)
            VALUES (${id});`)
            res.status(200)
    } else {
        res.send('This Product is already in your cart')
    }
})

app.get('/api/getCartProducts', async (req, res) => {
    let cartProducts = await sequelize.query(`
        SELECT * FROM cart_items
        JOIN products
        ON cart_items.product_number = products.id;`)
        res.status(200).send(cartProducts[0])
})

app.post('/api/login', async (req, res) => {
    let {username, password} = req.body
    const userExists = await sequelize.query(`
        SELECT * FROM customer
        WHERE customer.username = ${username}`)
    
    if(userExists[0].length === 0) {
        await sequelize.query(`
            INSERT INTO customer (username, password)
            VALUES ('${username}, '${password}');`)
            res.send(200).send('Thanks for logging in!')
    } else {
        res.send('Please choose a different username')
    }
})


app.listen(PORT, () => console.log(`Server up on port ${PORT}`))