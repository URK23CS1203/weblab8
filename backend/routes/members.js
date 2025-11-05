const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/membersController');

router.post('/', ctrl.createMember);
router.get('/', ctrl.getMembers);
router.get('/:id', ctrl.getMember);
router.put('/:id', ctrl.updateMember);
router.delete('/:id', ctrl.deleteMember);

module.exports = router;
