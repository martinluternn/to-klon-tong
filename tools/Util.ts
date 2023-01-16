export function toTitleCase(text: string): string {
    let splited: string[] = text.toLowerCase().split(' ');
    splited = splited.map((val: string) => {
        return val.replace(val[0], val[0].toUpperCase());
    });
    return splited.join(' ');
}

export function toCurrencyFormat(currency: string, amount: number): string {
    if (!amount)
        return 'Rp -'
    let temp: string = '' + amount;
    let minusFlag: boolean = false;

    if (temp.includes('-')) {
        temp = temp.replace('-', '');
        minusFlag = true;
    }
    amount = parseInt(temp, 10);

    const res: string = currency + ' ' + amount.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1.');

    if (minusFlag)
        return '-' + res.substr(currency === '' ? 1 : 0, currency === '' ? res.length - 3 : res.length - 2);

    return res.substr(currency === '' ? 1 : 0, currency === '' ? res.length - 3 : res.length - 2);
}

export function createRandomString() {
    const random: string = Math.random().toString(36).substr(2).toUpperCase();
    return `${random.slice(0, 5)}`;
}

export function truncText(text: string, maxChars: number = 15): string {
    return text.length > maxChars ? `${text.substr(0, maxChars)}...` : text;
}

export function truncTextWithoutEllipsing(text: string, maxChars: number = 15): string {
    return text.length > maxChars ? `${text.substr(0, maxChars)}` : text;
}