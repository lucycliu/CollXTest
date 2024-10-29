export type CardBrief = {
    id: string;
    localId: string | number;
    name: string;
    image?: string;
};
export type Card = CardBrief & {
    category: string;
    illustrator?: string;
    rarity?: string;
    set: SetBrief;
    dexId?: number[];
    hp?: number;
    types?: string[];
    // evolveFrom?: string;
    description?: string;
    level?: string;
    stage?: string;
    suffix?: string;
    effect?: string;
    trainerType?: string;
    energyType?: string;
};

export type SetBrief = {
    id: string;
    name: string;
    logo?: string;
    symbol?: string;
    cardCount: {
        total: number;
        official: number;
    };
};
