import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import { Text } from '@/components/Themed';
import { Card } from '@/constants/types';
import { BasePage, VSpacer } from '@/designSystem';
import CardListItem from '../../components/CardListItem';

const CARD_LIST_QUERY = gql`
    query CardsQuery {
        cards(
            pagination: { itemsPerPage: 10, page: 0 }
            filters: { category: "Pokemon" }
        ) {
            id
            localId
            name
            image
            set {
                id
                name
            }
        }
    }
`;

export default function MainTabScreen() {
    const [likedCards, setLikedCards] = useState<string[]>([]);
    const { data, loading, error } = useQuery(CARD_LIST_QUERY);

    function toggleLike(cardId: string) {
        if (likedCards.includes(cardId)) {
            // remove cardId from liked list
            setLikedCards([...likedCards.filter((item) => item !== cardId)]);
        } else {
            // add cardId to liked list
            setLikedCards([...likedCards, cardId]);
        }
    }

    const renderCardListItem = ({ item }: { item: Card }) => (
        <CardListItem
            key={item.id}
            card={item}
            isLiked={likedCards.includes(item.id)}
            onLikePressed={() => toggleLike(item.id)}
        />
    );

    if (error) {
        // TODO: Better error logging
        return (
            <BasePage>
                <Text>Error: {error.message}</Text>
            </BasePage>
        );
    } else if (loading) {
        return (
            <BasePage>
                <Text>Loading...</Text>
            </BasePage>
        );
    }

    return (
        <BasePage>
            <FlatList
                ItemSeparatorComponent={<VSpacer h={16} />}
                data={data.cards}
                renderItem={renderCardListItem}
                keyExtractor={(item: Card) => item.id}
            />
        </BasePage>
    );
}
