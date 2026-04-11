const router = require('express').Router();
const { claimCertificate, myCertificates, verifyCertificate } = require('../controllers/certificateController');
const { protect, authorize } = require('../middleware/auth');

router.get('/my',              protect, authorize('student'), myCertificates);
router.get('/verify/:certId',  verifyCertificate);
router.post('/claim/:courseId',protect, authorize('student'), claimCertificate);

module.exports = router;
