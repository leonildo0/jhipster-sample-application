import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationUsuarioModule } from './usuario/usuario.module';
import { JhipsterSampleApplicationTorneioModule } from './torneio/torneio.module';
import { JhipsterSampleApplicationAdministradorModule } from './administrador/administrador.module';
import { JhipsterSampleApplicationPremiumModule } from './premium/premium.module';
import { JhipsterSampleApplicationInscricaoModule } from './inscricao/inscricao.module';
import { JhipsterSampleApplicationLanchoneteModule } from './lanchonete/lanchonete.module';
import { JhipsterSampleApplicationReservaModule } from './reserva/reserva.module';
import { JhipsterSampleApplicationComputadorModule } from './computador/computador.module';
import { JhipsterSampleApplicationConsoleModule } from './console/console.module';
import { JhipsterSampleApplicationSessaoModule } from './sessao/sessao.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipsterSampleApplicationUsuarioModule,
        JhipsterSampleApplicationTorneioModule,
        JhipsterSampleApplicationAdministradorModule,
        JhipsterSampleApplicationPremiumModule,
        JhipsterSampleApplicationInscricaoModule,
        JhipsterSampleApplicationLanchoneteModule,
        JhipsterSampleApplicationReservaModule,
        JhipsterSampleApplicationComputadorModule,
        JhipsterSampleApplicationConsoleModule,
        JhipsterSampleApplicationSessaoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
