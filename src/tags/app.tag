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

    <section-footer>

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
     STORE.subscribe((action)=>{
         if (action.type!='MOVE-PAGE')
             return;

         let tags= this.tags;

         tags['menu-bar'].update();
         ROUTER.switchPage(tags);
     })

     window.addEventListener('resize', (event) => {
         this.update();
     });

     if (location.hash=='')
         location.hash='#page01'
    </script>
</app>
