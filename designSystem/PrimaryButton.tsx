import { StyleSheet, Text, View } from 'react-native';
import BaseButton from './BaseButton';
import Colors from '@/constants/Colors';

interface Props {
    testId: string;
    label: string;
    disabled?: boolean;
    onPress?: () => void;
}

export default function PrimaryButton({
    testId,
    label,
    disabled = false,
    onPress,
}: Props) {
    function renderContent() {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        {label}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <BaseButton
            content={renderContent()}
            testId={testId}
            analyticsData={{ component: 'PrimaryButton' }}
            disabled={disabled}
            onPress={onPress}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        paddingHorizontal: 24,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: Colors['dark'].tint,
    },
});
