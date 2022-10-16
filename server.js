require("dotenv").config()
const cors = require("cors")
const db = require("./db")
const express = require("express")
const app = express()

//midlleware that prevents CORS error due the different ports of server and client
app.use(cors())

//buitin express middleware that attaches the posted object to the body of the request
app.use(express.json())


//get all milkshakes
app.get("/api/", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM milkshakes LEFT JOIN (SELECT milkshake_id, TRUNC(AVG(reviewer_rating), 1) AS average_rating, COUNT(review_id) AS total_ratings FROM milkshake_reviews GROUP BY milkshake_id) milkshake_reviews ON milkshakes.id = milkshake_reviews.milkshake_id")
        
        res.json({
            milkshakes: results.rows
        })
    } catch (error) {
        console.log(error)
    }
})

//get an individual milkshake
app.get("/api/milkshake/:id", async (req, res) => {
    try {
        const milkshake = await db.query("SELECT * FROM milkshakes LEFT JOIN (SELECT milkshake_id, TRUNC(AVG(reviewer_rating), 1) AS average_rating, COUNT(review_id) AS total_ratings FROM milkshake_reviews GROUP BY milkshake_id) milkshake_reviews ON milkshakes.id = milkshake_reviews.milkshake_id WHERE id = $1", [req.params.id])
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