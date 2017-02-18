import _ from 'underscore'

const components = [
  'Authority',
  'Roles',
  'Users',
  'Worksheet',
  'Customer',
  'VisitLog',
  'AllLog',
  'CustomerTag',
  'Product',
  'Channel'
]

module.exports = components.reduce(function (memo, item) {
  return _.extend(memo, { [item]: require('react-router!./' + item) })
}, {})
