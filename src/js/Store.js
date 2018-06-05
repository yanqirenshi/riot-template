class Store extends Vanilla_Redux_Store {
    constructor(reducer) {
        super(reducer, Immutable.Map({}));
    }
    init () {
        this._contents = Immutable.Map({
            pages: {
                page01: {
                    name: "Page01",
                    label: "P1",
                    active: false,
                    section: 'root'
                },
                page02: {
                    name: "Page02",
                    label: "P2",
                    active: false,
                    section: 'root'
                },
                page03: {
                    name: "Page03",
                    label: "P3",
                    active: false,
                    section: 'root'
                },
                page04: {
                    name: "Page04",
                    label: "P4",
                    active: false,
                    section: 'root'
                },
                page05: {
                    name: "Page05",
                    label: "P5",
                    active: false,
                    section: 'root'
                },
                page06: {
                    name: "Page06",
                    label: "P6",
                    active: false,
                    section: 'root'
                },
                page07: {
                    name: "Page07",
                    label: "P7",
                    active: false,
                    section: 'root'
                },
                page08: {
                    name: "Page08",
                    label: "P8",
                    active: false,
                    section: 'root'
                }
            }
        });
        return this;
    }
}
