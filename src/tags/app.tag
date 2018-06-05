<app>
    <menu-bar pages={STORE.state().get('pages')}
              moves={[]}></menu-bar>

    <div id="page-area">
        <page01 class="page"></page01>
        <page02 class="page"></page02>
        <page03 class="page"></page03>
        <page04 class="page"></page04>
        <page05 class="page"></page05>
        <page06 class="page"></page06>
        <page07 class="page"></page07>
        <page08 class="page"></page08>
    </div>

    <style>
     app > .page {
         width: 100vw;
         height: 100vh;
         overflow: hidden;
         display: block;
     }
     .hide { display: none; }
    </style>

    <script>
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

             // このロジックより、一度全部判定してから、削除&隠す⇒表示 が良いのではないか。
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
     })

     window.addEventListener('resize', (event) => {
         this.update();
     });

     if (location.hash=='')
         location.hash='#page01'
    </script>
</app>
