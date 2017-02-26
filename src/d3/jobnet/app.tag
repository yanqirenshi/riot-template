<app>
    <h1 class="title is-1">d3/jobnet @Riot Template Home</h1>

    <section class="graph">
        <jobnet-graph nodes={STORE.state().nodes}
                      edges={STORE.state().edges}
                      callbacks={callbacks}></jobnet-graph>
    </section>

    <global-menu mode="home"></global-menu>

    <message-area></message-area>

    <style>
     app {
         padding: 22px;
     }
     app div.card {
         padding: 22px;
     }
     app > section.graph {
         border: 1px solid #aaa;
         width: 100%;
         height: 666px;
     }
    </style>

    <script>
     this.callbacks = {};
     this.callbacks.saveNodePosition = function () {
         console.log('saveNodePosition!');
     };
    </script>
</app>
