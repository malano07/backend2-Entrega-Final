const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticket.controller');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/', authMiddleware, TicketController.createTicket);


router.get('/', authMiddleware, TicketController.getAllTickets);


router.get('/:id', authMiddleware, TicketController.getTicketById);


router.put('/:id', authMiddleware, TicketController.updateTicket);


router.delete('/:id', authMiddleware, TicketController.deleteTicket);

module.exports = router;
