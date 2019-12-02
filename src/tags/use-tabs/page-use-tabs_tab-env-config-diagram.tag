<page-use-tabs_tab-env-config-diagram>

    <section class="section">
        <div class="container">
            <h1 class="title"></h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <p>参照：<a href="https://github.com/yanqirenshi/D3.Deployment">D3.Deployment (Github)</a></p>

                <deployment-diagram source={graph_data}
                                    h={h()}
                                    look_at={{ x:-200, y: 600 }}></deployment-diagram>
            </div>
        </div>
    </section>

    <script>
     this.graph_data = {
         nodes: [],
         nodes: [],
     }
     this.h = () => {
         return 555;
     };
    </script>

</page-use-tabs_tab-env-config-diagram>
