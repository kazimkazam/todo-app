const handlePriority = (string) => {
    switch (string) {
        case 1:
            return 'highPriority';
        case 2:
            return 'mediumPriority';
        case 3:
            return 'lowPriority';
        default:
            return 'lowPriority';
    };
};

export { handlePriority };