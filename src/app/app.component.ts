import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'MyRoomTemperature';

  faMoon = faMoon;

  isDarkMode: boolean = true;

  constructor(public dialog: MatDialog, private overlay: OverlayContainer) {
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
  }

  isDarkTheme: boolean = localStorage.getItem("isDarkTheme") === "dark";

  toggleDarkMode() {
    if (this.isDarkTheme) {
      localStorage.setItem("isDarkTheme", "dark");
      this.isDarkMode = true;
      this.overlay.getContainerElement().classList.add("alternative");
    }
    if (!this.isDarkTheme) {
      localStorage.setItem("isDarkTheme", "light");
      this.isDarkMode = false;
      this.overlay.getContainerElement().classList.remove("alternative");
    }

  }

  ngOnInit(): void {
    this.toggleDarkMode();
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

  saveFilter() {
    this.dialogRef.afterClosed().subscribe(result => {
      localStorage.setItem("limit", result.limit);
      localStorage.setItem("granularity", result.granularity)
      typeof result.from == "object" ? localStorage.setItem("from", result.from.getTime()) : null;
      typeof result.to == "object" ? localStorage.setItem("to", result.to.getTime()) : null;

      window.location.reload();
    });
  }
}

export interface DialogData {
  limit: any;
  granularity: any;
  from: any;
  to: any;
}
