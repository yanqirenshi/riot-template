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
     app > .page.hide { display: none; }
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

         let page_tags = this.findPageTags(this.tags);
         let pages = STORE.state().get('pages');

         for (var page_code in pages) {
             let page = pages[page_code];
             let page_tag = page_tags[page_code];

             // このロジックより、一度全部判定してから、削除&隠す⇒表示 が良いのではないか。
             if (page_tag) {
                 if (page.active) {
                     ;
                 } else {
                     ;
                 }
             } else {
                 if (page.active) {
                     ;
                 } else {
                     ; // なにもしない
                 }
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
