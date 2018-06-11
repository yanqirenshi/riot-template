<page02-sec_root>
    <section-header title="Page02 Sec Root"></section-header>

    <script>
     this.sections = () => {
         let pages = STORE.state().get('site').pages;
         let page = pages.find((d) => { return d.code=='page02'; });

         return page.sections;
     }
    </script>
</page02-sec_root>
