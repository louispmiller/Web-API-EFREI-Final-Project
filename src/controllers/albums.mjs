
import AlbumModel from '../models/album.mjs';

const Albums = class Albums {
  constructor(app, connect) {
    this.app = app;
    this.AlbumModel = connect.model('Album', AlbumModel);

    this.run();
  }

  create() {
    this.app.post('/albums', async (req, res) => {
      try {
        const album = await this.AlbumModel.create(req.body);

        res.status(201).json(album);
      } catch (err) {
        res.status(400).json({
          message: 'Bad request',
          error: err.message
        });
      }
    });
  }

  showAll() {
    this.app.get('/albums', async (req, res) => {
      try {
        const albums = await this.AlbumModel.find()
          .populate('event')
          .populate('photos.author')
          .populate('photos.comments.author');

        res.status(200).json(albums);
      } catch (err) {
        res.status(500).json({
          message: 'Internal server error'
        });
      }
    });
  }

  showById() {
    this.app.get('/albums/:id', async (req, res) => {
      try {
        const album = await this.AlbumModel.findById(req.params.id)
          .populate('event')
          .populate('photos.author')
          .populate('photos.comments.author');

        if (!album) {
          return res.status(404).json({
            message: 'Album not found'
          });
        }

        res.status(200).json(album);
      } catch (err) {
        res.status(400).json({
          message: 'Invalid album ID'
        });
      }
    });
  }

  update() {
    this.app.put('/albums/:id', async (req, res) => {
      try {
        const album = await this.AlbumModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );

        if (!album) {
          return res.status(404).json({
            message: 'Album not found'
          });
        }

        res.status(200).json(album);
      } catch (err) {
        res.status(400).json({
          message: 'Bad request'
        });
      }
    });
  }

  deleteById() {
    this.app.delete('/albums/:id', async (req, res) => {
      try {
        const album = await this.AlbumModel.findByIdAndDelete(
          req.params.id
        );

        if (!album) {
          return res.status(404).json({
            message: 'Album not found'
          });
        }

        res.status(204).send();
      } catch (err) {
        res.status(400).json({
          message: 'Invalid album ID'
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

export default Albums;
