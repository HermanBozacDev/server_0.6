// routes/eventosRoutes.js
import express from 'express';
import Evento from '../models/eventos.js';

const router = express.Router();

// Obtener todos los eventos
/**
 * GET /
 * Obtiene todos los eventos
 */
router.get('/', async (req, res) => {
  console.log('[GET] /eventos - Iniciando obtención de eventos');
  try {
    const eventos = await Evento.find(); // Encuentra todos los eventos
    console.log(`[GET] /eventos - ${eventos.length} eventos encontrados`);
    res.status(200).json(eventos); // Devuelve los eventos encontrados
  } catch (error) {
    console.error('[GET] /eventos - Error al obtener eventos:', error);
    res.status(500).json({ message: 'Error al obtener eventos', error });
  }
});

// Crear un evento
/**
 * POST /
 * Crea un nuevo evento
 */
router.post('/', async (req, res) => {
  console.log('[POST] /eventos - Iniciando creación de evento');
  try {
    const nuevoEvento = new Evento(req.body); // Crea un nuevo evento con los datos del cuerpo de la solicitud
    const eventoGuardado = await nuevoEvento.save(); // Guarda el evento en la base de datos
    console.log('[POST] /eventos - Evento guardado con éxito:', eventoGuardado);
    res.status(201).json(eventoGuardado); // Responde con el evento guardado
  } catch (error) {
    console.error('[POST] /eventos - Error al crear el evento:', error);
    res.status(500).json({ message: 'Error al crear el evento', error });
  }
});

// Buscar evento por ID
/**
 * GET /:id
 * Busca un evento por su ID
 */
router.get('/:id', async (req, res) => {
  console.log(`[GET] /eventos/${req.params.id} - Iniciando búsqueda de evento`);
  try {
    const evento = await Evento.findById(req.params.id); // Busca el evento por su ID
    if (!evento) {
      console.log(`[GET] /eventos/${req.params.id} - Evento no encontrado`);
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    console.log(`[GET] /eventos/${req.params.id} - Evento encontrado:`, evento);
    res.status(200).json(evento); // Responde con el evento encontrado
  } catch (error) {
    console.error(`[GET] /eventos/${req.params.id} - Error al buscar el evento:`, error);
    res.status(500).json({ message: 'Error al buscar el evento', error });
  }
});

// Eliminar evento por ID
/**
 * DELETE /:id
 * Elimina un evento por su ID
 */
router.delete('/:id', async (req, res) => {
  console.log(`[DELETE] /eventos/${req.params.id} - Iniciando eliminación de evento`);
  try {
    const eventoEliminado = await Evento.findByIdAndDelete(req.params.id); // Elimina el evento por su ID
    if (!eventoEliminado) {
      console.log(`[DELETE] /eventos/${req.params.id} - Evento no encontrado`);
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    console.log(`[DELETE] /eventos/${req.params.id} - Evento eliminado con éxito`);
    res.status(200).json({ message: 'Evento eliminado con éxito' }); // Confirma la eliminación
  } catch (error) {
    console.error(`[DELETE] /eventos/${req.params.id} - Error al eliminar el evento:`, error);
    res.status(500).json({ message: 'Error al eliminar el evento', error });
  }
});

// Modificar evento por ID
/**
 * PUT /:id
 * Modifica un evento por su ID
 */
router.put('/:id', async (req, res) => {
  console.log(`[PUT] /eventos/${req.params.id} - Iniciando modificación de evento`);
  try {
    const eventoModificado = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Actualiza el evento por su ID
    if (!eventoModificado) {
      console.log(`[PUT] /eventos/${req.params.id} - Evento no encontrado`);
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    console.log(`[PUT] /eventos/${req.params.id} - Evento modificado con éxito:`, eventoModificado);
    res.status(200).json(eventoModificado); // Responde con el evento modificado
  } catch (error) {
    console.error(`[PUT] /eventos/${req.params.id} - Error al modificar el evento:`, error);
    res.status(500).json({ message: 'Error al modificar el evento', error });
  }
});

export default router;
