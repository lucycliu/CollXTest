import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Text } from '@/components/Themed';
import { Card } from '@/constants/types';
import { IconButton, HSpacer, VSpacer } from '@/designSystem';
import { Constants } from '@/constants/designConstants';
import { getImageUrl } from '@/utils/utils';

const PlaceholderThumb = () => {
    return (
        <View style={styles.placeholderThumb}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
                ?
            </Text>
        </View>
    );
};

interface CardListItemProps {
    card: Card;
    isLiked: boolean;
    onLikePressed?: () => void;
}

export default function CardListItem({
    card,
    isLiked = false,
    onLikePressed,
}: CardListItemProps) {
    const renderThumbnail = () => {
        const imgUrl = getImageUrl(card.image, 'low');
        return imgUrl ? (
            <Image source={imgUrl} style={styles.image} contentFit="contain" />
        ) : (
            <PlaceholderThumb />
        );
    };

    const renderLikeButton = () => {
        return (
            <IconButton
                testId={`${card.id}-like-button`}
                icon={isLiked ? 'heart' : 'heart-o'}
                color="white"
                onPress={onLikePressed}
            />
        );
    };

    return (
        <View style={styles.row}>
            <Link
                href={{
                    pathname: '/cardDetail',
                    params: { cardId: card.id },
                }}
                asChild>
                <Pressable style={styles.container}>
                    <View style={styles.row}>
                        {renderThumbnail()}
                        <HSpacer w={Constants.MID_PADDING} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{card.name}</Text>
                            <VSpacer h={Constants.SMALL_PADDING} />
                            <Text>{`#${card.localId} ${card.set.name}`}</Text>
                        </View>
                    </View>
                </Pressable>
            </Link>
            <HSpacer w={Constants.SMALL_PADDING} />
            {renderLikeButton()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: Constants.MID_PADDING,
        // backgroundColor: Colors['dark'].cardBackground,
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    image: {
        height: 80,
        width: 60,
    },
    placeholderThumb: {
        height: 80,
        width: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
