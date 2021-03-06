import Vue from 'vue';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import './styles/app.scss';

import { CreateApp } from '@deip/platform-util';

import { ValidationPlugin } from '@deip/validation-plugin';
import { VuetifyExtended } from '@deip/vuetify-extended';

import { EnvModule } from '@deip/env-module';
import { AttributesModule } from '@deip/attributes-module';
import { LayoutsModule } from '@deip/layouts-module';
import { ScopesModule } from '@casimir/scopes-module';
import { AuthModule } from '@deip/auth-module';
import { UsersModule } from '@deip/users-module';
import { TeamsModule } from '@deip/teams-module';
import { PortalsModule } from '@deip/portals-module';
import { NftCollectionsModule } from '@casimir/nft-collections-module';
import { WalletModule } from '@deip/wallet-module';
import { AssetsModule } from '@deip/assets-module';
import { NftItemsModule } from '@casimir/nft-items-module';

import { TestAppAccountModule } from '@/modules/account';
import { TestAppAdminModule } from '@/modules/admin';
import { TestAppAuthModule } from '@/modules/auth';
import { TestAppTeamsModule } from '@/modules/teams';
import { TestAppNftCollectionsModule } from '@/modules/nftCollections';

import { layoutBuilderElements } from '@/modules/nftCollections/config/layoutBuilder';
import App from './App';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';

Vue.config.productionTip = false;

const testApp = new CreateApp(Vue, {
  store,
  router,
  vuetify,
  i18n
});

const layoutsModuleOptions = {
  blocks: layoutBuilderElements.blocks,
  components: layoutBuilderElements.components
};

const usersModuleOptions = {
  layoutsMappedKeys: [
    { key: 'listCard', label: 'User listing card', allowedTypes: ['details'] }
  ]
};

const teamsModuleOptions = {
  layoutsMappedKeys: [
    { key: 'listCard', label: 'Team listing card', allowedTypes: ['details'] }
  ]
};

const nftCollectionsModuleOptions = {
  attributesMappedKeys: [
    { key: 'name', label: 'NFT collection name', allowedTypes: ['text'] }
  ],
  layoutsMappedKeys: [
    { key: 'listCard', label: 'NFT collection listing card', allowedTypes: ['details'] }
  ]
};

testApp
  // setup environment - used in most modules
  .addModule(EnvModule)

  // turn plugins into modules
  .addModule(ValidationPlugin)
  .addModule(VuetifyExtended, { vuetify })

  // register DEIP modules
  .addModule(ScopesModule)
  .addModule(AttributesModule)
  .addModule(LayoutsModule, layoutsModuleOptions)
  .addModule(AuthModule)
  .addModule(UsersModule, usersModuleOptions)
  .addModule(TeamsModule, teamsModuleOptions)
  .addModule(PortalsModule)
  .addModule(NftCollectionsModule, nftCollectionsModuleOptions)
  .addModule(WalletModule)
  .addModule(AssetsModule)
  .addModule(NftItemsModule)

  .addModule(TestAppAccountModule)
  .addModule(TestAppAdminModule)
  .addModule(TestAppAuthModule)
  .addModule(TestAppTeamsModule)
  .addModule(TestAppNftCollectionsModule)

  // resolve and install all modules
  .bootstrap()

  // create application
  .then(() => {
    const app = new Vue({
      router,
      store,
      vuetify,
      i18n,
      render: (h) => h(App)
    });

    app.$mount('#app');

    console.info('complete');
  });
