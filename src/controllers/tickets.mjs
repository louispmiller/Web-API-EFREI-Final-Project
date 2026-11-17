import TicketModel from '../models/ticket.mjs';

const Tickets = class Tickets {
  constructor(app, connect) {
    this.app = app;
    this.TicketModel = connect.model('Ticket', TicketModel);

    this.run();
  }

  create() {
    this.app.post('/tickets', async (req, res) => {
      try {
        const ticket = await this.TicketModel.create(req.body);

        res.status(201).json(ticket);
      } catch (err) {
        res.status(400).json({
          message: 'Bad request',
          error: err.message
        });
      }
    });
  }

  showAll() {
    this.app.get('/tickets', async (req, res) => {
      try {
        const tickets = await this.TicketModel.find()
          .populate('event')
          .populate('organiser');

        res.status(200).json(tickets);
      } catch (err) {
        res.status(500).json({
          message: 'Internal server error'
        });
      }
    });
  }

  showById() {
    this.app.get('/tickets/:id', async (req, res) => {
      try {
        const ticket = await this.TicketModel.findById(req.params.id)
          .populate('event')
          .populate('organiser');

        if (!ticket) {
          return res.status(404).json({
            message: 'Ticket not found'
          });
        }

        res.status(200).json(ticket);
      } catch (err) {
        res.status(400).json({
          message: 'Invalid ticket ID'
        });
      }
    });
  }

  update() {
    this.app.put('/tickets/:id', async (req, res) => {
      try {
        const ticket = await this.TicketModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );

        if (!ticket) {
          return res.status(404).json({
            message: 'Ticket not found'
          });
        }

        res.status(200).json(ticket);
      } catch (err) {
        res.status(400).json({
          message: 'Bad request'
        });
      }
    });
  }

  deleteById() {
    this.app.delete('/tickets/:id', async (req, res) => {
      try {
        const ticket = await this.TicketModel.findByIdAndDelete(
          req.params.id
        );

        if (!ticket) {
          return res.status(404).json({
            message: 'Ticket not found'
          });
        }

        res.status(204).send();
      } catch (err) {
        res.status(400).json({
          message: 'Invalid ticket ID'
        });
      }
    });
  }

  run() {
    this.create();
    this.showAll();
    this.showById();
    this.update();
    this.deleteById();
  }
};

export default Tickets;
