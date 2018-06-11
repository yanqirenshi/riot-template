<page03>
    <script>
     this.page_code = this.root.tagName.toLowerCase();

     this.draw = () => {
         let page_state = STORE.state().get('site').pages.find((d) => { return d.code==this.page_code});

         ROUTER.switchSection(this,
                              page_state.active_section,
                              page_state.sections);
     }

     this.on('mount', () => { this.draw(); });
     this.on('update', () => { this.draw(); });
    </script>
</page03>
