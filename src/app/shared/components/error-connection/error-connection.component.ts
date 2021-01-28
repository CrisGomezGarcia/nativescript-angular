import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Dialogs, Page } from '@nativescript/core';
import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-error-connection',
  templateUrl: './error-connection.component.html',
  styleUrls: ['./error-connection.component.scss']
})
export class ErrorConnectionComponent implements OnInit {
  errorText = '¡Ups! No tienes conexión a internet';
  infoText = 'Activa tus datos móviles o el WiFi y vuelve a intentarlo';

  @Output()
  verifyConn = new EventEmitter<Boolean>();

  constructor(
    private page: Page
  ) { }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

  onTap() {
    this.verifyConn.emit(environment.connectionActive);
  }

}
