import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { gql, useQuery } from '@apollo/client';

import { Text } from '@/components/Themed';
import BasePage from '@/designSystem/BasePage';
import { useLocalSearchParams } from 'expo-router';
import type { Card } from '@/constants/types';
import { VSpacer } from '@/designSystem/Spacer';
import { Constants } from '@/constants/designConstants';
import { getImageUrl } from '@/utils/utils';
import Colors from '@/constants/Colors';

const CARD_IMAGE_HEIGHT = 300;

const CARD_DETAIL_QUERY = gql`
    query CardDetailQuery($id: ID!) {
        card(id: $id) {
            id
            localId
            image
            name
            set {
                name
                cardCount {
                    official
                    total
                }
            }
            rarity
        }
    }
`;

const CardDataView = ({ card }: { card: Card }) => {
    const { image, name, localId, rarity, set } = card;
    const imgUrl = getImageUrl(image, 'high');
    return (
        <>
            <View style={styles.imageContainer}>
                {imgUrl ? (
                    <Image
                        source={imgUrl}
                        style={styles.image}
                        contentFit="contain"
                    />
                ) : (
                    <Text style={styles.centerText}>No image available</Text>
                )}
            </View>
            <VSpacer h={Constants.MID_PADDING} />
            <Text style={styles.title}>{name}</Text>
            <VSpacer h={Constants.MID_PADDING} />
            <View style={styles.rarityContainer}>
                <Text>{rarity}</Text>
            </View>
            <VSpacer h={Constants.SMALL_PADDING} />
            <Text
                style={
                    styles.centerText
                }>{`#${localId}/${set.cardCount.official} ${set.name}`}</Text>
            <VSpacer h={Constants.MID_PADDING} />
            <Text style={{ color: 'grey' }}>And other info...</Text>
        </>
    );
};

export default function CardDetailScreen() {
    const { cardId } = useLocalSearchParams();
    const { data, loading, error } = useQuery(CARD_DETAIL_QUERY, {
        variables: { id: cardId },
    });

    let screenContent = <Text>Loading...</Text>;
    if (error) {
        // TODO: Better error logging
        screenContent = <Text>Error: {error.message}</Text>;
    } else if (!loading) {
        screenContent = <CardDataView card={data.card} />;
    }

    return (
        <BasePage>
            <>
                <Stack.Screen
                    options={{
                        title: 'Card Info',
                        headerBackTitle: 'Cards',
                    }}
                />
                {screenContent}
            </>
        </BasePage>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    rarityContainer: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors['dark'].text,
        borderRadius: 8,
        padding: 4,
    },
    centerText: {
        alignSelf: 'center',
    },
    imageContainer: {
        minHeight: CARD_IMAGE_HEIGHT + Constants.MID_PADDING * 2,
        padding: Constants.MID_PADDING,
        backgroundColor: Colors['dark'].cardBackground,
        justifyContent: 'center',
    },
    image: {
        height: CARD_IMAGE_HEIGHT,
    },
});
