let resource = {
    id: {},
    string: {},
    drawable: {}
};

const handle =  {
    get: (o, key) => {
        console.log(o, key)
        if (key == 'id') {
            return o.id;
        }
    }
}

export let R = {
    id: new Proxy({}, {
        get: (o, key) =>(o[key] = {}) && console.log(o, key)
    }),
    string: new Proxy(resource, handle),
    drawable: new Proxy(resource, handle)
};