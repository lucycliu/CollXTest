import { StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BaseButton from './BaseButton';

interface Props {
    testId: string;
    icon: string;
    accessibilityLabel?: string;
    color?: string;
    disabled?: boolean;
    onPress?: () => void;
}

const IconButton = ({
    testId,
    icon,
    color,
    accessibilityLabel,
    disabled = false,
    onPress,
}: Props) => {
    function renderContent() {
        return (
            <View
                accessibilityLabel={accessibilityLabel ?? icon}
                style={{ ...styles.container, opacity: disabled ? 0.3 : 1 }}>
                <FontAwesome name={icon} size={24} color={color} />
            </View>
        );
    }

    return (
        <BaseButton
            content={renderContent()}
            testId={testId}
            analyticsData={{ component: 'IconButton', icon: icon }}
            disabled={disabled}
            onPress={onPress}
        />
    );
};

export default IconButton;

const styles = StyleSheet.create({
    container: {
        height: 48,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
