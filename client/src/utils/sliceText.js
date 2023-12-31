export const sliceText = (text, numOfCharacters) => {
    if (text.length > numOfCharacters) {
        return text.slice(0, numOfCharacters) + '...';
    }

    return text;
};
