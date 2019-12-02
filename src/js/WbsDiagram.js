class WbsDiagram {
    /////
    ///// response2state
    /////
    list2pool (list) {
        let ht = list.reduce((ht, obj) => {
            ht[obj._id] = obj;

            return ht;
        }, {});

        return { ht: ht, list: list };
    }
    list2Structures (list, projects, wbs, workpackages) {
        let getWbsNode = (_id) => {
            return projects.ht[_id] || wbs.ht[_id] || workpackages.ht[_id];
        };

        if (!this.edge_id)
            this.edge_id = 1;

        let out = list.map((structure) => {
            let node_from = getWbsNode(structure.from);
            let node_to   = getWbsNode(structure.to);

            if (!node_from || !node_to) {
                console.warn('どっちもあらへん。from=%d, to=%d', structure.from, structure.to);
                return null;
            }

            return {
                _id        : this.edge_id++,
                _class     : "EDGE",
                from_class : node_from._class,
                from_id    : node_from._id,
                to_class   : node_to._class,
                to_id      : node_to._id,
            };
        });

        return out.filter((d) => { return !(d===null); });
    }
    response2state (response) {
        let projects     = this.list2pool(response.projects);
        let wbs          = this.list2pool(response.wbs);
        let workpackages = this.list2pool(response.workpackages);

        let structures   = this.list2Structures (response.structures,   projects, wbs, workpackages);
        let dependencies = this.list2Structures (response.dependencies, projects, wbs, workpackages);

        return {
            projects:     projects,
            wbs:          wbs,
            workpackages: workpackages,
            structures:   this.list2pool(structures),
            dependencies: this.list2pool(dependencies),
        };
    }
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
            structures: Object.assign({}, pool),
            dependencies: Object.assign({}, pool),
        };
    };
    /////
    ///// getTargetWbs
    /////
    getStartNode (target_id, state) {
        let node = state.projects.ht[target_id]
            || state.wbs.ht[target_id]
            || state.workpackages.ht[target_id];

        if (node)
            return node;

        throw new Error('Not found start node. _id=' + target_id);
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
