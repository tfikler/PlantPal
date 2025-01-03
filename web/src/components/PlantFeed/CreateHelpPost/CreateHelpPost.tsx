import React, {useRef, useState} from 'react';
import { Dialog } from '@headlessui/react';
import { LocalFlorist, Close, CloudUpload } from '@mui/icons-material';
import { plantAPI } from '../../../services/api';
import { toast } from 'react-hot-toast';
import './CreateHelpPost.css'

interface CreateHelpPostProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface FormData {
    name: string;
    species: string;
    description: string;
    help_type: 'need_advice' | 'need_babysitting' | 'need_in_person';
    image: File | null;
}

export const CreateHelpPost: React.FC<CreateHelpPostProps> = ({ open, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        species: '',
        description: '',
        help_type: 'need_advice',
        image: null,
    });

    const handleFileSelect = (file: File) => {
        if (file.type.startsWith('image/')) {
            setFormData(prev => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = (event: ProgressEvent<FileReader>) => {
                if (event.target?.result) {
                    setImagePreview(event.target.result.toString());
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataObj = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null) formDataObj.append(key, value);
            });

            await plantAPI.createHelpPost(formDataObj);
            toast.success('Your request has been posted!');
            onSuccess();
            resetForm();
        } catch (error) {
            toast.error('Failed to post your request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            species: '',
            description: '',
            help_type: 'need_advice',
            image: null,
        });
        setImagePreview(null);
    };

    return (
        <Dialog open={open} onClose={onClose} className="dialog-wrapper">
            <div className="dialog-backdrop" aria-hidden="true" />

            <div className="dialog-container">
                <Dialog.Panel className="dialog-content">
                    <div className="dialog-header">
                        <div className="header-content">
                            <div className="header-icon">
                                <LocalFlorist />
                            </div>
                            <Dialog.Title className="header-title">
                                Ask for Plant Help
                            </Dialog.Title>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="close-button"
                        >
                            <Close />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="form-body">
                        <div className="form-group">
                            <label htmlFor="plant-name">Plant Name</label>
                            <input
                                id="plant-name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="What's your plant's name?"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="plant-species">Species (if known)</label>
                            <input
                                id="plant-species"
                                type="text"
                                value={formData.species}
                                onChange={(e) => setFormData(prev => ({ ...prev, species: e.target.value }))}
                                placeholder="Do you know its species?"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="help-type">Type of Help Needed</label>
                            <select
                                id="help-type"
                                value={formData.help_type}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    help_type: e.target.value as FormData['help_type']
                                }))}
                            >
                                <option value="need_advice">Need Advice</option>
                                <option value="need_babysitting">Need Plant Babysitting</option>
                                <option value="need_in_person">Need In-Person Care</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Describe what help you need..."
                                rows={4}
                                required
                            />
                        </div>

                        {/*<div className="form-group">*/}
                        {/*    <label>Plant Image</label>*/}
                        {/*    <div*/}
                        {/*        className="image-upload-container"*/}
                        {/*        onDrop={handleDrop}*/}
                        {/*        onDragOver={handleDragOver}*/}
                        {/*    >*/}
                        {/*        {imagePreview ? (*/}
                        {/*            <div className="image-preview">*/}
                        {/*                <img src={imagePreview} alt="Preview" />*/}
                        {/*                <button*/}
                        {/*                    type="button"*/}
                        {/*                    onClick={(e) => {*/}
                        {/*                        e.stopPropagation();*/}
                        {/*                        setFormData(prev => ({ ...prev, image: null }));*/}
                        {/*                        setImagePreview(null);*/}
                        {/*                    }}*/}
                        {/*                    className="remove-image"*/}
                        {/*                >*/}
                        {/*                    <Close />*/}
                        {/*                </button>*/}
                        {/*            </div>*/}
                        {/*        ) : (*/}
                        {/*            <div*/}
                        {/*                className="upload-placeholder"*/}
                        {/*                onClick={() => fileInputRef.current?.click()}*/}
                        {/*            >*/}
                        {/*                <CloudUpload className="upload-icon" />*/}
                        {/*                <div className="upload-text">*/}
                        {/*                    <span className="upload-primary">Upload a photo</span>*/}
                        {/*                    <span className="upload-secondary">or drag and drop</span>*/}
                        {/*                </div>*/}
                        {/*                <input*/}
                        {/*                    ref={fileInputRef}*/}
                        {/*                    type="file"*/}
                        {/*                    onChange={handleImageChange}*/}
                        {/*                    accept="image/*"*/}
                        {/*                    className="file-input"*/}
                        {/*                    onClick={e => e.stopPropagation()}*/}
                        {/*                />*/}
                        {/*            </div>*/}
                        {/*        )}*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="dialog-footer">
                            <button
                                type="button"
                                onClick={onClose}
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="submit-button"
                            >
                                {loading ? 'Posting...' : 'Post Request'}
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};