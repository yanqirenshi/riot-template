riot.tag2('app-page-area', '', '', '', function(opts) {
     this.draw = () => {
         if (this.opts.route)
             ROUTER.draw(this, STORE.get('site.pages'), this.opts.route);
     }
     this.on('mount', () => {
         this.draw();
     });
     this.on('update', () => {
         this.draw();
     });
});

riot.tag2('app', '<menu-bar brand="{{label:\'RT\'}}" site="{site()}" moves="{[]}"></menu-bar> <app-page-area></app-page-area> <section-footer></section-footer>', '', '', function(opts) {
     this.site = () => {
         return STORE.state().get('site');
     };
     this.updateMenuBar = () => {
         if (this.tags['menu-bar'])
             this.tags['menu-bar'].update();
     }

     STORE.subscribe((action)=>{
         if (action.type=='MOVE-PAGE') {
             this.updateMenuBar();
             this.tags['app-page-area'].update({ opts: { route: action.route }});
         }
     });

     window.addEventListener('resize', (event) => {
         this.update();
     });

     if (location.hash=='')
         location.hash=STORE.get('site.active_page');
});

riot.tag2('markdown-preview', '', 'markdown-preview h1 { font-weight: bold; font-size: 20px; margin-top: 11px; margin-bottom: 6px; } markdown-preview h2 { font-weight: bold; font-size: 18px; margin-top: 8px; margin-bottom: 4px; } markdown-preview h3 { font-weight: bold; font-size: 16px; margin-top: 6px; margin-bottom: 3px; } markdown-preview h4 { font-weight: bold; font-size: 14px; margin-top: 6px; margin-bottom: 3px; } markdown-preview h5 { font-weight: bold; font-size: 12px; margin-bottom: 4px; } markdown-preview * { font-size: 12px; } markdown-preview table { border-collapse: collapse; } markdown-preview td { border: solid 0.6px #888888; padding: 2px 5px; } markdown-preview th { border: solid 0.6px #888888; padding: 2px 5px; background: #eeeeee; }', '', function(opts) {
     this.on('update', () => {
         this.root.innerHTML = this.opts.data;
     });

    this.root.innerHTML = opts.data

});

riot.tag2('menu-bar', '<aside class="menu"> <p ref="brand" class="menu-label" onclick="{clickBrand}"> {opts.brand.label} </p> <ul class="menu-list"> <li each="{opts.site.pages}"> <a class="{opts.site.active_page==code ? \'is-active\' : \'\'}" href="{\'#\' + code}"> {menu_label} </a> </li> </ul> </aside> <div class="move-page-menu hide" ref="move-panel"> <p each="{moves()}"> <a href="{href}">{label}</a> </p> </div>', 'menu-bar .move-page-menu { z-index: 666665; background: #ffffff; position: fixed; left: 55px; top: 0px; min-width: 111px; height: 100vh; box-shadow: 2px 0px 8px 0px #e0e0e0; padding: 22px 55px 22px 22px; } menu-bar .move-page-menu.hide { display: none; } menu-bar .move-page-menu > p { margin-bottom: 11px; } menu-bar > .menu { z-index: 666666; height: 100vh; width: 55px; padding: 11px 0px 11px 11px; position: fixed; left: 0px; top: 0px; background: #e198b4; } menu-bar .menu-label, menu-bar .menu-list a { padding: 0; width: 33px; height: 33px; text-align: center; margin-top: 8px; border-radius: 3px; background: none; color: #ffffff; font-weight: bold; padding-top: 7px; font-size: 14px; } menu-bar .menu-label,[data-is="menu-bar"] .menu-label{ background: #ffffff; color: #e198b4; } menu-bar .menu-label.open,[data-is="menu-bar"] .menu-label.open{ background: #ffffff; color: #e198b4; width: 44px; border-radius: 3px 0px 0px 3px; text-shadow: 0px 0px 1px #eee; padding-right: 11px; } menu-bar .menu-list a.is-active { width: 44px; padding-right: 11px; border-radius: 3px 0px 0px 3px; background: #ffffff; color: #333333; }', '', function(opts) {
     this.moves = () => {
         let moves = [
             { code: 'link-a', href: '', label: 'Link A' },
             { code: 'link-b', href: '', label: 'Link B' },
             { code: 'link-c', href: '', label: 'Link C' },
         ]
         return moves.filter((d)=>{
             return d.code != this.opts.current;
         });
     };

     this.brandStatus = (status) => {
         let brand = this.refs['brand'];
         let classes = brand.getAttribute('class').trim().split(' ');

         if (status=='open') {
             if (classes.find((d)=>{ return d!='open'; }))
                 classes.push('open')
         } else {
             if (classes.find((d)=>{ return d=='open'; }))
                 classes = classes.filter((d)=>{ return d!='open'; });
         }
         brand.setAttribute('class', classes.join(' '));
     }

     this.clickBrand = () => {
         let panel = this.refs['move-panel'];
         let classes = panel.getAttribute('class').trim().split(' ');

         if (classes.find((d)=>{ return d=='hide'; })) {
             classes = classes.filter((d)=>{ return d!='hide'; });
             this.brandStatus('open');
         } else {
             classes.push('hide');
             this.brandStatus('close');
         }
         panel.setAttribute('class', classes.join(' '));
     };
});

