export interface IPreviewRecipe {
    anchor: string;
    image: string;
    name: string;
    time: string;
    difficulty: string;
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
