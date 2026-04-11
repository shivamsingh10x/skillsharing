const router = require('express').Router();
const { getNotifications, markAllRead, deleteNotification } = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

router.get('/',           protect, getNotifications);
router.put('/read-all',   protect, markAllRead);
router.delete('/:id',     protect, deleteNotification);

module.exports = router;
