const express = require('express');
const router = express.Router({
    mergeParams: true
});
const db = require("../data/db.js")
router.use(express.json())


// create comment for post with specified id

router.post("/:id/comments", (req, res) => {
    const comment = req.body.text;
    const id = req.params.id;
    if (id) {
    db.insertComment({text: comment, post_id: id})
        .then(response => {
            res.status(200).json({ 
                message: "Successful",
                commentId: response.id
            });
        }).catch(error => {
            console.log(error)
        })
    }
})

// get all comments for posts with specific id

router.get("/:id/comments", (req, res) => {
    db.findPostComments(req.params.id)
    .then((comments) => {
        if(comments.length) {
        res.json(comments)
    }
    else {
        res.status(404).json({ message : "The post with the specified ID does not exist"})

    }

    })
    .catch((error) => {
        res.status(500).json({  error: "The posts information could not be retrieved." })
    })
})
