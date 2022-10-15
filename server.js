require("dotenv").config()
const cors = require("cors")
const db = require("./db")
const express = require("express")
const app = express()

//midlleware that prevents CORS error due the different ports of server and client
app.use(cors())

//buitin express middleware that attaches the posted object to the body of the request
app.use(express.json())


//get all milkshakes from database
app.get("/api/", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM milkshakes")
        
        res.json({
            milkshakes: results.rows
        })
    } catch (error) {
        console.log(error)
    }
})


//get an individual milkshake form the database
app.get("/api/milkshake/:id", async (req, res) => {
    try {
        const milkshake = await db.query("SELECT * FROM milkshakes WHERE id = $1", [req.params.id])
        const reviews = await db.query("SELECT * FROM milkshake_reviews WHERE milkshake_id = $1", [req.params.id])

        res.json({
            milkshake: milkshake.rows[0],
            reviews: reviews.rows
        })
    } catch (error) {
        console.log(error)
    }
})


//run server
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`server has started on port ${port}`))