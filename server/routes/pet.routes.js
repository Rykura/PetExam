const PetController = require('../controllers/pet.controller')

module.exports = (app) => {
    app.get("/api/pets", PetController.findAllPets)
    app.get("/api/pets/:id", PetController.getOnePet)
    app.get("/api/random", PetController.randomPet)
    app.post("/api/pets/new", PetController.createPet)
    app.put("/api/pets/update/:id", PetController.updatePet)
    app.delete("/api/pets/delete/:id", PetController.deleteOnePet)
}