export function uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .split('')
        .map(c => {
            switch (c) {
                case 'x': return (Math.random() * 16 | 0).toString(16);
                case 'y': return ((Math.random() * 4 | 0) + 8).toString(16);
                default: return c;
            }
        })
        .join('');
}