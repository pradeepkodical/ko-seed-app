export abstract class BasePageComponent {
    public screenWidth: ko.Observable<number>;
    public url: ko.Observable<string>;
    constructor(params: {
        screenWidth: ko.Observable<number>;
        url: ko.Observable<string>;
    }) {
        this.screenWidth = params.screenWidth;
        this.url = params.url;
    }
}