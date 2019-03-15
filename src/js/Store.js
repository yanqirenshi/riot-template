class Store extends Vanilla_Redux_Store {
    constructor(reducer) {
        super(reducer, Immutable.Map({}));
    }
    pages() {
        return [
            {
                code: "home",
                menu_label: '家',
                tag: 'home_page_root',
                children: [],
                stye: {
                    color: { 1: '#fdeff2', 2: '#e0e0e0', 3: '#e198b4', 4: '#ffffff', 5: '#eeeeee', 5: '#333333' }
                }
            },
            {
                code: "page01",
                menu_label: 'ペ1',
                tag: 'page01_page_root',
                children: [],
                stye: {
                    color: { 1: '#fdeff2', 2: '#e0e0e0', 3: '#e198b4', 4: '#ffffff', 5: '#eeeeee', 5: '#333333' }
                }
            },
            {
                code: "page02",
                menu_label: 'ペ2',
                tag: 'page02_page_root',
                children: [],
                stye: {
                    color: { 1: '#fdeff2', 2: '#e0e0e0', 3: '#e198b4', 4: '#ffffff', 5: '#eeeeee', 5: '#333333' }
                }
            },
            {
                code: "page03",
                menu_label: 'ペ3',
                tag: 'page03_page_root',
                children: [],
                stye: {
                    color: { 1: '#fdeff2', 2: '#e0e0e0', 3: '#e198b4', 4: '#ffffff', 5: '#eeeeee', 5: '#333333' }
                }
            },
            {
                code: "teams",
                menu_label: '集',
                tag: 'page_teams',
                children: [
                    {
                        code: "members",
                        children: [
                            {
                                code: "user-id",
                                regex: /^\d+$/,
                                // TODO: regex: { contents: /^\d+$/, type: 'integer' },
                                tag: 'page_member',
                                children: [],
                            },
                        ],
                    },
                ],
            },
        ];
    }
    init () {
        let data = {
            site: {
                active_page: 'home',
                home_page: 'home',
                pages: this.pages(),
            }
        };

        for (let page of data.site.pages)
            this.setHashTo(page);

        this._contents = Immutable.Map(data);
        return this;
    }
}
