import { Pressable } from 'react-native';
import { sendAnalyticsEvent } from '@/utils/analytics';

interface Props {
    testId: string;
    content: React.ReactNode;
    analyticsData?: any;
    disabled?: boolean;
    onPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
}

/** A common template for button components with built-in analytics; not to be used directly. */
const BaseButton = ({
    testId,
    content,
    analyticsData,
    disabled = false,
    onPress,
    onPressIn,
    onPressOut,
}: Props) => {
    function handlePress() {
        if (!disabled) {
            onPress?.();
            sendAnalyticsEvent('click', {
                component: 'BKBaseButton',
                testId,
                ...analyticsData,
            });
        }
    }

    return (
        <Pressable
            testID={testId}
            disabled={disabled}
            onPress={handlePress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}>
            {content}
        </Pressable>
    );
};

export default BaseButton;
