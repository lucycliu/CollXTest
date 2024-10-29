import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import { Constants } from '@/constants/designConstants';

export default function BasePage({ children }: { children: JSX.Element }) {
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: Constants.MID_PADDING,
        marginHorizontal: Constants.MARGIN_PADDING,
        alignItems: 'stretch',
    },
});
