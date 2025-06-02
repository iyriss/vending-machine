type DrinkTypes = 'cola' | 'diet-cola' | 'lime-soda' | 'water';

type Drink = {
    key: DrinkTypes;
    name: string;
    price: number;
    available: number;
};
