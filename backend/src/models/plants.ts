import { pool } from '../config/database';

export interface Plant {
    id: number;
    owner_id: number;
    name: string;
    species: string;
    location: string;
    help_type?: 'need_advice' | 'need_babysitting' | 'need_in_person';
    description?: string;
    image_url?: string;
    created_at: Date;
    user?: {
        id: number;
        full_name: string;
        user_type: string;
    };
}

export interface PlantInput {
    owner_id: string;
    name: string;
    species: string;
    image_url?: string;
    health_status?: string;
}

export class PlantModel {
    static async create(plantInput: PlantInput): Promise<Plant> {
        const result = await pool.query(
            `INSERT INTO plants (owner_id, name, species, image_url, health_status)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [plantInput.owner_id, plantInput.name, plantInput.species,
                plantInput.image_url, plantInput.health_status]
        );
        return result.rows[0];
    }

    static async findById(id: string): Promise<Plant | null> {
        const result = await pool.query(
            'SELECT * FROM plants WHERE id = $1',
            [id]
        );
        return result.rows[0] || null;
    }

    static async findByOwnerId(ownerId: string): Promise<Plant[]> {
        const result = await pool.query(
            'SELECT * FROM plants WHERE owner_id = $1',
            [ownerId]
        );
        return result.rows;
    }

    static async update(id: string, updates: Partial<Plant>): Promise<Plant | null> {
        const allowedUpdates = ['name', 'species', 'image_url', 'health_status',
            'care_instructions', 'watering_frequency',
            'sunlight_needs', 'last_watered'];
        const updateEntries = Object.entries(updates)
            .filter(([key]) => allowedUpdates.includes(key));

        if (updateEntries.length === 0) return null;

        const setClause = updateEntries
            .map((_, index) => `${updateEntries[index][0]} = $${index + 2}`)
            .join(', ');

        const values = updateEntries.map(([, value]) => value);

        const result = await pool.query(
            `UPDATE plants SET ${setClause}
             WHERE id = $1 RETURNING *`,
            [id, ...values]
        );
        return result.rows[0] || null;
    }

    static async delete(id: string): Promise<boolean> {
        const result = await pool.query(
            'DELETE FROM plants WHERE id = $1 RETURNING id',
            [id]
        );
        if (!result.rowCount) return false;
        return result.rowCount > 0;
    }

    static async getFeed(): Promise<Plant[]> {
        const query = `
        SELECT p.*, u.id as user_id, u.full_name, u.user_type
        FROM plants p
        JOIN users u ON p.owner_id = u.id
        ORDER BY p.created_at DESC
    `;
        const result = await pool.query(query);
        return result.rows;
    }

    static async createHelpPost(data: {
        owner_id: number;
        name: string;
        description: string;
        help_type: string;
        image_url?: string;
    }): Promise<Plant> {
        const query = `
            INSERT INTO plants (owner_id, name, description, help_type, image_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const result = await pool.query(query, [
            data.owner_id,
            data.name,
            data.description,
            data.help_type,
            data.image_url
        ]);
        return result.rows[0];
    }
}