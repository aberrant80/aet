import { MatTableDataSource } from '@angular/material/table';

export interface MaterialGrindLocation {
  name: string;
  type: string;
  drops?: MaterialGrindDrop[] | MatTableDataSource<MaterialGrindDrop>;
}

export interface MaterialGrindDrop {
  name: string;
  source: string;
  quantity: number;
  purpose: string;
}
