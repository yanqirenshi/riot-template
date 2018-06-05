route(function (a) {
    let len = arguments.length;
    let page_code = arguments[0];
    let section_code = arguments.length==2 ? arguments[1] : 'root';

    let switchPage = (page_code, section_code, store, actions) => {
        let new_pages = store.state().get('pages');

        let active_page = null;

        for (var k in new_pages) {
            new_pages[k].active = (page_code==k);
            if (page_code==k)
                new_pages[k].sections = section_code;
        }

        store.dispatch(actions.movePage({
            pages: new_pages
        }));
    };

    switchPage(page_code, section_code, STORE, ACTIONS);

});
