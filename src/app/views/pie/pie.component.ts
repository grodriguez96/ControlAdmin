import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pie } from '../../interfaces/pie/pie'
import { BdConnectionPieService } from '../../services/pie/bd-connection-pie.service'
import { ProvidersService } from './services/providers.service'


@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})

export class PieComponent {

  displayedColumns: string[] = ['select', 'variety', 'price', 'edit', 'delete'];
  isLoadingResults = true;
  isRateLimitReached = false;
  isDataEmpty = false;
  data: Pie[];
  selection = new SelectionModel<Pie>(true, []);

  constructor(private connect: BdConnectionPieService, private provider: ProvidersService, private router: Router) {
    this.initData();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Pie): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /**Inicializate data */
  initData() {
    this.connect.getAllPie().subscribe(data => {
      this.updateLocalData(data)
      this.isDataEmpty = this.verifyDataEmpty();
    }, () => {
      this.connectionFailed()
    })
  }

  /** Edit only one row */
  editOnePie(row?: Pie): void {
    if (this.selection.selected.length == 0) { //** Pressed the edit button without check mark */
      this.selection.toggle(row);
      this.sendPies();
    } else if (this.selection.selected.length == 1 && this.selection.selected[0].id == row.id) { //** Pressed the edit button only in the same row that check mark is and denies multiple check marks*/
      this.sendPies();
    }
  }

  /** Send data to services and navigate to edit page */
  sendPies(): void {
    this.provider.editData = this.selection.selected;
    this.provider.editStatus = true;
    this.router.navigate(['pie/edit'])

  }

  /** Eliminate only one row */
  eliminateOnePie(row?: Pie): void {
    if (this.selection.selected.length == 0 || (this.selection.selected.length == 1 && this.selection.selected[0].id == row.id)) { //** Pressed the eliminate button without check mark, or the eliminate button only in the same row that check mark is and denies multiple check marks */
      this.isLoadingResults = true;
      this.connect.deletePie(row.id).subscribe(data => {
        this.updateLocalData(data);
        this.isDataEmpty = this.verifyDataEmpty();
      }, () => {
        this.connectionFailed();
      })
    }
  }

  /** Eliminate multiple rows */
  eliminatePies() {
    const ids: Array<number> = []
    for (const pie of this.selection.selected) {
      ids.push(pie.id);
    }
    this.connect.deletePies(ids);
  }

  /** Upadate local data whit HTTP data */
  updateLocalData(data: Pie[]): void {
    this.data = data;
    this.isLoadingResults = false;
  }

  /** Show not connection whith the server */
  connectionFailed(): void {
    this.isLoadingResults = false;
    this.isRateLimitReached = true;
  }

  /** Verify data is not empty */
  verifyDataEmpty(): boolean {
    if (this.data.length > 0) return false
    else return true
  }

  /** Add new Pies */
  addPies() {
    this.provider.addStatus = true;
    this.router.navigate(["pie/add"])
  }
}
