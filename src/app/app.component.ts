import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyRoomTemperature';

  faMoon = faMoon;

  constructor(public dialog: MatDialog) {
    if (localStorage.getItem("limit") == null || localStorage.getItem("limit") == 'undefined')
      localStorage.setItem("limit", "25");
    if (localStorage.getItem("granularity") == null || localStorage.getItem("granularity") == 'undefined')
      localStorage.setItem("granularity", "1h");
    if (localStorage.getItem("from") == null || localStorage.getItem("from") == 'undefined')
      localStorage.setItem("from", String(Date.now() - 86400000)); //one hour in milliseconds
    if (localStorage.getItem("to") == null || localStorage.getItem("to") == 'undefined')
      localStorage.setItem("to", String(Date.now()));
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContent);
    dialogRef.afterClosed().subscribe();
  }

  openDialogFilter() {
    const dialogRef = this.dialog.open(DialogFilterContent, {
      data: {
        limit: localStorage.getItem("limit"),
        granularity: localStorage.getItem("granularity"),
        from: localStorage.getItem("from"),
        to: localStorage.getItem("to")
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      try {
        localStorage.setItem("limit", result.limit);
        localStorage.setItem("granularity", result.granularity)
        localStorage.setItem("from", result.from.getTime());
        localStorage.setItem("to", result.to.getTime());
      } catch (e) {
        window.location.reload();
      }

      window.location.reload();
    });
  }

}

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})
export class DialogContent {}

@Component({
  selector: 'dialog-filter-content',
  templateUrl: 'dialog-filter-content.html',
})
export class DialogFilterContent {
  constructor(
    public dialogRef: MatDialogRef<DialogFilterContent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  limit: any;
  granularity: any;
  from: any;
  to: any;
}
