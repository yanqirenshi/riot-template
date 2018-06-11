<page03-sec_root>
    <section-header title="Page03 Sec Root"></section-header>

    <script>
     this.sections = () => {
         let pages = STORE.state().get('site').pages;
         let page = pages.find((d) => { return d.code=='page03'; });

         return page.sections;
     }
    </script>
</page03-sec_root>
