import {Component, inject, Injectable, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  combineLatest, concat,
  debounceTime,
  map,
  Observable,
  of,
  switchMap, tap
} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {AsyncPipe} from '@angular/common';

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

type SearchUsersServiceResponse = {
  loading: boolean;
  data?: {
    users: User[];
    totalPages: number
  }
  error?: any;
}

@Injectable({providedIn: 'root'})
class SearchUsersService {
  private http = inject(HttpClient);

  getUsers(query: string, page: number): Observable<SearchUsersServiceResponse> {
    const url = getUrl(query, page);
    const $httpRequest = this.http.get(url);

    return concat(
      of({loading: true}),
      $httpRequest.pipe(
        map((rawResponse: any) => convertToUsers(rawResponse)),
        map(data => ({loading: false, data})),
        catchError((err) => {
          console.error("Failed to load: ", err)
          return of({loading: false, error: err});
        })
      )
    )
  }
}

@Component({
  selector: 'search-users-3',
  templateUrl: './search-users-3.html',
  imports: [
    FormsModule,
    AsyncPipe
  ],
})
export class SearchUsers3 implements OnInit {
  private searchUsersService = inject(SearchUsersService);

  query = signal('');
  page = signal(1);
  private $debouncedQuery: Observable<string>;
  private $page: Observable<number>;

  protected $searchUsersServiceResponse?: Observable<SearchUsersServiceResponse>;

  constructor() {
    this.$page = toObservable(this.page).pipe(
      tap(value => {
        console.log("page=", value);
      })
    );
    this.$debouncedQuery = toObservable(this.query).pipe(
      tap(value => {
        console.log("query=", value);
      }),
      debounceTime(DEFAULT_DEBOUNCE_DELAY)
    );
  }

  ngOnInit(): void {
    this.$searchUsersServiceResponse = combineLatest([this.$debouncedQuery, this.$page]).pipe(
      switchMap(([query, page]) => {
        console.log(`Load data with query=${query}, page=${page}`)
        return this.searchUsersService.getUsers(query, page)
      }),
      tap(value => {
        console.log("response value=", value);
      })
    )
  }

  previous() {
    this.page.set(this.page() - 1);
  }

  next() {
    this.page.set(this.page() + 1);
  }

  handleQueryChange() {
    this.page.set(1);
  }
}

const DEFAULT_DEBOUNCE_DELAY = 500;

const LIMIT = 10;
const DELAY = 2000;
const getUrl = (query: string, page: number): string => {
  const skip = (page - 1) * LIMIT;
  return `https://dummyjson.com/users/search?q=${query}&limit=${LIMIT}&skip=${skip}&delay=${DELAY}`;
}

function convertToUsers(rawData: any): { users: User[], totalPages: number } {
  const users = (rawData.users as User[]).map(({id, firstName, lastName}) => ({id, firstName, lastName}));
  const totalPages = Math.ceil(rawData.total / LIMIT);
  return {users, totalPages}
}

