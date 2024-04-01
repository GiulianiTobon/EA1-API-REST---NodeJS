const {Router} = require('express');
const { check } = require('express-validator');
const mediaController = require('../Controllers/MediaController');



const router = Router();

router.post('/', [ 
    check('Titulo','invalid.Titulo').not().isEmpty(),
    check('Sinopsis','invalid.Sinopsis').not().isEmpty(),
    check('image','invalid.image').not().isEmpty(),
    check('AnnoEstreno','invalid.AnnoEstreno').not().isEmpty(),
    check('GeneroPrincipal','invalid.GeneroPrincipal').not().isEmpty(),
    check('DirectorPrincipal','invalid.DirectorPrincipal').not().isEmpty(),
    check('Productora','invalid.Prodcutora').not().isEmpty(),
    check('Tipo','invalid.Tipo').not().isEmpty(),  
] , mediaController.postMedia);

router.get('/', mediaController.getMedia);

router.delete('/', mediaController.deleteMedia);

router.put('/',[
    check('Titulo','invalid.Titulo').not().isEmpty(),
    check('Sinopsis','invalid.Sinopsis').not().isEmpty(),
    check('image','invalid.image').not().isEmpty(),
    check('AnnoEstreno','invalid.AnnoEstreno').not().isEmpty(),
    check('GeneroPrincipal','invalid.GeneroPrincipal').not().isEmpty(),
    check('DirectorPrincipal','invalid.DirectorPrincipal').not().isEmpty(),
    check('Productora','invalid.Prodcutora').not().isEmpty(),
    check('Tipo','invalid.Tipo').not().isEmpty(),
], mediaController.putMedia);

module.exports = router;