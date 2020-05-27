const router = require("express").Router();
const db = require("./userDb");
const {validateLoggedIn, validateUserEditSelf} = require("../auth/middleware")

router.get("/:id", (req, res) => {
  db.getById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) =>
      res.status(500).json({ error: `Error connecting to database, ${err}` })
    );
});

router.delete("/:id", validateLoggedIn, validateUserEditSelf, (req, res) => {
  db.remove(req.params.id).then(count => {
    if (count === 1) {
      res.status(204).send()
    } else {
      res.status(500).json({error: "User couldn't be deleted"})
    }
  })
    .catch(err => {
      res.status(500).json({ error: "Error connecting to database" })
    })
});

module.exports = router;
