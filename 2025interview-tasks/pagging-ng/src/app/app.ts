import {Component} from '@angular/core';
import {SearchUsers} from '../search-users/search-users';
import {SearchUsers2} from '../search-users-2/search-users-2';
import {SearchUsers3} from '../search-users-3/search-users-3';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    // SearchUsers,
    // SearchUsers2,
    SearchUsers3,
    SearchUsers2,
    SearchUsers,
    // SearchUsers2
  ],
  styleUrl: './app.css'
})
export class App {
}
