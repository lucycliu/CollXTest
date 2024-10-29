import { StyleSheet } from 'react-native';

import { Text } from '@/components/Themed';
import BasePage from '@/designSystem/BasePage';

export default function SettingsTabScreen() {
    return (
        <BasePage>
            <Text style={styles.title}>Not implemented :)</Text>
        </BasePage>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
});
