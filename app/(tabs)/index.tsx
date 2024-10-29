import React, { useState } from 'react';
import { FlatList, Modal, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { gql, useQuery } from '@apollo/client';

import { Text } from '@/components/Themed';
import { Card } from '@/constants/types';
import { BasePage, VSpacer } from '@/designSystem';
import CardListItem from '../../components/CardListItem';
import { Constants } from '@/constants/designConstants';
import CardFilterModal from '@/components/CardFilterModal';

const CARD_LIST_QUERY = gql`
    query CardsQuery($name: String!, $page: Int!) {
        cards(
            pagination: { itemsPerPage: 10, page: $page }
            filters: { name: $name }
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
    const [modalVisible, setModalVisible] = useState(false);
    const [nameFilter, setNameFilter] = useState('');
    const [likedCards, setLikedCards] = useState<string[]>([]);
    const { data, loading, error, fetchMore } = useQuery(CARD_LIST_QUERY, {
        variables: { name: nameFilter, page: 1 },
    });

    function closeModal() {
        setModalVisible(false);
    }

    function submitNameFilter(filter: string) {
        setNameFilter(filter);
    }

    function toggleLike(cardId: string) {
        if (likedCards.includes(cardId)) {
            // remove cardId from liked list
            setLikedCards([...likedCards.filter((item) => item !== cardId)]);
        } else {
            // add cardId to liked list
            setLikedCards([...likedCards, cardId]);
        }
    }

    function loadMoreResults() {
        // console.warn(
        //     'load more on page',
        //     Math.ceil(data.cards.length / 10) + 1,
        // );
        fetchMore({
            variables: {
                page: Math.ceil(data.cards.length / 10) + 1,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    cards: [...prev.cards, ...fetchMoreResult.cards],
                });
            },
        });
    }

    const renderCardListItem = ({ item }: { item: Card }) => (
        <CardListItem
            key={item.id}
            card={item}
            isLiked={likedCards.includes(item.id)}
            onLikePressed={() => toggleLike(item.id)}
        />
    );

    let screenContent = <Text>Loading...</Text>;
    if (error) {
        // TODO: Better error logging
        screenContent = <Text>Error: {error.message}</Text>;
    } else if (!loading) {
        screenContent = (
            <FlatList
                ItemSeparatorComponent={<VSpacer h={16} />}
                data={data.cards}
                renderItem={renderCardListItem}
                keyExtractor={(item: Card) => item.id}
                initialNumToRender={9}
                onEndReached={loadMoreResults}
                onEndReachedThreshold={0}
            />
        );
    }

    return (
        <BasePage>
            <>
                <Stack.Screen
                    options={{
                        headerRight: () => (
                            <Pressable
                                onPress={() => setModalVisible(true)}
                                style={{
                                    marginRight: Constants.MARGIN_PADDING,
                                }}>
                                <Text>Filter</Text>
                            </Pressable>
                        ),
                    }}
                />
                <Modal visible={modalVisible} transparent animationType="slide">
                    <CardFilterModal
                        closeModal={closeModal}
                        onSubmit={submitNameFilter}
                    />
                </Modal>
                {screenContent}
            </>
        </BasePage>
    );
}
