const Sculptor = require('../Entities/Sculptor'); // Importa la clase Sculptor_

class SculptorController {
  constructor(sculptorUseCase) {
    this.sculptorUseCase = sculptorUseCase;
  }

  createSculptor(req) {
    const { name, biography, contact, works } = req.body;
    const sculptor = new Sculptor(name, biography, contact, works); // Usa la clase Sculptor
    this.sculptorUseCase.addSculptor(sculptor);
  }
  
  getSculptorByName(name) {
    const sculptor = this.sculptorUseCase.getSculptor(name);
    return sculptor || null; // Asegurarse de devolver null si no existe el escultor
  }

  getAllSculptors() {
    return this.sculptorUseCase.getAllSculptors();
  }

  updateSculptor(name, type, newValue) {
    switch (type) {
      case 'name':
        this.sculptorUseCase.updateSculptorName(name, newValue);
        break;
      case 'biography':
        this.sculptorUseCase.updateSculptorBiography(name, newValue);
        break;
      case 'contact':
        this.sculptorUseCase.updateSculptorContact(name, newValue);
        break;
      case 'works':
        this.sculptorUseCase.updateSculptorWorks(name, newValue);
        break;
      default:
        throw new Error('Atributo no válido para modificar');
    }
  }

  deleteSculptor(name) {
    return this.sculptorUseCase.deleteSculptor(name);
  }
}

module.exports = SculptorController;
