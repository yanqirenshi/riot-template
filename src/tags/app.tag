<app>
    <menu-bar pages={pages()} moves={[]}></menu-bar>

    <div ref="page-area"></div>

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
     this.pages = () => {
         return STORE.state().get('pages');
     };

     this.on('mount', () => {
         ROUTER.mountPages(this, this.refs['page-area'], this.pages());
     });

     STORE.subscribe((action)=>{
         if (action.type!='MOVE-PAGE')
             return;

         let tags= this.tags;

         tags['menu-bar'].update();
         ROUTER.switchPage2(this, this.pages(), this.refs['page-area']);
     })

     window.addEventListener('resize', (event) => {
         this.update();
     });

     if (location.hash=='')
         location.hash='#page01'
    </script>
</app>
