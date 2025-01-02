export interface CreatePlantDto {
    name: string;
    species?: string;
    image_url?: string;
    health_status?: string;
}

export interface UpdatePlantDto extends Partial<CreatePlantDto> {}