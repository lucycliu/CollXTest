export function getImageUrl(
    assetUrl: string | undefined,
    quality: 'high' | 'low',
) {
    return assetUrl ? `${assetUrl}/${quality}.png` : undefined;
}
