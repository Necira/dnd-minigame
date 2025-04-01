import { shallowMount } from '@vue/test-utils';
import App from './vuednd/src/App.vue';

describe('App.vue', () => {
  test('isPlaying should be a boolean', () => {
    const wrapper = shallowMount(App);
    expect(typeof wrapper.isPlaying).toBe('boolean');
  });
});
