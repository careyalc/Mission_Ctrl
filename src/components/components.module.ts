import { NgModule } from '@angular/core';
import { mapComponent } from './map/map';
import { MapDetailComponent } from './map-detail/map-detail';

@NgModule({
	declarations: [mapComponent,
    MapDetailComponent],
	imports: [],
	exports: [mapComponent,
    MapDetailComponent]
})
export class ComponentsModule {}
