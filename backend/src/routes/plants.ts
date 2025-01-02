// routes/plants.ts
import { Router } from 'express';
import { PlantController } from '../controllers/plantsController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.post('/', PlantController.create);
router.get('/', PlantController.getPlants);
router.get('/:id', PlantController.getPlant);
router.put('/:id', PlantController.updatePlant);
router.delete('/:id', PlantController.deletePlant);

export { router as plantRouter };