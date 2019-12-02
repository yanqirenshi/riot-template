class Store extends Vanilla_Redux_Store {
    constructor(reducer) {
        super(reducer, Immutable.Map({}));
    }
    pages() {
        return [
            {
                code: "home",
                menu_label: '家',
                tag: 'page-home',
            },
            {
                code: "use-tabs",
                menu_label: 'タブ',
                tag: 'page-use-tabs',
            },
            {
                code: "have-child",
                menu_label: '子供',
                tag: 'page-have-childs',
                children: [
                    {
                        code: "child01",
                        tag: 'page-have-childs_page1',
                    },
                    {
                        code: "child02",
                        tag: 'page-have-childs_page2',
                    },
                    {
                        code: "child03",
                        tag: 'page-have-childs_page3',
                    },
                ],
            },
            {
                code: "teams",
                menu_label: '集',
                tag: 'page-teams',
                children: [
                    {
                        code: "members",
                        children: [
                            {
                                code: "user-id",
                                regex: /^\d+$/,
                                // TODO: regex: { contents: /^\d+$/, type: 'integer' },
                                tag: 'page-member',
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
            },
            wbs: {
                structures: {
                    projects:     { ht: {}, list: [] },
                    wbs:          { ht: {}, list: [] },
                    workpackages: { ht: {}, list: [] },
                    edges:        { ht: {}, list: [] },
                    dependencies: { ht: {}, list: [] },
                },
                schedules: {
                    projects:     { ht: {}, list: [] },
                    wbs:          { ht: {}, list: [] },
                    workpackages: { ht: {}, list: [] },
                    edges:        { ht: {}, list: [] },
                    dependencies: { ht: {}, list: [] },
                },
            },
        };

        this._contents = Immutable.Map(data);
        return this;
    }
}
