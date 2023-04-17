import { Ingredient } from "./Ingredient";

export class Recipe {
    public id: number = 0;
    public title: string = '';
    public time: number = 0;
    public description: string = '';
    public ingredients: Ingredient[] = [];
}