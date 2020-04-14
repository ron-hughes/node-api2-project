const express = require("express")
const router = express.Router()
const commentsRouter = require("./comments-router");

const db = require("../data/db.js")


// Get requests
// get all posts
router.get("/", (req, res) => {
  db.find()
  .then((posts) => {
      res.status(200).json(posts)
  })
  .catch((error) => {
      res.status(500).json({ error: "The posts information could not be retrieved."})
  })
} )

// get posts with specified id
router.get("/:id", ( req, res) => {
    const { id } = req.params
    db.findById(id)
    .then((post) => {
        if(post.length) {
            res.json(post)
        }
        else {
            res.status(404).json({ message: "User Id does not exist"})
        }    
    })

    .catch((error) => {
        res.status(500).json({  error: "The posts information could not be retrieved." })
    })
})



// POST REQUESTS
// create post with information inside of body

router.post("/", (req, res) => {
    const { title, contents } = req.body
    if (!title || !contents ) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
    else {
        db.insert(req.body)
        .then((post) => {
            res.status(201).json(req.body)
        })
        .catch((error) => {
            res.status(500).json({  error: "The posts information could not be retrieved." })
        })
    }
})





module.exports = router