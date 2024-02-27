const router = require('express').Router();
// const courseRoutes = require('./courseRoutes');
// const studentRoutes = require('./studentRoutes');

const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// router.use('/courses', courseRoutes);
// router.use('/students', studentRoutes);

module.exports = router;
