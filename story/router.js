const router = require("express").Router();
const db = require("./storyDb");
const { validateStoryId, validateLoggedIn, validateUserEditStory } = require("../auth/middleware");


//stories
router.get("/", (req, res) => {
  db.get()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "error connecting to database" });
    });
});

router.get("/:id", validateStoryId, (req, res) => {
  res.status(200).json(req.story);
});

router.post("/", validateLoggedIn, (req, res) => {
    const story = req.body
  story.user_id = req.token.subject
  story.date = new Date().toDateString()
    db.insert(story)
      .then((result) => {
        res.status(201).send();
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({ error: "error connecting to database" });
      });
});


router.put("/:id", validateStoryId, validateLoggedIn, validateUserEditStory, (req, res) => {
 db
    .update(Number(req.params.id), req.body)
    .then((result) => {
      if (result === 1) {
        res.status(202).send();
      } else {
        res.status(500).json({ error: "Error Updating Story" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error connecting to database" });
    });
});


router.delete("/:id", validateStoryId, validateLoggedIn, validateUserEditStory, (req, res) => {
  db.remove(Number(req.params.id))
    .then((result) => {
      if (result === 1) {
        res.status(202).send();
      } else {
        res.status(500).json({ error: "error deleting story" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error connecting to database" });
    });
});



module.exports = router;
