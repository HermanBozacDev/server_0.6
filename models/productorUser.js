import mongoose from 'mongoose'; // Asegúrate de importar mongoose
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Especifica la colección 'login'
const productorUser = mongoose.model('ProductorUser', userSchema, 'login');

export default productorUser;

