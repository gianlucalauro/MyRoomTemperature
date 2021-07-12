import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyRoomTemperature';

  constructor(public dialog: MatDialog) {}

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
      localStorage.setItem("limit", result.limit);
      localStorage.setItem("granularity", result.granularity)
      localStorage.setItem("from", result.from.getTime());
      localStorage.setItem("to", result.to.getTime());
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
