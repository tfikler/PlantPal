// controllers/plantController.ts
import { RequestHandler } from 'express';
import { PlantModel, PlantInput } from '../models/plants';
import { AuthRequest } from '../middleware/auth';

//TODO: Fix the errors with the typescript

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
            // @ts-ignore
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
            // @ts-ignore
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
            // @ts-ignore
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

    static getFeed: RequestHandler = async (req: AuthRequest, res) => {
        try {
            const plants = await PlantModel.getFeed();
            console.log(plants);
            res.json(plants);
        } catch (err) {
            console.error('Get feed error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    };

    static createHelpPost: RequestHandler = async (req: AuthRequest, res) => {
        try {
            const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
            const plantInput: PlantInput = {
                owner_id: req.userId!,
                help_type: req.body.help_type,
                image_url: imageUrl,
                ...req.body
            };
            const plant = await PlantModel.create(plantInput);
            res.status(201).json(plant);
        } catch (err) {
            console.error('Create help post error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    };
}