riot.tag2('modal-description-editor', '<div class="modal {isActive()}"> <div class="modal-background"></div> <div class="modal-content" style="width: 88vw;"> <div class="card"> <div class="card-content" style="height: 88vh;"> <div style="display:flex; height: 100%; width: 100%;flex-direction: column;"> <div style="margin-bottom:11px;"> <h1 class="title is-4">{title()} の Description の変更</h1> </div> <div style="display:flex; flex-grow: 1"> <div style="flex-grow: 1;margin-right: 8px;"> <div class="element-container"> <h1 class="title is-5">Markdown</h1> <textarea class="input" ref="description" onkeyup="{inputDescription}">{description()}</textarea> </div> </div> <div style=";flex-grow: 1;margin-left: 8px;"> <div class="element-container"> <h1 class="title is-5">Preview</h1> <div class="preview" style="padding: 0px 11px 11px 11px;"> <markdown-preview data="{marked(markdown)}"></markdown-preview> </div> </div> </div> </div> <div style="margin-top:11px;"> <button class="button is-warning" onclick="{clickCancel}">Cancel</button> <button class="button is-danger" style="float:right;" onclick="{clickSave}">Save</button> </div> </div> </div> </div> </div> </div>', 'modal-description-editor .element-container { display:flex; height: 100%; width: 100%; flex-direction: column; } modal-description-editor .element-container .title{ margin-bottom:6px; } modal-description-editor .input { border: 1px solid #eeeeee; padding: 11px; box-shadow: none; height: 100%; width: 100%; } modal-description-editor .preview { border: 1px solid #eeeeee; flex-grow:1; }', '', function(opts) {
     this.markdown = null;

     this.clickCancel = () => {
         this.opts.callback('close-modal-description-editor');
     };
     this.clickSave = () => {
         this.opts.callback('save-column-instance-description', {
             object: this.opts.data,
             value: this.refs['description'].value,
         });
     };
     this.inputDescription = () => {
         this.markdown = this.refs['description'].value;

         this.tags['markdown-preview'].update();
     };

     this.description = () => {
         if (!this.markdown) {
             let obj = this.opts.data;

             this.markdown = !obj ? '' : obj.description;
         }

         return this.markdown;
     };
     this.title = () => {
         if (!this.opts.data)
             return '';

         let obj = this.opts.data;
         return obj._class + ':' + obj.name;
     };
     this.isActive = () => {
         return this.opts.data ? 'is-active' : '';
     };
});

riot.tag2('page-tabs', '<div class="tabs is-boxed"> <ul> <li each="{opts.core.tabs}" class="{opts.core.active_tab==code ? \'is-active\' : \'\'}"> <a code="{code}" onclick="{clickTab}">{label}</a> </li> </ul> </div>', 'page-tabs li:first-child { margin-left: 55px; }', '', function(opts) {
     this.clickTab = (e) => {
         let code = e.target.getAttribute('code');
         this.opts.callback(e, 'CLICK-TAB', { code: code });
     };
});

