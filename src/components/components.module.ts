import { NgModule } from '@angular/core';
import { mapComponent } from './map/map';
import { MapDetailComponent } from './map-detail/map-detail';
import { ListViewComponent } from './list-view/list-view';

@NgModule({
	declarations: [mapComponent,
    MapDetailComponent,
    ListViewComponent],
	imports: [],
	exports: [mapComponent,
    MapDetailComponent,
    ListViewComponent]
})
export class ComponentsModule {}
