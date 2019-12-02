<deployment-diagram style="height:{opts.h}px;">

    <svg ref="graph"></svg>

    <script>
     this.sketcher = null;
     this.draw = () => {
         let data = this.opts.source;

         let place = this.sketcher.getBase('forground');

         new D3Deployment()
             .init(place)
             .data(data)
             .draw(place);
     };
    </script>

    <script>
     this.sketcher = null;
     this.makeCamera = (size) => {
         let gain = 3.0

         return {
             look: {
                 at: {
                     x: (size.w /2 * -1) + (this.opts.look_at.x || 0),
                     y: (size.h /2 * -1) + (this.opts.look_at.y || 0),
                 },
             },
             scale: gain,
         };
     }
     this.getSize = () => {
         let size;
         size = {
             w: this.refs.graph.parentNode.clientWidth,
             h: this.refs.graph.parentNode.clientHeight,
         };

         if (size.w<0)
             size.w = 0;

         if (size.h<0)
             size.h = 0;

         return size;
     }
     this.makeSketcher = () => {
         let size   = this.getSize();
         let camera = this.makeCamera(size);

         return new DefaultSketcher({
             element: {
                 selector: 'deployment-diagram svg',
             },
             w: size.w,
             h: size.h,
             x: camera.look.at.x,
             y: camera.look.at.y - 600,
             scale: camera.scale,
         });
     }
     this.on('update', () => {
         try {
             this.sketcher = this.makeSketcher();

             this.draw();
         } catch (e) {
             console.log('---');
             console.log(e);
             console.log('---');
         }
     });
    </script>

    <style>
     deployment-diagram {
         display: block;
         width: 100%;
     }
     deployment-diagram svg {
         border: 1px solid #eeeeee;
     }
    </style>

</deployment-diagram>
