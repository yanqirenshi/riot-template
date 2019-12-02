<page-use-tabs_tab-screen-transition-diagram>

    <section class="section">
        <div class="container">
            <h1 class="title"></h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <p>参照：<a href="https://github.com/yanqirenshi/Asshole">Asshole (Github)</a></p>
                <p>TODO：Use <a href="https://github.com/yanqirenshi/D3.Sketch">D3.Sketch (Github)</a></p>

                <screen-transition-diagram source={STORE.get('diagrams.std')}
                                           options={graph_options}></screen-transition-diagram>
            </div>
        </div>
    </section>

    <script>
     this.on('mount', () => {
         ACTIONS.fetchJsonScreenTransitionDiagram();
     });
     STORE.subscribe((action) => {
         if (action.type=='FETCHED-JSON-ENV-CONFIG-DIAGRAM') {
             this.update();
             return;
         }
     });
    </script>

    <script>
     this.graph_data = {
         screens: [],
         edges: [],
     }
     this.graph_options = {
         h: 1500,
         w: null,
         x: 300,
         y: 350,
     }
    </script>

</page-use-tabs_tab-screen-transition-diagram>
