class Router {
    constructor(store, actions) {
        this._store = store;
        this._actions = actions;

        let self = this;
        route(function (a) {
            self.routing(arguments);
        });
    }
    routing (args) {
        let store = this._store;
        let actions = this._actions;

        let len = args.length;
        let page_code = args[0];
        let section_code = args.length==2 ? args[1] : 'root';

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
    }
    start () {
        route.start(function () {
            let hash = location.hash;
            let len = hash.length;
            if (len==0)
                return '/';
            return hash.substring(1);
        }());
    }
    findPageTags (tags) {
        let page_tags = {};
        for (var k in tags) {
            let tag = tags[k];
            let cls = tag.opts.class;
            if (cls && cls.split(' ').find((c)=>{ return c=='page';}))
                page_tags[k] = tag;
        }
        return page_tags;
    }
    switchPage (tags) {
        let store = this._store;
        let pages = store.state().get('pages');
        let page_tags = this.findPageTags(tags);
        let trg_hide = [];
        let trg_show = [];

        for (var page_code in pages) {
            let page = pages[page_code];
            let page_tag = page_tags[page_code];

            // このロジックより、一度全部判定してから、削除&隠す⇒表示 が良いのではないか。
            if (page_tag) {
                if (page.active) {
                    trg_show.push(page_tag);
                } else {
                    trg_hide.push(page_tag);
                }
            } else {
                if (page.active) {
                    trg_show.push(page_tag);
                } else {
                    ; // なにもしない
                }
            }
        }

        for (var i in trg_hide) {
            let tag = trg_hide[i].root;
            let classes = tag.getAttribute('class').split(' ');
            let hide = classes.filter((d)=>{ return d=='hide'; });
            if (hide.length==0) {
                classes.push('hide');
                tag.setAttribute('class', classes.join(' '));
            }
        }
        for (var i in trg_show) {
            let tag = trg_show[i].root;
            let classes = tag.getAttribute('class').split(' ');
            let hide = classes.filter((d)=>{ return d=='hide'; });
            if (hide.length>0) {
                tag.setAttribute('class', classes.filter((d)=>{
                    return d!='hide';
                }));
            }
        }
    }
}
