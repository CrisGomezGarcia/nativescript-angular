import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'Grocieres App';

  constructor() { }

  ngOnInit() {
  }

  Saludo() {
    alert('Hola mundo');
  }
}
