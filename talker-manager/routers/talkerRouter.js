const router = require('express').Router();

const {
  getAllTalkers,
  getTalkerById,
  authoTalker,
  addTalker,
  validName,
  validAge,
  validTalk1,
  validTalk2,
  editTalker,
  deleteTalker,
  searchTalker,
} = require('../middlewares');

// Requisito 7
router.get(
  '/search',
  authoTalker,
  searchTalker,
);

// Requisito 1
router.get('/', getAllTalkers);

// Requisito 2
router.get('/:id', getTalkerById);

// Requisito 4
router.post(
  '/',
  authoTalker,
  validName,
  validAge,
  validTalk1,
  validTalk2,
  addTalker,
);

// Requisito 5
router.put(
  '/:id', 
  authoTalker,
  validName,
  validAge,
  validTalk1,
  validTalk2,
  editTalker,
);

// Requisito 6
router.delete(
  '/:id', 
  authoTalker,
  deleteTalker,
);

module.exports = router;

// 1. npm test getAllTalkers.test.js / http GET :3000/talker/

// 2. npm test getTalkerById.test.js / http GET :3000/talker/1

// 4. npm test createTalker.test.js / http POST :3000/talker/ Authorization:"7mqaVRXJSp886CGr" name="Danielle Santos" age:=56   talk={"watchedAt": "22/10/2019","rate": 5}

// 5. npm test editTalker.test.js / http PUT :3000/talker/1 Authorization:"7mqaVRXJSp886CGr" name="Amos Santos" age:=38 talk="{"watchedAt": "25/12/2021","rate": 10}"

// 6. npm test deleteTalker.test.js / http DELETE :3000/talker/1 Authorization:"7mqaVRXJSp886CGr" 

// 7. npm test searchTalker.test.js / http GET :3000/talker/search q==M Authorization:"7mqaVRXJSp886CGr" 