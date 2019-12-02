<wbs-schedule-diagram>

    <wbs-guntt-chart data={data()}
                     start={start}
                     end={end}
                     options={wbsOptsions()}></wbs-guntt-chart>

    <script>
     this.WBS = new WbsDiagram();

     this.wbsOptsions = () => {
         let now   = moment().millisecond(0).second(0).minute(0).hour(0);

         return {
             scale: {
                 x: {
                     cycle: 'days',
                     tick: 88,
                     start: moment(now).add(-3, 'd'),
                     end:   moment(now).add( 3, 'w'),
                 }
             },
         };
     }

     this.data = () => {
         let state = this.WBS.ensureSource(opts.source)

         let options = {}

         if (state.projects.list.length==0)
             return [];

         let wbs = new Wbs();
         let x = state.projects.list.map((project) => {
             return wbs.composeTree(
                 project,
                 state.wbs,
                 state.workpackages,
                 state.edges)
         });

         return x;
     };
    </script>

</wbs-schedule-diagram>
