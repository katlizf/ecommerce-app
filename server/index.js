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
    SELECT p.id, p.product_name, p.description, p.price, p.image, p.anime, a.name FROM products p
        JOIN anime a
        ON p.anime = a.id
        WHERE type = 1;`)
        res.status(200).send(allApparel[0])
})

app.get('/api/getCollectables', async (req, res) => {
    let allCollectables = await sequelize.query(`
        SELECT p.id, p.product_name, p.description, p.price, p.image, p.anime, a.name FROM products p
        JOIN anime a
        ON p.anime = a.id
        WHERE type = 2;`)
        res.status(200).send(allCollectables[0])
})

app.get('/api/getPrice', async (req, res) => {
    let price = await sequelize.query(`
        SELECT p.price FROM cart_items c
        JOIN products p
        ON c.product_number = p.id
        ;`)
        res.status(200).send(price[0])
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
            res.status(200).send('Successfully added to cart!')
    } else {
        res.status(500).send('This product is already in your cart')
    }
})

app.get('/api/getCartProducts', async (req, res) => {
    let cartProducts = await sequelize.query(`
        SELECT c.id, c.customer, c.product_number, p.product_name, p.price, p.image FROM cart_items c
        JOIN products p
        ON c.product_number = p.id;`)
        res.status(200).send(cartProducts[0])
})

app.delete('/api/deleteProduct/:id', async (req, res) => {
    let {id} = req.params
    await sequelize.query(`
        DELETE FROM cart_items
        WHERE cart_items.id = ${id}`)
        res.status(200)
})

app.post('/api/createShipment', async (req, res) => {
    let {address, city, state, zipCode, phone, firstName, lastName, email} = req.body
    await sequelize.query(`
        INSERT INTO shipments (address, city, state, zip_code, first_name, last_name, email, phone_number)
        VALUES ('${address}', '${city}', '${state}', ${zipCode}, '${firstName}', '${lastName}', '${email}', '${phone}');`)
        res.status(200)
})

app.delete('/api/emptyCart', async (req, res) => {
    await sequelize.query(`
        DELETE FROM cart_items;`)
        res.status(200)
})

// app.post('/api/login', async (req, res) => {
//     let {username, password} = req.body
//     const userExists = await sequelize.query(`
//         SELECT * FROM customer
//         WHERE customer.username = ${username}`)
    
//     if(userExists[0].length === 0) {
//         await sequelize.query(`
//             INSERT INTO customer (username, password)
//             VALUES ('${username}, '${password}');`)
//             res.send(200).send('Thanks for logging in!')
//     } else {
//         res.send('Please choose a different username')
//     }
// })


app.listen(PORT, () => console.log(`Server up on port ${PORT}`))