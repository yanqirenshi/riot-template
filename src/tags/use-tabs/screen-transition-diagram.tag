<screen-transition-diagram>

    <div ref="screen-transition-diagram-root">
        <svg id="screen-transition-diagram-svg"
             style="border: 1px solid #888888;"
             ref="screen-transition-diagram-svg"></svg>
    </div>

    <script>
     this.draw = () => {
         let d3svg = this.makeD3Svg();
         let svg = d3svg.Svg();
         let forground = svg.selectAll('g.base.forground');
         let background = svg.selectAll('g.base.background');

         let options = {
             forground: forground,
             background: background,
         };

         new D3ScreenTransitionDiagram(options)
             .data(this.opts.source)
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
