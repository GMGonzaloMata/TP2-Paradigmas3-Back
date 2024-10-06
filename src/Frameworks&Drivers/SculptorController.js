const Sculptor = require('../Entities/Sculptor'); // Importa la clase Sculptor

class SculptorController {
  constructor(sculptorUseCase) {
    this.sculptorUseCase = sculptorUseCase;
  }

  createSculptor(req) {
    const { name, biography, contact, works } = req.body;
    const sculptor = new Sculptor(name, biography, contact, works); // Usa la clase Sculptor
    this.sculptorUseCase.addSculptor(sculptor);
  }

  getAllSculptors() {
    return this.sculptorUseCase.getAllSculptors();
  }

  updateSculptor(type, typeP, name) {
    switch (type) {
      case name:
        this.sculptorUseCase.updateName(name, typeP);
        break;
      case biography:
        this.sculptorUseCase.updateBiography(name, typeP);
        break;
      case contact:
        this.sculptorUseCase.updateContact(name, typeP);
        break;
      case works:
        this.sculptorUseCase.updateWorks(name, typeP);
        break;
    }
  }

  deleteSculptor(name) {
    this.sculptorUseCase.deleteSculptor(name);
  }
}

module.exports = SculptorController;
