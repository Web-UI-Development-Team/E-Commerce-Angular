import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../order/pop-up/pop-up.component';
import { relative } from 'path';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(private dialog: MatDialog) { }
  openDialog(msg:string){
   return this.dialog.open(PopUpComponent, {
      width: '400px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data : {
        message : msg
      }
    })
  }
}
