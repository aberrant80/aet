import { Component, ViewChild, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialGrindDrop, MaterialGrindLocation } from './material-grind.model';

@Component({
  selector: 'material-grind',
  styleUrls: ['material-grind.component.scss'],
  templateUrl: 'material-grind.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class MaterialGrindComponent implements AfterViewInit {
  displayedColumns = ['expand', 'name', 'type'];
  innerDisplayedColumns = ['remove', 'name', 'source', 'increment', 'quantity', 'decrement', 'purpose'];

  dataSource: MatTableDataSource<MaterialGrindLocation>;
  locations: MaterialGrindLocation[] = [];
  expandedLocation: MaterialGrindLocation | null;
  filterValue: string = '';

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<MaterialGrindDrop>>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchDataSource().forEach(location => {
      if (location.drops && Array.isArray(location.drops) && location.drops.length) {
        this.locations = [...this.locations, {...location, drops: new MatTableDataSource(location.drops)}];
      } else {
        this.locations = [...this.locations, location];
      }
    });

    this.dataSource = new MatTableDataSource(this.locations);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  toggleRow(element: MaterialGrindLocation) {
    if (element.drops && (element.drops as MatTableDataSource<MaterialGrindDrop>).data.length) {
      this.expandedLocation = this.expandedLocation === element ? null : element
    }

    this.cdr.detectChanges();
    this.innerTables.forEach(
      (table, index) => {
        (table.dataSource as MatTableDataSource<MaterialGrindDrop>).sort = this.innerSort.toArray()[index];
        (table.dataSource as MatTableDataSource<MaterialGrindDrop>).filter = '';
        this.filterValue = '';
      }
    );
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<MaterialGrindDrop>).filter = filterValue.trim().toLowerCase())
    );
  }

  private fetchDataSource(): MaterialGrindLocation[] {
    return [
      {
        name: 'The Riftbreaker',
        type: 'VH',
        drops: [
          {
            name: 'Repair Tool+',
            source: 'Synth Human Medic',
            quantity: 6,
            purpose: 'Lustrous Steel III'
          },
          {
            name: 'Twin Tail Parts',
            source: 'Synth Human Medic',
            quantity: 1,
            purpose: 'Skull III'
          },
          {
            name: 'Repair Liquid+',
            source: 'Synth Human Medic',
            quantity: 6,
            purpose: 'Skull Gloves III'
          },
          {
            name: 'Infrared Sensor',
            source: 'Synth Soldier',
            quantity: 4,
            purpose: 'Rock Slash III (spear)'
          },
          {
            name: 'Artificial Heart II',
            source: 'Synth Soldier',
            quantity: 11,
            purpose: 'Ruby Ring III'
          },
          {
            name: 'Rare Metal Skin',
            source: 'Synth Soldier',
            quantity: 6,
            purpose: 'Burn Necklace III'
          }
        ]
      },
      {
        name: 'Spacetime Rift',
        type: 'Fishing',
        drops: [
          {
            name: 'Hard Sharp Cube',
            source: 'Devil Moray',
            quantity: 20,
            purpose: 'Rill Ax'
          }
        ]
      },
      {
        name: 'No Children',
        type: 'Temp',
      },
    ];
  }
}
