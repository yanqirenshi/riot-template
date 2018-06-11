class Store extends Vanilla_Redux_Store {
    constructor(reducer) {
        super(reducer, Immutable.Map({}));
    }
    init () {
        let data = {
            site: {
                active_page: 'page01',
                home_page: 'page01',
                pages: [
                    {
                        code: "page01",
                        title: "P1",
                        active_section: 'root',
                        home_section: 'root',
                        sections: [
                            { code: 'root', tag: 'page01-sec_root', title: 'Section: root', description: '' },
                            { code: 'sec1', tag: 'page01-sec1',     title: 'Section: sec1', description: '' },
                            { code: 'sec2', tag: 'page01-sec2',     title: 'Section: sec2', description: '' },
                            { code: 'sec3', tag: 'page01-sec3',     title: 'Section: sec3', description: '' },
                        ]
                    },
                    {
                        code: "page02",
                        title: "P2",
                        active_section: 'root',
                        home_section: 'root',
                        sections: [{ code: 'root', tag: 'page02-sec_root', title: 'Home', description: '' }]
                    },
                    {
                        code: "page03",
                        title: "P3",
                        active_section: 'root',
                        home_section: 'root',
                        sections: [{ code: 'root', tag: 'page03-sec_root', title: 'Home', description: '' }]
                    }
                ]
            }
        };

        for (var i in data.site.pages) {
            let page = data.site.pages[i];
            for (var k in page.sections) {
                let section = page.sections[k];
                let hash = '#' + page.code;

                if (section.code!='root')
                    hash += '/' + section.code;

                section.hash = hash;
            }
        }


        this._contents = Immutable.Map(data);
        return this;
    }
}
