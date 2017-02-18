export default function (type, ...argNames) {
  return function(...args) {
    let action = { type }
    argNames.forEach(function(arg, index){
      action[argNames[index]] = args[index]
    })
    return action
  }
}
