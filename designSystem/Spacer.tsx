import { View } from 'react-native';

export function HSpacer({ w }: { w: number }) {
    return <View style={{ width: w }} />;
}

export function VSpacer({ h }: { h: number }) {
    return <View style={{ height: h }} />;
}
