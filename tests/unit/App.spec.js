import { shallowMount } from '@vue/test-utils';
import App from '../../src/App.vue';

describe('App.vue', () => {
  it('isPlaying should be a boolean', () => {
    const wrapper = shallowMount(App);
    expect(typeof wrapper.vm.isPlaying).toBe('boolean');
  }),
  it('all components are listed', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.vm.startScreen)
    expect(wrapper.vm.ShowGame)
  })
});

