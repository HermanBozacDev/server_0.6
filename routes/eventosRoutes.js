// routes/eventosRoutes.js
import express from 'express';
import Evento from '../models/eventos.js';

const router = express.Router();

// Poner evento
router.post('/', async (req, res) => {
  try {
    console.log("post event")
    const nuevoEvento = new Evento(req.body); // Crea un nuevo evento con los datos del cuerpo de la solicitud
    const eventoGuardado = await nuevoEvento.save(); // Guarda el evento en la base de datos
    res.status(201).json(eventoGuardado); // Responde con el evento guardado
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el evento', error });
  }
});

// Buscar evento por ID
router.get('/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id); // Busca el evento por su ID
    if (!evento) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.status(200).json(evento); // Responde con el evento encontrado
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el evento', error });
  }
});

// Sacar evento por ID (borrar)
router.delete('/:id', async (req, res) => {
  try {
    const eventoEliminado = await Evento.findByIdAndDelete(req.params.id); // Elimina el evento por su ID
    if (!eventoEliminado) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.status(200).json({ message: 'Evento eliminado con éxito' }); // Confirma la eliminación
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el evento', error });
  }
});

// Modificar evento por ID
router.put('/:id', async (req, res) => {
  try {
    const eventoModificado = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Actualiza el evento por su ID
    if (!eventoModificado) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.status(200).json(eventoModificado); // Responde con el evento modificado
  } catch (error) {
    res.status(500).json({ message: 'Error al modificar el evento', error });
  }
});

export default router;
