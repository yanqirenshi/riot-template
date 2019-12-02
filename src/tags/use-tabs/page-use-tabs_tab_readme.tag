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
     this.on('mount', () => {
         ACTIONS.fetchJsonWbsSchedule();
     });
     STORE.subscribe((action) => {
         if (action.type=='FETCHED-JSON-WBS-SCHEDULE') {
             this.update();
             return;
         }
     });
    </script>


    <script>
     this.wbsData = () => {
         this.WBS = new WbsDiagram();

         let data = STORE.get('wbs.schedules');

         let i = 100000000;

         for (let d of data.workpackages.list) {
             d.schedule._id = i++;
             d.schedule._class = "SCHEDULE";
             d.result._id = i++;
             d.result._class = "RESULT";
         }

         return data;
     };
    </script>

</page-use-tabs_tab_readme>
