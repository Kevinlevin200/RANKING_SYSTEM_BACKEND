const { resena, notificacion, Usuarios } = Require('../models');
  
  async function crearReseña(req) {
    const { usuarioId, restauranteId, comentario, estrellas } = req.body;
    const nueva = await resena.create({ usuarioId, restauranteId, comentario, estrellas }); 
    const usuariosRelacionados = await resena.findAll({
      where: { restauranteId },
      attributes: ['usuarioId']
    });
    const notificaciones = usuariosRelacionados.map(u => ({
      mensaje: `Nuevo comentario en restaurante ${restauranteId}.`,
      usuarioId: 'usuarioId'
    }));
    await notificacion.bulkCreate(notificaciones);
  }
  
  router.get('/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;
    const notificaciones = await notificacion.findAll({ where: { usuarioId } });
    res.json(notificaciones);
  });
  
  router.put('/:id/vista', async (req, res) => {
    const { id } = req.params;
    const noti = await notificacion.findByPk(id);
    if (!noti) return res.status(404).send('No encontrada.');
    noti.vista = true;
    await noti.save();
    res.send('Notificación marcada como vista.');
  })