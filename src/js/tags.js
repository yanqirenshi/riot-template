riot.tag2('app', '<menu-bar pages="{STORE.state().get(\'pages\')}" moves="{[]}"></menu-bar> <div id="page-area"> <page01 class="page"></page01> <page02 class="page"></page02> <page03 class="page"></page03> <page04 class="page"></page04> <page05 class="page"></page05> <page06 class="page"></page06> <page07 class="page"></page07> <page08 class="page"></page08> </div>', 'app > .page { width: 100vw; height: 100vh; overflow: hidden; display: block; } app .hide,[data-is="app"] .hide{ display: none; }', '', function(opts) {
     this.findPageTags = (tags)=>{
         let page_tags = {};
         for (var k in tags) {
             let tag = tags[k];
             let cls = tag.opts.class;
             if (cls && cls.split(' ').find((c)=>{ return c=='page';}))
                 page_tags[k] = tag;
         }
         return page_tags;
     }

     STORE.subscribe((action)=>{
         if (action.type!='MOVE-PAGE')
             return;

         this.tags['menu-bar'].update();

         let page_tags = this.findPageTags(this.tags);
         let pages = STORE.state().get('pages');

         let trg_hide = [];
         let trg_show = [];

         for (var page_code in pages) {
             let page = pages[page_code];
             let page_tag = page_tags[page_code];

             if (page_tag) {
                 if (page.active) {
                     trg_show.push(page_tag);
                 } else {
                     trg_hide.push(page_tag)
                 }
             } else {
                 if (page.active) {
                     trg_show.push(page_tag);
                 } else {
                     ;
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
     })

     window.addEventListener('resize', (event) => {
         this.update();
     });

     if (location.hash=='')
         location.hash='#page01'
});

riot.tag2('menu-bar', '<aside class="menu"> <p class="menu-label"> RT </p> <ul class="menu-list"> <li each="{page, key in opts.pages}"> <a class="{page.active ? \'is-active\' : \'\'}" href="{\'#\' + key}"> {page.label} </a> </li> </ul> </aside> <div class="move-page-menu hide"> </div>', 'menu-bar .move-page-menu { background: #e6cde3; position: fixed; left: 55px; top: 0px; width: 222px; height: 100vh; } menu-bar .move-page-menu.hide { display: none; } menu-bar > aside.menu { height: 100vh; width: 55px; padding: 11px 0px 11px 11px; position: fixed; left: 0px; top: 0px; background: #eebbcb; } menu-bar .menu-label, menu-bar .menu-list a { padding: 0; width: 33px; height: 33px; text-align: center; margin-top: 8px; border-radius: 3px; background: none; color: #ffffff; font-weight: bold; padding-top: 7px; font-size: 14px; } menu-bar .menu-list a { } menu-bar .menu-list a.is-active { width: 44px; padding-right: 11px; border-radius: 3px 0px 0px 3px; background: #ffffff; color: #333333; }', '', function(opts) {
});

riot.tag2('section-container', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <yield></yield> </div> </section>', '', '', function(opts) {
});

riot.tag2('section-contents', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <div class="contents"> <yield></yield> </div> </div> </section>', 'section-contents > section.section { padding: 0.0rem 1.5rem 2.0rem 1.5rem; }', '', function(opts) {
});

riot.tag2('section-header', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <yield></yield> </div> </section>', '', '', function(opts) {
});

riot.tag2('page01', '<section-header title="Page01"></section-header> <section-container title="概要"></section-container>', '', '', function(opts) {
});

riot.tag2('page02', '<section-header title="Page02"></section-header> <section-container title="概要"></section-container>', '', '', function(opts) {
});

riot.tag2('page03', '<section-header title="Page03"></section-header> <section-container title="概要"></section-container>', '', '', function(opts) {
});

riot.tag2('page04', '<section-header title="Page04"></section-header> <section-container title="概要"></section-container>', '', '', function(opts) {
});

riot.tag2('page05', '<section-header title="Page05"></section-header> <section-container title="概要"></section-container>', '', '', function(opts) {
});

riot.tag2('page06', '<section-header title="Page06"></section-header> <section-container title="概要"></section-container>', '', '', function(opts) {
});

riot.tag2('page07', '<section-header title="page07"></section-header> <section-container title="概要"></section-container>', '', '', function(opts) {
});

riot.tag2('page08', '<section-header title="Page08"></section-header> <section-container title="概要"></section-container>', '', '', function(opts) {
});
