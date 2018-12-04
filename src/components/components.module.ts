import { NgModule } from '@angular/core';
import { mapComponent } from './map/map';
import { ListDetailComponent } from './list-detail/list-detail';

@NgModule({
	declarations: [mapComponent,
    ListDetailComponent],
	imports: [],
	exports: [mapComponent,
    ListDetailComponent]
})
export class ComponentsModule {}
