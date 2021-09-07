const { Router } = require("express");
const { saveJson, getJson } = require("../controllers/saveJson");

const router = Router();

router.post('/', saveJson);
router.get('/', getJson);

module.exports = router;