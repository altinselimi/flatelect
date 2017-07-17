import flatelect from 'src/flatelect/flatelect.vue'
import { createVM } from '../helpers/utils.js'

describe('flatelect.vue', function () {
  it('should render correct contents', function () {
    const vm = createVM(this, `
<flatelect :options="['Alaska', 'Arizona', 'Vushtrri']"></flatelect>
`, { components: { flatelect }})
    vm.$el.querySelector('.select-filter').hasChildNodes().should.eql(true)
  })
})
