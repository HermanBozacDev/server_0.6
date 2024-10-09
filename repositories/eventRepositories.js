// repositories/eventoRepository.js
import Evento from '../models/eventos.js';

class EventoRepository {
  // Obtener todos los eventos
  async getAllEventos() {
    try {
      const eventos = await Evento.find();
      return eventos;
    } catch (error) {
      throw new Error(`Error al obtener eventos: ${error.message}`);
    }
  }

  // Obtener un evento por ID
  async getEventoById(id) {
    try {
      const evento = await Evento.findById(id);
      return evento;
    } catch (error) {
      throw new Error(`Error al obtener el evento con ID ${id}: ${error.message}`);
    }
  }

  // Crear un nuevo evento
  async createEvento(data) {
    try {
      const nuevoEvento = new Evento(data);
      const eventoGuardado = await nuevoEvento.save();
      return eventoGuardado;
    } catch (error) {
      throw new Error(`Error al crear el evento: ${error.message}`);
    }
  }

  // Actualizar un evento por ID
  async updateEvento(id, data) {
    try {
      const eventoModificado = await Evento.findByIdAndUpdate(id, data, { new: true });
      return eventoModificado;
    } catch (error) {
      throw new Error(`Error al actualizar el evento con ID ${id}: ${error.message}`);
    }
  }

  // Eliminar un evento por ID
  async deleteEvento(id) {
    try {
      const eventoEliminado = await Evento.findByIdAndDelete(id);
      return eventoEliminado;
    } catch (error) {
      throw new Error(`Error al eliminar el evento con ID ${id}: ${error.message}`);
    }
  }
}

export default new EventoRepository();
