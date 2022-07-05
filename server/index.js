const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const PORT = process.env
const sequelize = require('./sequelize')

app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, '../build')))


app.get('/getTitles', async (req, res) => {
    let allTitles = await sequelize.query(`
        SELECT * FROM anime;`)
        res.status(200).send(allTitles[0])
})

app.get('/getApparel', async (req, res) => {
    let allApparel = await sequelize.query(`
    SELECT p.product_id, p.product_name, p.description, p.price, p.image, p.anime, a.name FROM products p
        JOIN anime a
        ON p.anime = a.anime_id
        WHERE type = 1;`)
        res.status(200).send(allApparel[0])
})

app.get('/getCollectables', async (req, res) => {
    let allCollectables = await sequelize.query(`
        SELECT p.product_id, p.product_name, p.description, p.price, p.image, p.anime, a.name FROM products p
        JOIN anime a
        ON p.anime = a.anime_id
        WHERE type = 2;`)
        res.status(200).send(allCollectables[0])
})

app.get('/getPrice', async (req, res) => {
    let price = await sequelize.query(`
        SELECT p.price FROM cart_items c
        JOIN products p
        ON c.product_number = p.product_id
        ;`)
        res.status(200).send(price[0])
})

app.post('/addToCart', async (req, res) => {
    let {prodId, custId} = req.body
    const inCart = await sequelize.query(`
        SELECT * FROM cart_items
        WHERE product_number = ${prodId}
        AND customer = ${custId};`)

    if (inCart[0].length === 0) { 
        await sequelize.query(`
            INSERT INTO cart_items (customer, product_number)
            VALUES (${custId},${prodId});`)
            res.status(200).send('Successfully added to cart!')
    } else {
        res.status(500).send('This product is already in your cart.')
    }
})

app.get('/getCartProducts', async (req, res) => {
    let cartProducts = await sequelize.query(`
        SELECT c.cart_item_id, c.customer, c.product_number, p.product_name, p.price, p.image FROM cart_items c
        JOIN products p
        ON c.product_number = p.product_id;`)
        res.status(200).send(cartProducts[0])
})

app.delete('/deleteProduct/:id', async (req, res) => {
    let {id} = req.params
    await sequelize.query(`
        DELETE FROM cart_items
        WHERE cart_items.cart_item_id = ${id}`)
        res.status(200)
})

app.post('/createShipment', async (req, res) => {
    let {address, city, state, zipCode, phone, firstName, lastName, email} = req.body
    await sequelize.query(`
        INSERT INTO shipments (address, city, state, zip_code, first_name, last_name, email, phone_number)
        VALUES ('${address}', '${city}', '${state}', ${zipCode}, '${firstName}', '${lastName}', '${email}', '${phone}');`)
        res.status(200)
})

app.delete('/emptyCart', async (req, res) => {
    await sequelize.query(`
        DELETE FROM cart_items;`)
        res.status(200)
})

app.post('/login', async (req, res) => {
    let {username, password} = req.body
    const userExists = await sequelize.query(`
        SELECT customer_id FROM customer c
        WHERE c.username = '${username}' 
        AND c.password = '${password}';`)
    
    if(userExists[0].length === 1) {
            res.status(200).send(userExists[0])
    } else {
        res.status(500).send("Sorry, we don't reconginze that username or password. Please try again or regiser as a new customer.")
    }
})

app.post('/register', async (req, res) => {
    let {username, password, firstName, lastName} = req.body
    await sequelize.query(`
        INSERT INTO customer (username, password, first_name, last_name)
        VALUES ('${username}', '${password}', '${firstName}', '${lastName}');`)
        res.status(200)
})


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})


app.listen(PORT, () => console.log(`Server up on port ${PORT}`))