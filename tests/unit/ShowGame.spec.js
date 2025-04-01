import { shallowMount } from '@vue/test-utils';
import ShowGame from '../../src/components/Mechanics/ShowGame.vue';

describe('ShowGame.vue', () => {
  it('class can be set', () => {
    const wrapper = shallowMount(ShowGame);
    expect(wrapper.vm.initializePlayer("Warrior", "playerOne", "hi")).toBe("Warrior");
    console.log("test 1")
    expect(wrapper.vm.initializePlayer("Mage", "playerOne", "hi")).toBe("Mage");
    console.log("test 2")
    expect(wrapper.vm.initializePlayer("Rogue", "playerOne", "hi")).toBe("Rogue");
    console.log("test 3")
  })
});
