const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const PORT = process.env.PORT 
// const PORT = 4000
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
        AND cart_items.customer = ${custId};`)

    if (inCart[0].length === 0) { 
        await sequelize.query(`
            INSERT INTO cart_items (customer, product_number)
            VALUES (${custId}, ${prodId});`)
            res.status(200).send('Successfully added to cart!')
    } else {
        res.status(500).send('Oops! This product is already in your cart.')
    }
})

app.get('/getCartProducts/:custId', async (req, res) => {
    let {custId} = req.params
    let cartProducts = await sequelize.query(`
        SELECT c.cart_item_id, c.customer, c.product_number, p.product_name, p.price, p.image FROM cart_items c
        JOIN products p
        ON c.product_number = p.product_id
        WHERE c.customer = ${custId};`)
        res.status(200).send(cartProducts[0])
})

app.delete('/deleteProduct/:custId/:id', async (req, res) => {
    let {custId, id} = req.params
    await sequelize.query(`
        DELETE FROM cart_items
        WHERE cart_items.customer = ${custId}
        AND cart_item_id = ${id};`)
        res.status(200)
})

app.post('/createShipment', async (req, res) => {
    let {loggedInUser, enteredAddress, enteredCity, enteredState, enteredZipCode, enteredPhone, enteredFirstName, enteredLastName, enteredEmail, enteredCardName, enteredCardNumber, enteredCardType, enteredExpiration, enteredSSN} = req.body
    await sequelize.query(`
        INSERT INTO shipments (customer, address, city, state, zip_code, first_name, last_name, email, phone_number, name_on_card, card_number, card_type, expiration, ssn)
        VALUES (${loggedInUser}, '${enteredAddress}', '${enteredCity}', '${enteredState}', ${enteredZipCode}, '${enteredFirstName}', '${enteredLastName}', '${enteredEmail}', ${enteredPhone}, '${enteredCardName}', '${enteredCardNumber}', '${enteredCardType}', '${enteredExpiration}', ${enteredSSN});`)
        res.status(200)
})

app.delete('/emptyCart/:custId', async (req, res) => {
    let {custId} = req.params
    await sequelize.query(`
        DELETE FROM cart_items
        WHERE cart_items.customer = ${custId};`)
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
    let {enteredUsername, enteredPassword, enteredFirstName, enteredLastName} = req.body
    await sequelize.query(`
        INSERT INTO customer (username, password, first_name, last_name)
        VALUES ('${enteredUsername}', '${enteredPassword}', '${enteredFirstName}', '${enteredLastName}');`)
        res.status(200)
})


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})


app.listen(PORT, () => console.log(`Server up on port ${PORT}`))