riot.tag2('section-breadcrumb', '<section-container data="{path()}"> <nav class="breadcrumb" aria-label="breadcrumbs"> <ul> <li each="{opts.data}"> <a class="{active ? \'is-active\' : \'\'}" href="{href}" aria-current="page">{label}</a> </li> </ul> </nav> </section-container>', 'section-breadcrumb section-container > .section,[data-is="section-breadcrumb"] section-container > .section{ padding-top: 3px; }', '', function(opts) {
     this.path = () => {
         let hash = location.hash;
         let path = hash.split('/');

         if (path[0] && path[0].substr(0,1)=='#')
             path[0] = path[0].substr(1);

         let out = [];
         let len = path.length;
         let href = null;
         for (var i in path) {
             href = href ? href + '/' + path[i] : '#' + path[i];

             if (i==len-1)
                 out.push({
                     label: path[i],
                     href: hash,
                     active: true
                 });

             else
                 out.push({
                     label: path[i],
                     href: href,
                     active: false
                 });
         }
         return out;
     }
});

riot.tag2('section-container', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <yield></yield> </div> </section>', '', '', function(opts) {
});

riot.tag2('section-contents', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <div class="contents"> <yield></yield> </div> </div> </section>', 'section-contents > section.section { padding: 0.0rem 1.5rem 2.0rem 1.5rem; }', '', function(opts) {
});

riot.tag2('section-footer', '<footer class="footer"> <div class="container"> <div class="content has-text-centered"> <p> </p> </div> </div> </footer>', 'section-footer > .footer { background: #ffffff; padding-top: 13px; padding-bottom: 13px; }', '', function(opts) {
});

riot.tag2('section-header-with-breadcrumb', '<section-header title="{opts.title}"></section-header> <section-breadcrumb></section-breadcrumb>', 'section-header-with-breadcrumb section-header > .section,[data-is="section-header-with-breadcrumb"] section-header > .section{ margin-bottom: 3px; }', '', function(opts) {
});

riot.tag2('section-header', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <yield></yield> </div> </section>', 'section-header > .section { background: #ffffff; }', '', function(opts) {
});

riot.tag2('section-list', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th>機能</th> <th>概要</th> </tr> </thead> <tbody> <tr each="{data()}"> <td><a href="{hash}">{title}</a></td> <td>{description}</td> </tr> </tbody> </table>', '', '', function(opts) {
     this.data = () => {
         return opts.data.filter((d) => {
             if (d.code=='root') return false;

             let len = d.code.length;
             let suffix = d.code.substr(len-5);
             if (suffix=='_root' || suffix=='-root')
                 return false;

             return true;
         });
     };
});

riot.tag2('wbs-guntt-chart', '<div style="overflow:auto;"> <svg class="chart-yabane"></svg> </div>', '', '', function(opts) {
     this.on('update', (action) => {
         let tree = this.opts.data ? this.opts.data : [];
         let selector = 'svg.chart-yabane';

         let options = {
             stage: {
                 selector: selector,
                 padding: 11,
             },
             scale: this.opts.options.scale,
         };

         let d3yabane = new D3jsYabane({ callback: this.opts.callback })
             .config(options)
             .setScale()
             .makeStage()
             .data(tree)
             .draw();
     });
});

