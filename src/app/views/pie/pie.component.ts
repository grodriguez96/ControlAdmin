import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pie } from '../../interfaces/pie/pie'
import { BdConnectionPieService } from '../../services/pie/bd-connection-pie.service'
import { ProvidersService } from './services/providers.service'
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component'
import { StatusServerDialog } from '../shared/status-server-dialog/status-server-dialog.component';


@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})

export class PieComponent {

  displayedColumns: string[] = ['select', 'variety', 'price', 'edit', 'delete'];
  isLoadingResults = true;
  isDeletingResults = false;
  isRateLimitReached = false;
  isDataEmpty = false;
  data: Pie[];
  selection = new SelectionModel<Pie>(true, []);

  constructor(private connect: BdConnectionPieService, private provider: ProvidersService, private router: Router, public dialog: MatDialog) {
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
  initData(): void {
    this.connect.getAllPie().subscribe(data => {
      this.updateLocalData(data)
    }, () => {
      this.connectionFailed()
    })
  }

  /** Edit only one row */
  editOnePie(row: Pie): void {
    if (this.selection.selected.length == 0) { //** Pressed the edit button without check mark */
      const resultD = this.openDialogConfirm('editO')

      resultD.afterClosed().subscribe(confirm => {
        if (confirm) {
          this.selection.toggle(row);
          this.sendPies();
        }

      })
    } else if (this.selection.selected.length == 1 && this.selection.selected[0].id == row.id) { //** Pressed the edit button only in the same row that check mark is and denies multiple check marks*/
      const resultD = this.openDialogConfirm('editO')

      resultD.afterClosed().subscribe(confirm => {
        if (confirm) this.sendPies();
      })
    }
  }

  /** Edit multiples row */
  editMultiplePies() {
    const resultD = this.openDialogConfirm('editM')
    resultD.afterClosed().subscribe(confirm => {
      if (confirm) this.sendPies();
    })
  }

  /** Send data to services and navigate to edit page */
  sendPies(): void {
    this.provider.editData = this.selection.selected;
    this.router.navigate(['pie/edit'])

  }

  /** Eliminate only one row */
  eliminateOnePie(row: Pie): void {
    if (this.selection.selected.length == 0 || (this.selection.selected.length == 1 && this.selection.selected[0].id == row.id)) { //** Pressed the eliminate button without check mark, or the eliminate button only in the same row that check mark is and denies multiple check marks */
      this.openDialogConfirm('eliminateO').afterClosed().subscribe(confirm => {
        if (confirm) {
          this.isDeletingResults = true;
          this.connect.deletePie(row.id).subscribe(message => {
            const mess = JSON.stringify(message.message)
            this.openDialogStatus(mess.replace(/\"/g, ""))
            this.initData();
            this.selection.clear();
          }, () => {
            this.connectionFailed();
          })
        }

      })
    }
  }

  /** Eliminate multiple rows */
  eliminatePies() {
    this.openDialogConfirm('eliminateM').afterClosed().subscribe(confirm => {
      if (confirm) {
        this.isDeletingResults = true;
        this.connect.deletePies(this.selection.selected).subscribe(message => {
          const mess = JSON.stringify(message.message)
          this.openDialogStatus(mess.replace(/\"/g, ""))
          this.initData();
          this.selection.clear();
        }, () => {
          this.connectionFailed();
        })
      }
    })
  }

  /** Upadate local data whit HTTP data */
  updateLocalData(data: Pie[]): void {
    this.data = data;
    this.isDeletingResults = false;
    this.isLoadingResults = false;
    this.isDataEmpty = this.verifyDataEmpty();
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
    this.router.navigate(["pie/add"])
  }

  /** Open dialog to confirm action */
  openDialogConfirm(option: string) {
    const resultD = this.dialog.open(DialogComponent, {
      data: {
        option: option,
        pie: this.selection.selected,
      },
    });
    return resultD;
  }

  /** */
  openDialogStatus(message: string) {
    this.dialog.open(StatusServerDialog, {
      data: {
        message: message,
      },
    });
  }
}
