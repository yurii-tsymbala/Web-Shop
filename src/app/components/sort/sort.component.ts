import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Sort } from '../../models/Sort';

@Component({
  selector: 'sort',
  standalone: true,
  imports: [],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss'
})
export class SortComponent {
  @Input() sort!: Sort;
  @Output() updateProducts = new EventEmitter<Sort>();

  @HostListener("click")
  private onSortClick(): void {  
      this.updateProducts.emit(this.sort);
  }

}
