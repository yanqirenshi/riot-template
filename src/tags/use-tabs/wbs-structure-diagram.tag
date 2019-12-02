<wbs-structure-diagram>

    <wbs-tree-list data={data()} options={wbsOptions()}></wbs-tree-list>

    <script>
     this.WBS = new WbsDiagram();

     this.wbsOptions = () => {
         return this.WBS.StructureOptions(this.opts);
     };
     this.data = () => {
         let state = this.WBS.ensureSource(opts.source)
         let options = this.wbsOptions();

         if (state.projects.list.length==0)
             return [];

         let wnqi = new Wnqi()

         return wnqi.composeTreeFlat(
             this.WBS.getStartNode(this.opts.start_node_id, state),
             state.wbs,
             state.workpackages,
             state.structures,
             options);
     };
    </script>

</wbs-structure-diagram>
