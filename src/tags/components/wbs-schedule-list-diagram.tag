<wbs-schedule-list-diagram>

    <wbs-tree-list data={data()}
                   options={wbs_list_options}></wbs-tree-list>

    <script>
     this.WBS = new WbsDiagram();

     this.wbs_list_options = {
         hide: {
             wbs: {
                 finished: false
             },
             workpackage: {
                 finished: false
             }
         }
     };
     this.data = () => {
         let state = this.WBS.ensureSource(opts.source)

         let options = this.wbs_list_options;

         if (state.projects.list.length==0)
             return [];

         let wbs = new Wbs()

         return wbs.composeTreeFlat(
             state.projects.list[0],
             state.wbs,
             state.workpackages,
             state.structures,
             options);
     };
    </script>

</wbs-schedule-list-diagram>
