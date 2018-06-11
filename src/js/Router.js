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

        // TODO: 応急処置
        let x = STORE.state().get('pages')[page_code].section;
        let y = {
            page02: 'root',
            page03: 'dashboard_root'
        };
        if (section_code=='root')
            section_code = y[page_code];
        // END: 応急処置

        let new_pages = store.state().get('pages');
        let active_page = null;

        for (var k in new_pages) {
            new_pages[k].active = (page_code==k);
            if (page_code==k)
                new_pages[k].section = section_code;
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
    /* **************************************************************** *
     * page
     * **************************************************************** */
    mountPages(root_tag, page_holder_elem, pages) {
        for (var tag_name in pages) {
            let page = pages[tag_name];

            if (page.active) {
                var elem = document.createElement(tag_name);

                elem.classList.add('page');

                page_holder_elem.appendChild(elem);

                let new_page_tag = riot.mount(tag_name);

                root_tag.tags[tag_name] = new_page_tag[0];
            }
        };
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
    switchPage2 (root_tag, pages, page_holder_elem) {
        let tags = root_tag.tags;
        let trg_show = [];

        for (var key in pages) {
            let page = pages[key];
            let tag = tags[key];
            if (page.active && !tag) {
                trg_show.push(key);
            } else if (page.active && tag && !tag.isMounted) {
                trg_show.push(key);
            } else if (!page.active && tag && tag.isMounted) {
                tag.unmount();
            }
        }

        for (var i in trg_show) {
            let tag_name = trg_show[i];

            var elem = document.createElement(tag_name);

            elem.classList.add('page');

            page_holder_elem.appendChild(elem);

            let new_page_tag = riot.mount(tag_name);
            root_tag.tags[tag_name] = new_page_tag[0];
        }
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
                    page_tag.update();
                } else {
                    trg_hide.push(page_tag);
                }
            } else {
                if (page.active) {
                    trg_show.push(page_tag);
                    page_tag.update();
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
    /* **************************************************************** *
     * section
     * **************************************************************** */
    mountSections (page, active_section_code, sections) {
        let root = page.root;

        for (var i in sections) {
            let section = sections[i];
            let tag_name = 'func-' + section.code;

            var elem = document.createElement(tag_name);

            if (section.code==active_section_code)
                elem.classList.add('page-section');
            else
                elem.classList.add('page-section', 'hide');

            root.appendChild(elem);

            let opts = {};
            if (section.code=='root')
                opts.sections = sections;

            let new_tags = riot.mount(tag_name, opts);

            page.tags[tag_name] = new_tags[0];
        }
    }
    journalize (page_code, tag_prefix, _active_section_code, sections) {
        let out = { hide: [], show: [] };
        let active_section_code = (tag_prefix + '-' + _active_section_code).toUpperCase();

        for (var i in sections) {
            let section = sections[i];
            if (active_section_code==section.root.tagName)
                out.show.push(section);
            else
                out.hide.push(section);
        }

        return out;
    };
    switchSection (page_code, tags, sections_data) {
        let sections = [];
        let active_section_code = this._store.state().get('pages')[page_code].section;

        let trgs = { hide: [], show: [] };
        for (var i in sections_data) {
            let section_data = sections_data[i];
            let tag = tags[section_data.code];
            if (!tag) continue;

            if (section_data.code==active_section_code)
                trgs.show.push(tag);
            else
                trgs.hide.push(tag);
        }

        for (var i in trgs.hide) {
            let trg = trgs.hide[i];
            let elem = trg.root;
            if (!elem.classList.contains('hide'))
                elem.classList.add("hide");
        }

        for (var i in trgs.show) {
            let trg = trgs.show[i];
            let elem = trg.root;
            if (elem.classList.contains('hide'))
                elem.classList.remove("hide");

            trg.update();
        }
    };
    /* **************************************************************** *
     * util
     * **************************************************************** */
    isHaveClass (class_trg, class_string) {
        if (!class_string) return false;

        let classes = class_string.trim().split(' ');
        let results = classes.find((cls) => { return cls==class_trg; });

        return !(results.length==0);
    };
    rmClass (class_trg, class_string) {
        let classes = class_string.trim().split(' ');
        let results = classes.filter((cls) => { return cls!=class_trg; });

        return results.join(' ');
    };
    addClass (class_trg, class_string) {
        let classes = class_string.trim().split(' ');
        if (classes.filter((cls) => { return cls==class_trg; }).length==0)
            classes.push(class_trg);

        return classes.join(' ');
    };
}
