import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
} from '@mui/material';
import { LocalFlorist as PlantIcon } from '@mui/icons-material';
import './AddPlantForm.css';
import {plantAPI} from "../../services/api";

export const AddPlantForm = ({ open, onClose }: any) => {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await plantAPI.addPlant(name, species, location);
            onClose();
            navigate('/plants');
        } catch (error) {
            console.error('Error adding plant:', error);
            // TODO: Show error message
        }
    };

    return (
        <Dialog open={open} onClose={onClose} className="add-plant-dialog">
            <DialogTitle className="dialog-title">
                <PlantIcon className="dialog-icon" />
                Add New Plant
            </DialogTitle>
            <DialogContent className="dialog-content">
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    fullWidth
                    required
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Species"
                    fullWidth
                    required
                    className="form-input"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                />
                <InputLabel className="form-label">Location</InputLabel>
                <Select
                    fullWidth
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="form-select"
                >
                    <MenuItem value="indoor">Indoor</MenuItem>
                    <MenuItem value="outdoor">Outdoor</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions className="dialog-actions">
                <Button onClick={onClose} className="cancel-button">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" className="add-button">Add Plant</Button>
            </DialogActions>
        </Dialog>
    );
};