riot.tag2('wbs-tree-list', '<table class="table is-bordered is-narrow is-hoverable is-fullwidth"> <thead> <tr> <th rowspan="2" class="{isHideCol(\'code\')}">Code</th> <th rowspan="2" class="{isHideCol(\'name\')}">Name</th> <th colspan="4" class="{isHideCol(\'schedule\')}">Schedule</th> <th colspan="4" class="{isHideCol(\'result\')}">Result</th> <th rowspan="2" class="{isHideCol(\'operators\')} {hideOperators()}"> 操作 </th> <th rowspan="2" class="{isHideCol(\'description\')}">Description</th> </tr> <tr> <th colspan="2" class="{isHideCol(\'schedule\')}">start</th> <th colspan="2" class="{isHideCol(\'schedule\')}">end</th> <th colspan="2" class="{isHideCol(\'result\')}">start</th> <th colspan="2" class="{isHideCol(\'result\')}">end</th> </tr> </thead> <tbody> <tr each="{tableData()}" class="{tool.projectClass(_core._class)}"> <td nowrap class="{isHideCol(\'code\')}"> <a href="{pageLinkUrl(_core)}">{_core._id}</a> </td> <td nowrap class="{isHideCol(\'name\')}"> <span class="tree-mergin">{tool.margin(_level)}</span> <span>{_core.name}</span> </td> <td class="{_class} {isHideCol(\'schedule\')}" nowrap> {tool.date2str(term(_core,\'schedule\',\'start\'))} </td> <td class="week {_class} {isHideCol(\'schedule\')}" nowrap> {tool.date2week(term(_core,\'schedule\',\'start\'))} </td> <td class="{_class} {isHideCol(\'schedule\')}" nowrap> {tool.date2str(term(_core,\'schedule\',\'end\'))} </td> <td class="week {_class} {isHideCol(\'schedule\')}" nowrap> {tool.date2week(term(_core,\'schedule\',\'end\'))} </td> <td class="{_class} {isHideCol(\'result\')}" nowrap> {tool.date2str(term(_core,\'result\',\'start\'))} </td> <td class="week {_class} {isHideCol(\'result\')}" nowrap> {tool.date2week(term(_core,\'result\',\'start\'))} </td> <td class="{_class} {isHideCol(\'result\')}" nowrap> {tool.date2str(term(_core,\'result\',\'end\'))} </td> <td class="week {_class} {isHideCol(\'result\')}" nowrap> {tool.date2week(term(_core,\'result\',\'end\'))} </td> <td class="operators {isHideCol(\'operators\')} {hideOperators()}"> <button class="button is-small add-child {hideAddChildOperator(this)}" onclick="{clickAddChild}" node_id="{_core._id}"> 子を追加 </button> <button class="button is-small delete-node {hideDeleteOperator(this)}" onclick="{clickDeleteWp}" node_id="{_core._id}"> 削除 </button> </td> <td nowrap class="{isHideCol(\'description\')}"> <span>{_core.description}</span> </td> </tr> </tbody> </table>', 'wbs-tree-list .table th { background: #EAE2D6; color: #867666; font-size: 12px; vertical-align: middle; text-align: center; } wbs-tree-list .table td { font-size: 12px; vertical-align: middle; } wbs-tree-list .table tr.project td { font-size: 16px; font-weight: bold; } wbs-tree-list .table tr.wbs td { font-size: 14px; font-weight: bold; } wbs-tree-list td.WBS { color: #888888; } wbs-tree-list td.PROJECT { color: #666666; } wbs-tree-list td.operators { text-align: center; } wbs-tree-list td.operators > button.button { width: 100%; } wbs-tree-list td.operators > button.button.add-child:hover { background: #89c3eb; color: #ffffff; font-weight: bold; } wbs-tree-list td.operators > button.button.delete-node:hover { background: #ec6d71; color: #ffffff; font-weight: bold; } wbs-tree-list span.tree-mergin { font-size: 12px; font-weight: normal; } wbs-tree-list .table td.week { font-size: 12px; padding-left: 1px; padding-right: 1px; text-align: center; }', '', function(opts) {
     this.tool = new Wbs();

     this.pageLinkUrl = (record) => {
         let keys = "options.rows.operators.pageLink"
         let func = keys.split('.').reduce((a, b) => {
             if (!a || !a[b])
                 return null;

             return a[b];
         }, this.opts);

         if (func)
             return func(record);

         return this.tool.hashWbsPage(record._id, record._class);
     };

     this.clickAddChild = (e) => {
         this.opts.callback('open-add-child', {
             _id: e.target.getAttribute('node_id')
         });
     };
     this.clickDeleteWp = (e) => {
         this.opts.callback('open-delete-workpackage', {
             _id: e.target.getAttribute('node_id')
         });
     };
     STORE.subscribe((action) => {
         if (action.type=='FETCHED-PROJECT-TREE')
             this.update();

         if (action.type=='MOVE-PAGE')
             this.update();
     });

     this.options = { columns: this.opts.options.columns };
     this.isHideCol = (keys_str) => {
         if (!this.options.columns)
             return '';

         let keys = keys_str.split('.');
         let options = { children: this.options.columns };

         for (let key of keys) {
             let next = options.children[key]

             if (!next)
                 return '';

             options = next;
         }

         return options.hide ? 'hide' : '';
     };
     this.hideOperators = () => {
         if (!this.opts.options ||
             !this.opts.options.security)
             return '';

         let v = (this.opts.options.security.create || this.opts.options.security.delete);

         return v ? '' : 'hide';
     };
     this.hideAddChildOperator = (data) => {
         return data._class=='WBS' ? '' : 'hide';
     };
     this.hideDeleteOperator = (data) => {
         return data._class=='WORKPACKAGE' ? '' : 'hide';
     };

     this.term = (data, key, type) => {
         if (!data || !data[key]) return null;

         return data[key][type];
     };
     this.tableData = () => {
         let data = this.opts.data;

         if (!data)
             return [];

         let options = this.opts.options;
         if (options.rows && options.rows.workpackage)
             if (options.rows.workpackage.hide)
                 return data.filter((d) => {
                     return d._class != "WORKPACKAGE"
                 });

         return data;
     };
});

