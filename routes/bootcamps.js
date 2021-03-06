const express = require('express');
const router = express.Router();
const { getBootcamps,
         getBootcamp,
         createBootcamp,
         updateBootcamp,
         deleteBootcamp,
         getBootcampsInRadius
        } = require('../controllers/bootcamps')

// Include Other resource Routers
const courseRouter = require('./courses');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

//Route BootCamp
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
      .route('/')
      .get(getBootcamps)
      .post(createBootcamp);

router
      .route('/:id')
      .get(getBootcamp)
      .put(updateBootcamp)
      .delete(deleteBootcamp);




module.exports = router;