import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [Tab3Page],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        Tab3PageRoutingModule,
        ComponentsModule
    ]
})
export class Tab3PageModule {}