riot.tag2('deployment-diagram', '<svg ref="graph"></svg>', 'deployment-diagram { display: block; width: 100%; } deployment-diagram svg { border: 1px solid #eeeeee; }', 'riot-style="height:{opts.h}px;"', function(opts) {
     this.sketcher = null;
     this.draw = () => {
         let data = this.opts.source;

         let place = this.sketcher.getBase('forground');

         new D3Deployment()
             .init(place)
             .data(data)
             .draw(place);
     };

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
});

riot.tag2('screen-transition-diagram', '<div ref="screen-transition-diagram-root"> <svg id="screen-transition-diagram-svg" style="border: 1px solid #888888;" ref="screen-transition-diagram-svg"></svg> </div>', '', '', function(opts) {
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
});

riot.tag2('sections-list', '<table class="table"> <tbody> <tr each="{opts.data}"> <td><a href="{hash}">{code}</a></td> <td>{tag}</td> </tr> </tbody> </table>', '', '', function(opts) {
});

riot.tag2('wbs-schedule-list-diagram', '<wbs-tree-list data="{data()}" options="{wbs_list_options}"></wbs-tree-list>', '', '', function(opts) {
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
             state.edges,
             options);
     };
});

riot.tag2('wbs-schedule-diagram', '<wbs-guntt-chart data="{data()}" start="{start}" end="{end}" options="{wbsOptsions()}"></wbs-guntt-chart>', '', '', function(opts) {
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
});

riot.tag2('wbs-structure-diagram', '<wbs-tree-list data="{data()}" options="{wbsOptions()}"></wbs-tree-list>', '', '', function(opts) {
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
});

riot.tag2('page-have-childs', '<section-header title="Page01"></section-header> <section-container title="セクション" data="{sections()}"> <sections-list data="{opts.data}"> </sections-list> </section-container>', '', '', function(opts) {
     this.sections = () => {
         let pages = STORE.get('site').pages;
         let page = pages.find((d) => { return d.code=='have-child'; });

         return page.children;
     }
});

riot.tag2('page-have-childs_page1', '<section-header-with-breadcrumb title="Child 1"></section-header-with-breadcrumb>', '', '', function(opts) {
});

riot.tag2('page-have-childs_page2', '<section-header-with-breadcrumb title="Child 2"></section-header-with-breadcrumb>', '', '', function(opts) {
});

riot.tag2('page-have-childs_page3', '<section-header-with-breadcrumb title="Child 3"></section-header-with-breadcrumb>', '', '', function(opts) {
});

