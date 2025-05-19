import express from 'express';
import { getAllSuperheroes, getOneSuperhero, createOneSuperhero, deleteOneSuperhero, updateOneSuperhero } from '../controllers/superheroesController.js';
import { upload } from '../midlewares/upload.js';

const router = express.Router();

router.get('/superheroes', getAllSuperheroes);
router.get('/superheroes/:id', getOneSuperhero);
router.post('/superheroes', upload.array('files'), createOneSuperhero);
router.delete('/superheroes/:id', deleteOneSuperhero);
router.patch('/superheroes/:id', upload.array('files', 10), updateOneSuperhero);

export default router;
