<screen-transition-diagram>

    <div ref="screen-transition-diagram-root">
        <svg id="screen-transition-diagram-svg"
             style="border: 1px solid #888888;"
             ref="screen-transition-diagram-svg"></svg>
    </div>

    <script>
     this.makeEdges = (source) => {
         let screens = source.screens.reduce((ht, d) => {
             ht[d._id] = d;
             return ht;
         }, {});
         let edges   = source.edges;

         let out = edges.map((edge) => {
             let from = screens[edge.from];
             let to   = screens[edge.to];

             return {
                 _id: 35,
                 _class: "EDGE",
                 from_id: from._id,
                 from_class: from._class,
                 to_id: to._id,
                 to_class: to._class,
             }
         });

         return out;
     };
     this.draw = () => {
         let d3svg = this.makeD3Svg();
         let svg = d3svg.Svg();
         let forground = svg.selectAll('g.base.forground');
         let background = svg.selectAll('g.base.background');

         let options = {
             forground: forground,
             background: background,
         };

         let source = this.opts.source
         let data = {
             screens: this.opts.source.screens,
             edges: this.makeEdges(source),
         };

         new D3ScreenTransitionDiagram(options)
             .data(data)
             .sizing()
             .positioning()
             .draw();
     }
     function makeBases (d3svg) {
         let svg = d3svg.Svg();

         let base = [
             { _id: -10, code: 'background' },
             { _id: -15, code: 'forground' },
         ];

         svg.selectAll('g.base')
            .data(base, (d) => { return d._id; })
            .enter()
            .append('g')
            .attr('class', (d) => {
                return 'base ' + d.code;
            });
     }
     this.makeD3Svg = () => {
         let parent = this.refs['screen-transition-diagram-root']
         let w = parent.clientWidth
         let h = this.opts.options.h;

         let svg_tag = this.refs['screen-transition-diagram-svg'];
         svg_tag.setAttribute('height',h);
         svg_tag.setAttribute('width',w);

         let d3svg = new D3Svg({
             d3: d3,
             svg: d3.select("#screen-transition-diagram-svg"),
             x: this.opts.options.x,
             y: this.opts.options.y,
             w: w,
             h: h,
             scale: 1.6,
         });

         makeBases(d3svg);

         return d3svg;
     }
     this.on('mount', () => {
         this.draw();
     });
     this.on('update', () => {
         try {
             this.draw();
         } catch (e) {
             console.log('---');
             console.log(e);
             console.log('---');
         }
     });
    </script>

</screen-transition-diagram>
