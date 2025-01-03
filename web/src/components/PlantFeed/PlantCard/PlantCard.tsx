import React from 'react';
import { LocalFlorist, Help, Share, Comment, ThumbUp } from '@mui/icons-material';
import './PlantCard.css';

interface Plant {
    id: string;
    name: string;
    species: string;
    help_type: string;
    image_url: string | null;
    description: string | null;
    created_at: string;
    full_name: string;
    user_type: string;
}

export const PlantCard = ({ plant }: { plant: Plant }) => {
    const getHelpTypeStyle = (type: string) => {
        switch (type) {
            case 'need_advice': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'need_babysitting': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'need_in_person': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="post-card">
            <div className="post-header">
                <div className="user-info">
                    <div className="avatar">
                        <LocalFlorist />
                    </div>
                    <div>
                        <h3>{plant.full_name}</h3>
                        <span className="timestamp">
                            {new Date(plant.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                <div className={`help-type ${getHelpTypeStyle(plant.help_type)}`}>
                    <Help className="help-icon" />
                    {plant.help_type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </div>
            </div>

            <div className="post-content">
                <h2>{plant.name}</h2>
                <div className="species">
                    <LocalFlorist className="species-icon" />
                    {plant.species}
                </div>
                {plant.description && (
                    <p className="description">{plant.description}</p>
                )}
                {plant.image_url && (
                    <div className="image-container">
                        <img src={plant.image_url} alt={plant.name} />
                    </div>
                )}
            </div>

            <div className="post-stats">
                <div className="stat">
                    <ThumbUp className="stat-icon" />
                    <span>0 likes</span>
                </div>
                <div className="stat">
                    <Comment className="stat-icon" />
                    <span>0 comments</span>
                </div>
            </div>

            <div className="post-actions">
                <button className="action-button">
                    <Help />
                    <span>Offer Help</span>
                </button>
                <button className="action-button">
                    <Comment />
                    <span>Comment</span>
                </button>
                <button className="action-button">
                    <Share />
                    <span>Share</span>
                </button>
            </div>
        </div>
    );
};