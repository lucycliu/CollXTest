import { Constants } from '@/constants/designConstants';
import { IconButton, PrimaryButton, VSpacer } from '@/designSystem';
import { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

interface Props {
    closeModal: () => void;
    onSubmit: (filter: string) => void;
}

export default function CardFilterModal({ closeModal, onSubmit }: Props) {
    const [filterName, setFilterName] = useState('');

    function submitRequest() {
        onSubmit(filterName);
        closeModal();
    }

    function onChangeNameFilter(value: string) {
        setFilterName(value);
    }

    return (
        <View style={styles.modalBackground}>
            <View style={styles.contentContainer}>
                <View style={styles.closeButtonContainer}>
                    <IconButton
                        icon="close"
                        testId="filter-modal-close-button"
                        accessibilityLabel="Close Modal"
                        onPress={closeModal}
                    />
                </View>
                <Text>Filter by card name:</Text>
                <VSpacer h={Constants.SMALL_PADDING} />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNameFilter}
                    value={filterName}
                    autoCorrect={false}
                />
                <VSpacer h={Constants.MID_PADDING} />
                <PrimaryButton
                    testId="filter-modal-submit-button"
                    label="Submit"
                    onPress={submitRequest}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        width: '80%',
        padding: 24,
    },
    closeButtonContainer: {
        width: '100%',
        alignItems: 'flex-end',
    },
    input: {
        height: 40,
        width: '100%',
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 8,
    },
});
