<app>
    <menu-bar brand={{label:'RT'}} site={site()} moves={[]}></menu-bar>

    <app-page-area></app-page-area>

    <script>
     this.site = () => {
         return STORE.state().get('site');
     };
    </script>


    <script>
     /* this.on('mount', () => {
      *     ROUTER.rootElement(this.refs['page-area']);
      * }); */

     STORE.subscribe((action)=>{
         if (action.type=='MOVE-PAGE') {
             dump();
             this.tags['app-page-area'].update({ opts: { route: action.data }});
             }
         })

         window.addEventListener('resize', (event) => {
             this.update();
         });

         if (location.hash=='')
             location.hash=STORE.get('site.active_page');
    </script>
</app>
