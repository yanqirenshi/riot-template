<page-use-tabs_tab_readme>

    <section class="section">
        <div class="container">
            <h1 class="title">Schedule</h1>
            <h2 class="subtitle"></h2>

            <section class="section">
                <div class="container">
                    <h1 class="title is-4">List</h1>

                    <div class="contents">
                        <wbs-schedule-list-diagram source={wbsData()}></wbs-schedule-list-diagram>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <h1 class="title is-4">Tree</h1>

                    <div class="contents">
                        <wbs-schedule-tree-diagram source={wbsData()}></wbs-schedule-tree-diagram>
                    </div>
                </div>
            </section>

        </div>
    </section>

    <script>
     this.wbsData = () => {
         this.WBS = new WbsDiagram();

         return this.WBS.ensureSource(null);
     };
    </script>

</page-use-tabs_tab_readme>
