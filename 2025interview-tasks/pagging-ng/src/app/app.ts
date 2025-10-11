import {Component} from '@angular/core';
import {SearchUsers} from '../search-users/search-users';
import {SearchUsers2} from '../serach-users-2/search-users-2';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    // SearchUsers,
    SearchUsers2
  ],
  styleUrl: './app.css'
})
export class App {
}
