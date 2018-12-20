import MutationObserver from './lib/mutation.js'
import View from './lib/view.js'
import * as handler from './lib/handler.js'

export class R {
	static get id() {
		return new Proxy({}, handler.viewID)
	}
}

export function findViewById(id) {
    const view = new View(id);
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
			if (mutation.type == 'childList' && mutation.target && [...mutation.addedNodes].length) {
            	if (typeof view.id == 'function') {
            		const id = view.id();
            		if (id) view.id = id;
            	}
            }
		})
    })
    
    observer.observe(document.body, {
        attributes: true,
        childList: true,
        characterData: false,
        subtree: true
    })
    
    view.watch('id', (id, oldValue, nwValue) => {
        setTimeout(()=>view.queue.exec(),0);
        return nwValue
    })
    
    return view;
}