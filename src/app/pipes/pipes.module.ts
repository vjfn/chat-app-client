import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DomSanitizerPipe
  ],
  exports:[DomSanitizerPipe]
})
export class PipesModule { }
