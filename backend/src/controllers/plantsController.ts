// controllers/plantController.ts
import { RequestHandler } from 'express';
import { PlantModel, PlantInput } from '../models/plants';
import { AuthRequest } from '../middleware/auth';

export class PlantController {
    static create: RequestHandler = async (req: AuthRequest, res) => {
        try {
            const plantInput: PlantInput = {
                owner_id: req.userId!,
                ...req.body
            };
            const plant = await PlantModel.create(plantInput);
            res.status(201).json(plant);
        } catch (err) {
            console.error('Create plant error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    };

    static getPlants: RequestHandler = async (req: AuthRequest, res) => {
        try {
            const plants = await PlantModel.findByOwnerId(req.userId!);
            res.json(plants);
        } catch (err) {
            console.error('Get plants error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    };

    static getPlant: RequestHandler = async (req: AuthRequest, res) => {
        try {
            const plant = await PlantModel.findById(req.params.id);
            if (!plant || plant.owner_id !== req.userId) {
                res.status(404).json({ error: 'Plant not found' });
                return;
            }
            res.json(plant);
        } catch (err) {
            console.error('Get plant error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    };

    static updatePlant: RequestHandler = async (req: AuthRequest, res) => {
        try {
            const plant = await PlantModel.findById(req.params.id);
            if (!plant || plant.owner_id !== req.userId) {
                res.status(404).json({ error: 'Plant not found' });
                return;
            }
            const updatedPlant = await PlantModel.update(req.params.id, req.body);
            res.json(updatedPlant);
        } catch (err) {
            console.error('Update plant error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    };

    static deletePlant: RequestHandler = async (req: AuthRequest, res) => {
        try {
            const plant = await PlantModel.findById(req.params.id);
            if (!plant || plant.owner_id !== req.userId) {
                res.status(404).json({ error: 'Plant not found' });
                return;
            }
            await PlantModel.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            console.error('Delete plant error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    };
}