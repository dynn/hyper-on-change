const curry = require('ramda/src/curry')
const equals = require('ramda/src/equals')
const mapObjIndexed = require('ramda/src/mapObjIndexed')
const assoc = require('ramda/src/assoc')
const forEach = require('ramda/src/forEach')

const hoa = curry((appTemplate, initialState, actionsTemplate, view, container) => {
  let eventHandlers = []
  let oldState = initialState

  const actions = mapObjIndexed((action) => {
    return (value) => (state) => {
      const resultState = action(value)(state)

      if (!equals(resultState, oldState)) {
        forEach(fn => fn(resultState), eventHandlers)
        oldState = resultState
      }

      return resultState
    }
  }, actionsTemplate)

  const addEventListener = (fn) => {
    eventHandlers.push(fn)
  }

  const addOnStateChange = assoc('onChange', addEventListener)
  const instance = appTemplate(initialState, actions, view, container)

  const app = addOnStateChange(instance)

  return app
})

module.exports = hoa
