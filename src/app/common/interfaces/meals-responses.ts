export interface IPreviewRecipe {
    anchor: string;
    image: string;
    info: string[];
    name: string;
}

export interface IRecipe {
    difficulty: string;
    image: string;
    ingredients: string[];
    name: string;
    serving: string;
    steps: string[];
    time: string;
}
