import React from 'react';
import { PlantCard } from '../../components/PlantFeed/PlantCard/PlantCard';
import './PlantFeed.css';

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

interface PlantFeedProps {
    posts: Plant[];
    loading: boolean;
}

export const PlantFeed: React.FC<PlantFeedProps> = ({ posts, loading }) => {
    if (loading) {
        return (
            <div className="feed-loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="feed-container">
            <div className="posts-scroll-container">
                <div className="posts-wrapper">
                    {posts.map((post) => (
                        <PlantCard key={post.id} plant={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};