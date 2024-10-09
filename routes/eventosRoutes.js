// routes/eventosRoutes.js
import express from 'express';
import eventoRepository from '../repositories/eventoRepository.js';

const router = express.Router();

// Obtener todos los eventos
/**
 * GET /
 * Obtiene todos los eventos
 */
router.get('/', async (req, res) => {
  console.log('[GET] /eventos - Iniciando obtención de eventos');
  try {
    const eventos = await eventoRepository.getAllEventos(); // Usa el repositorio
    console.log(`[GET] /eventos - ${eventos.length} eventos encontrados`);
    res.status(200).json(eventos);
  } catch (error) {
    console.error('[GET] /eventos - Error al obtener eventos:', error.message);
    res.status(500).json({ message: 'Error al obtener eventos', error: error.message });
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
    const eventoGuardado = await eventoRepository.createEvento(req.body); // Usa el repositorio
    console.log('[POST] /eventos - Evento guardado con éxito:', eventoGuardado);
    res.status(201).json(eventoGuardado);
  } catch (error) {
    console.error('[POST] /eventos - Error al crear el evento:', error.message);
    res.status(500).json({ message: 'Error al crear el evento', error: error.message });
  }
});

// Buscar evento por ID
/**
 * GET /:id
 * Busca un evento por su ID
 */
router.get('/', async (req, res) => {
  console.log(`[GET] /eventos/${req.params.id} - Iniciando búsqueda de evento`);
  try {
    const evento = await eventoRepository.getEventoById(req.params.id); // Usa el repositorio
    if (!evento) {
      console.log(`[GET] /eventos/${req.params.id} - Evento no encontrado`);
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    console.log(`[GET] /eventos/${req.params.id} - Evento encontrado:`, evento);
    res.status(200).json(evento);
  } catch (error) {
    console.error(`[GET] /eventos/${req.params.id} - Error al buscar el evento:`, error.message);
    res.status(500).json({ message: 'Error al buscar el evento', error: error.message });
  }
});

// Eliminar evento por ID
/**
 * DELETE /:id
 * Elimina un evento por su ID
 */
router.delete('/', async (req, res) => {
  console.log(`[DELETE] /eventos/${req.params.id} - Iniciando eliminación de evento`);
  try {
    const eventoEliminado = await eventoRepository.deleteEvento(req.params.id); // Usa el repositorio
    if (!eventoEliminado) {
      console.log(`[DELETE] /eventos/${req.params.id} - Evento no encontrado`);
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    console.log(`[DELETE] /eventos/${req.params.id} - Evento eliminado con éxito`);
    res.status(200).json({ message: 'Evento eliminado con éxito' });
  } catch (error) {
    console.error(`[DELETE] /eventos/${req.params.id} - Error al eliminar el evento:`, error.message);
    res.status(500).json({ message: 'Error al eliminar el evento', error: error.message });
  }
});

// Modificar evento por ID
/**
 * PUT /:id
 * Modifica un evento por su ID
 */
router.put('/', async (req, res) => {
  console.log(`[PUT] /eventos/${req.params.id} - Iniciando modificación de evento`);
  try {
    const eventoModificado = await eventoRepository.updateEvento(req.params.id, req.body); // Usa el repositorio
    if (!eventoModificado) {
      console.log(`[PUT] /eventos/${req.params.id} - Evento no encontrado`);
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    console.log(`[PUT] /eventos/${req.params.id} - Evento modificado con éxito:`, eventoModificado);
    res.status(200).json(eventoModificado);
  } catch (error) {
    console.error(`[PUT] /eventos/${req.params.id} - Error al modificar el evento:`, error.message);
    res.status(500).json({ message: 'Error al modificar el evento', error: error.message });
  }
});

export default router;
