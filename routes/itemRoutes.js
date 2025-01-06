const express = require('express');
const {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
} = require('../controllers/itemController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/items', async (req, res) => {
    const db = req.app.locals.db;
    await createItem(req, res, db);
});

router.get('/items', async (req, res) => {
    
    const db = req.app.locals.db;
    await getItems(req, res, db);
});
router.get('/items/:id', verifyToken, async (req, res) => {
    const db = req.app.locals.db;
    await getItemById(req, res, db);
});
router.put('/items/:id', async (req, res) => {
    const db = req.app.locals.db;
    await updateItem(req, res, db);
});
router.delete('/items/:id', verifyToken, async (req, res) => {
    const db = req.app.locals.db;
    await deleteItem(req, res, db);
});
// Similarly, define other routes

module.exports = router;
