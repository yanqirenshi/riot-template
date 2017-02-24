<network-graph>
    <script>
     this.graph = new NetworkGraph();

     this.resize  = function () {
         var root = this.root;
         var w = root.clientWidth;
         var h = root.clientHeight;

         this.graph.setSize(w,h);

         var svg = root.getElementsByTagName('svg');
         svg[0].setAttribute('width', w + 'px');
         svg[0].setAttribute('height', h + 'px');
     }

     window.addEventListener('resize', function (event) {
         this.resize();
         this.update();
     }.bind(this));

     this.on('mount', function () {
         var svg = d3.select("network-graph").append('svg');
         this.graph.setSvg(svg);
         this.graph.setCallbacks(this.opts.callbacks);
         this.graph.setNodes(this.opts.nodes);
         this.graph.setEdges(this.opts.edges);
         this.graph.draw();

         this.resize();
     }.bind(this));
    </script>

    <style>
     network-graph {
         display: block;
         width: 100%;
         height: 100%;
     }
    </style>
</network-graph>