riot.tag2('page-home', '<section-header title="HOME"></section-header>', '', '', function(opts) {
});

riot.tag2('page-member', '<section-header title="Member"></section-header>', '', '', function(opts) {
     dump(this.opts._route)
});

riot.tag2('page-teams', '<section-header title="Teams"></section-header>', '', '', function(opts) {
});

riot.tag2('page-use-tabs', '<section-header title="Page02"></section-header> <div style="padding-left:55px;"> <page-tabs core="{page_tabs}" callback="{clickTab}"></page-tabs> </div> <div> <page-use-tabs_tab_readme class="hide" source="{children_source.schedules}"></page-use-tabs_tab_readme> <page-use-tabs_tab-screen-transition-diagram class="hide"></page-use-tabs_tab-screen-transition-diagram> <page-use-tabs_tab-env-config-diagram class="hide"></page-use-tabs_tab-env-config-diagram> <page-use-tabs_tab-e2e-test class="hide" source="{children_source.structures}"></page-use-tabs_tab-e2e-test> <page-use-tabs_tab-procedures class="hide" source="{children_source.structures}"></page-use-tabs_tab-procedures> <page-use-tabs_tab-models class="hide" source="{children_source.structures}"></page-use-tabs_tab-models> <page-use-tabs_tab-components class="hide" source="{children_source.structures}"></page-use-tabs_tab-components> <page-use-tabs_tab-api class="hide" source="{children_source.structures}"></page-use-tabs_tab-api> <page-use-tabs_tab-data-store class="hide" source="{children_source.structures}"></page-use-tabs_tab-data-store> <page-use-tabs_tab-classes class="hide" source="{children_source.structures}"></page-use-tabs_tab-classes> </div>', '', '', function(opts) {
     this.children_source = STORE.get('wbs');
     this.on('update', () => {
         this.source = STORE.get('wbs');
     });
     this.on('before-mount', () => {
         this.source = STORE.get('wbs');
     });
     STORE.subscribe((action) => {
         if (action.type=='FETCHED-JSON-WBS-STRUCTURE') {
             this.update();
             return;
         }

     });

     this.page_tabs = new PageTabs([
         {code: 'readme',     label: 'README',      tag: 'page-use-tabs_tab_readme' },
         {code: 'tab1',       label: '画面遷移図',  tag: 'page-use-tabs_tab-screen-transition-diagram' },
         {code: 'tab2',       label: '環境構成図',  tag: 'page-use-tabs_tab-env-config-diagram' },
         {code: 'tab3',       label: 'E2E テスト',  tag: 'page-use-tabs_tab-e2e-test' },
         {code: 'procedures', label: 'Procedures',  tag: 'page-use-tabs_tab-procedures' },
         {code: 'models',     label: 'Models',      tag: 'page-use-tabs_tab-models' },
         {code: 'components', label: 'Components',  tag: 'page-use-tabs_tab-components' },
         {code: 'api',        label: 'API',         tag: 'page-use-tabs_tab-api' },
         {code: 'data-store', label: 'Data Stores', tag: 'page-use-tabs_tab-data-store' },
         {code: 'classes',    label: 'Classes',     tag: 'page-use-tabs_tab-classes' },
     ]);

     this.on('mount', () => {
         this.page_tabs.switchTab(this.tags)

         ACTIONS.fetchJsonWbsStructure();

     });

     this.clickTab = (e, action, data) => {
         if (this.page_tabs.switchTab(this.tags, data.code))
             this.update();
     };
});

