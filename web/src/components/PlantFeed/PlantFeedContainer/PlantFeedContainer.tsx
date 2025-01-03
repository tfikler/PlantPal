import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PlantFeed } from '../../../pages/PlantFeed/PlantFeed';
import { CreateHelpPost } from '../CreateHelpPost/CreateHelpPost';
import { plantAPI } from '../../../services/api';
import type { Plant } from '../../../../../backend/src/models/plants';
import {RootState} from "../../../store";
import {LocalFlorist, HelpOutline, Add} from "@mui/icons-material";
import './PlantFeedContainer.css';

export const PlantFeedContainer = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);

    const fetchPosts = async () => {
        try {
            const response = await plantAPI.getFeed();
            setPosts(response);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="feed-page-container">
            {user && (
                <div className="create-post-wrapper">
                    <button
                        onClick={() => setShowCreatePost(true)}
                        className="create-post-button"
                    >
                        <div className="button-content">
                            <div className="button-left">
                                <div className="icon-circle">
                                    <LocalFlorist className="icon-green" />
                                </div>
                            </div>
                            <div className="button-middle">
                                <span className="button-title">Ask the Community</span>
                                <span className="button-subtitle">Get help with your plant</span>
                            </div>
                            <div className="button-right">
                                <div className="help-circle">
                                    <HelpOutline className="help-icon" />
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            )}

            <div className="feed-content">
                <PlantFeed posts={posts} loading={loading} />
            </div>

            <CreateHelpPost
                open={showCreatePost}
                onClose={() => setShowCreatePost(false)}
                onSuccess={() => {
                    setShowCreatePost(false);
                    fetchPosts();
                }}
            />
        </div>
    );
};