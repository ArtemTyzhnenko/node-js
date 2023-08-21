const express = require("express")
const {getAll, save, get, update, remove} = require("../controllers/recipes")
const auth = require("../middleware/auth");

const router = express.Router();

// You'll add route handlers here in subsequent tasks
// router.get("/", getAll);
// router.post("/", save);
// router.get("/:id", get)
// router.put("/:id", update)
// router.delete("/:id", remove);

// Route `GET` and `POST` HTTP requests for `/`
router.route("/").get(getAll).post(auth.authenticate(), save);

// Route `GET`, `PUT`, and `DELETE` HTTP requests for `api/v1/recipes/:id`
router.route("/:id").get(get).put(auth.authenticate(), update).delete(auth.authenticate(), remove);

module.exports = router;