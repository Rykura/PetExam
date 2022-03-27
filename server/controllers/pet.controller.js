const Pet = require('../models/pet.model');
const petRoutes = require('../routes/pet.routes');

module.exports.findAllPets = (req,res)=>{
    Pet.find()
        .then(allPets=>{
            res.json({results: allPets})
        })
        .catch(err=>{
            res.json({message: "Something went wrong", error: err})
        })
}

module.exports.getOnePet = (req,res)=>{
    Pet.findOne({_id: req.params.id})
        .then(onePet=>{
            res.json({results: onePet})
        })
        .catch(err=>{
            res.json({message: "Something went wrong", error: err})
        })
}

module.exports.randomPet = (req,res)=>{
    Pet.find()
        .then(allPets=>{
            res.json({results: allPets[Math.floor(Math.random()*allPets.length)]})
        })
        .catch(err=>{
            res.json({message: "Something went wrong", error: err})
        })
}

module.exports.createPet = (req,res)=>{
    Pet.create(req.body)
        .then(newPet=>{
            res.json({results: newPet})
        })
        .catch(err=>{
            res.json({message: "Something went wrong", error: err})
        })
}


module.exports.updatePet = (req,res)=>{
    Pet.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        { new: true, runValidator: true }
        )
        .then(updatedPet=>{
            res.json({results: updatedPet})
        })
        .catch(err=>{
            res.json({message: "Something went wrong", error: err})
        })
}

module.exports.deleteOnePet = (req,res)=>{
    Pet.deleteOne({_id: req.params.id})
    .then(deletedPet=>{
        res.json({results: deletedPet})
    })
    .catch(err=>{
        res.json({message: "Something went wrong", error: err})
    })

}