riot.tag2('page-use-tabs_tab-api', '<section class="section"> <div class="container"> <h1 class="title"></h1> <h2 class="subtitle"></h2> <div class="contents"> <wbs-structure-diagram source="{this.opts.source}" start_node_id="{14}"></wbs-structure-diagram> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-use-tabs_tab-classes', '<section class="section"> <div class="container"> <h1 class="title"></h1> <h2 class="subtitle"></h2> <div class="contents"> <wbs-structure-diagram source="{this.opts.source}" start_node_id="{16}"></wbs-structure-diagram> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-use-tabs_tab-components', '<section class="section"> <div class="container"> <h1 class="title"></h1> <h2 class="subtitle"></h2> <div class="contents"> <wbs-structure-diagram source="{this.opts.source}" start_node_id="{13}"></wbs-structure-diagram> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-use-tabs_tab-data-store', '<section class="section"> <div class="container"> <h1 class="title"></h1> <h2 class="subtitle"></h2> <div class="contents"> <wbs-structure-diagram source="{this.opts.source}" start_node_id="{15}"></wbs-structure-diagram> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-use-tabs_tab-e2e-test', '<section class="section"> <div class="container"> <h1 class="title"></h1> <h2 class="subtitle"></h2> <div class="contents"> <wbs-structure-diagram source="{this.opts.source}" start_node_id="{11}"></wbs-structure-diagram> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-use-tabs_tab-env-config-diagram', '<section class="section"> <div class="container"> <h1 class="title"></h1> <h2 class="subtitle"></h2> <div class="contents"> <p>参照：<a href="https://github.com/yanqirenshi/D3.Deployment">D3.Deployment (Github)</a></p> <deployment-diagram source="{STORE.get(\'diagrams.environment\')}" h="{h()}" look_at="{{ x:-200, y: 600 }}"></deployment-diagram> </div> </div> </section>', '', '', function(opts) {
     this.on('mount', () => {
         ACTIONS.fetchJsonEnvConfigDiagram();
     });
     STORE.subscribe((action) => {
         if (action.type=='FETCHED-JSON-ENV-CONFIG-DIAGRAM') {

             return;
         }
     });

     this.h = () => {
         return 333;
     };
});

riot.tag2('page-use-tabs_tab-models', '<section class="section"> <div class="container"> <h1 class="title"></h1> <h2 class="subtitle"></h2> <div class="contents"> <wbs-structure-diagram source="{this.opts.source}" start_node_id="{12}"></wbs-structure-diagram> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-use-tabs_tab-procedures', '<section class="section"> <div class="container"> <h1 class="title"></h1> <h2 class="subtitle"></h2> <div class="contents"> <wbs-structure-diagram source="{this.opts.source}" start_node_id="{10}"></wbs-structure-diagram> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-use-tabs_tab-screen-transition-diagram', '<section class="section"> <div class="container"> <h1 class="title"></h1> <h2 class="subtitle"></h2> <div class="contents"> <p>参照：<a href="https://github.com/yanqirenshi/Asshole">Asshole (Github)</a></p> <p>TODO：Use <a href="https://github.com/yanqirenshi/D3.Sketch">D3.Sketch (Github)</a></p> <screen-transition-diagram source="{STORE.get(\'diagrams.std\')}" options="{graph_options}"></screen-transition-diagram> </div> </div> </section>', '', '', function(opts) {
     this.on('mount', () => {
         ACTIONS.fetchJsonScreenTransitionDiagram();
     });
     STORE.subscribe((action) => {
         if (action.type=='FETCHED-JSON-ENV-CONFIG-DIAGRAM') {
             this.update();
             return;
         }
     });

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
});

riot.tag2('page-use-tabs_tab_readme', '<section class="section"> <div class="container"> <h1 class="title">Schedule</h1> <h2 class="subtitle"></h2> <section class="section"> <div class="container"> <h1 class="title is-4">List</h1> <div class="contents"> <wbs-schedule-list-diagram source="{wbsData()}"></wbs-schedule-list-diagram> </div> </div> </section> <section class="section"> <div class="container"> <h1 class="title is-4">Tree</h1> <div class="contents"> <wbs-schedule-tree-diagram source="{wbsData()}"></wbs-schedule-tree-diagram> </div> </div> </section> </div> </section>', '', '', function(opts) {
     this.wbsData = () => {
         this.WBS = new WbsDiagram();

         return this.WBS.ensureSource(null);
     };
});

riot.tag2('page-use-tabs_tab_tab3', '<section class="section"> <div class="container"> <h1 class="title"></h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});
