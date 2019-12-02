class WbsDiagram {
    /////
    ///// ensureSource
    /////
    ensureSource (source) {
        if (source)
            return source;

        let pool = { ht: {}, list: [] };

        return  {
            projects: Object.assign({}, pool),
            wbs: Object.assign({}, pool),
            workpackages: Object.assign({}, pool),
            edges: Object.assign({}, pool),
            dependencies: Object.assign({}, pool),
        };
    };
    /////
    ///// getTargetWbs
    /////
    getTargetWbs (target, wbs) {
         let target_wbs = wbs.list.find((d) => {
             return d._id == target._id;
         });

         if (!target_wbs)
             return null;

         return target_wbs;
     };
    getStartNode (target, state) {
         if (!target)
             return null;

         let node = this.getTargetWbs(target, state.wbs) ||
                    this.getTargetWbs(target, state.workpackages);

         return node;
     }
    /////
    ///// StructureOptions
    /////
    StructureOptionsHide () {
        return {
            wbs: {
                finished: false,
            },
            workpackage: {
                finished: false,
            }
        };
    }
    StructureOptionsRows () {
        let hide_workpackage = false;

        if (hide_workpackage && hide_workpackage===true)
            hide_workpackage = true;
        else
            hide_workpackage = false;

        return {
            operators: {
                pageLink: (record) => {
                    let path_node = null;

                    if (record._class=='WBS')
                        path_node = 'wbs';
                    else if (record._class=='PROJECT')
                        path_node = 'projects';
                    else if (record._class=='WORKPACKAGE')
                        path_node = 'workpackages';

                    if (!path_node)
                        throw new Error('不明な Class です。class=' + record._class);

                    return '%s/%s/%d'.format(
                        location.hash.split('/')[0],
                        path_node,
                        record._id);
                },
            },
            workpackage: {
                hide: hide_workpackage,
            },
        };
    }
    StructureOptionsColumns () {
        return {
            code: {
                code: 'code',
                hide: false,
            },
            name: {
                code: 'name',
                hide: false,
            },
            schedule: {
                code: 'schedule',
                hide: true,
                children: {
                    start: {
                        hide: null, // 未使用
                    },
                    end: {
                        hide: null, // 未使用
                    },
                }
            },
            result: {
                code: 'result',
                hide: true,
                children: {
                    start: {
                        hide: null, // 未使用
                    },
                    end: {
                        hide: null, // 未使用
                    },
                }
            },
            operators: {
                code: 'operators',
                hide: true,
            },
            description: {
                code: 'description',
                hide: false,
            },
        };
    }
    StructureOptions () {

        return {
            hide: this.StructureOptionsHide(),
            rows: this.StructureOptionsRows(),
            columns: this.StructureOptionsColumns(),
        };
    };
}
