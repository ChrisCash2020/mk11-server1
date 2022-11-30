const express = require('express');
const postControllers = require('../controllers/postControllers');
const router = express.Router();

router
  .route('/')
  .get(postControllers.getAllPostsNames)
  .post(postControllers.createNewPost);

router
  .route('/:id')
  .get(postControllers.getPostById)
  .post(postControllers.updatePostRecords);

router.route('/delete/:id').post(postControllers.deletePost);
module.exports = router;
