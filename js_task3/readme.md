- To be on the safe side I call hasOwnProperty method on Object.prototype (to exclude scenario
 when objPrototype has its own "hasOwnProperty" property)
- As agreed, it's assumed that value of any key can't be an Array, so I don't check it in my program