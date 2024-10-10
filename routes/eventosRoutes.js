import express from 'express';
import cors from 'cors'; // Importar cors
import eventoRepository from '../repositories/eventRepository.js';

const router = express.Router();

router.use(cors()); // Usar cors

// Obtener todos los eventos
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
router.get('/:id', async (req, res) => { // Cambiado a :id
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

// Eliminar y modificar eventos...

// Ruta para eliminar un evento por ID
router.delete('/:id', async (req, res) => {
  console.log(`[DELETE] /eventos/${req.params.id} - Iniciando eliminación de evento`);
  try {
    const eventoEliminado = await eventoRepository.deleteEvento(req.params.id); // Usa el repositorio
    if (!eventoEliminado) {
      console.log(`[DELETE] /eventos/${req.params.id} - Evento no encontrado`);
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    console.log(`[DELETE] /eventos/${req.params.id} - Evento eliminado:`, eventoEliminado);
    res.status(200).json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    console.error(`[DELETE] /eventos/${req.params.id} - Error al eliminar el evento:`, error.message);
    res.status(500).json({ message: 'Error al eliminar el evento', error: error.message });
  }
});

export default router;
