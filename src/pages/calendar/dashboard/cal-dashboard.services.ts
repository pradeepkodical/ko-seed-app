export class CalDashboardServices {
    static getItemsAsync(start: Date, end: Date) {
        return new Promise<Array<any>>((resolve, reject) => {
            setTimeout(() => {
                resolve([{ start, title: 'ICM Event' }, { start: end, title: 'Hello World 2' }])
            }, 1000);
        });
    }
}