import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../order/pop-up/pop-up.component';
@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(private dialog : MatDialog) { }
  openDialog(){
    this.dialog.open(PopUpComponent , {
      width: "300",
      disableClose: true
    })
  }
}
