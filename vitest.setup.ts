import { RouterLinkStub, config } from '@vue/test-utils';

config.global.mocks = {
  $t: (key: string) => key
};

config.global.stubs = {
  RouterLink: RouterLinkStub,
  'client-only': {
    template: '<div><slot/></div>'
  }
};
