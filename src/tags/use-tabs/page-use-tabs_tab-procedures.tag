<page-use-tabs_tab-procedures>

    <section class="section">
        <div class="container">
            <h1 class="title"></h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <wbs-structure-diagram source={childSource()}></wbs-structure-diagram>
            </div>
        </div>
    </section>

    <script>
     this.childSource = () => {
         let pool = { ht: {}, list: [] };

         return {
             projects: Object.assign({}, pool),
             wbs: Object.assign({}, pool),
             workpackages: Object.assign({}, pool),
             edges: Object.assign({}, pool),
             dependencies: Object.assign({}, pool),
         };
     }
    </script>

</page-use-tabs_tab-procedures>
