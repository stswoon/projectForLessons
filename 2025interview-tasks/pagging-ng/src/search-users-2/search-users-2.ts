import {Component, inject, Injectable, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of, Subject, Subscription, switchMap} from 'rxjs';

//todo: signal in ngInit

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
    // const $httpRequest = this.http.get(url);
    const $response = new BehaviorSubject<SearchUsersServiceResponse>({loading: true})
    // const $response = new Subject<SearchUsersServiceResponse>()
    return $response.pipe(
      switchMap((_) => this.http.get(url)),
      map((rawResponse: any) => convertToUsers(rawResponse)),
      map(data => ({loading: false, data})),
      catchError((err) => {
        console.error("Failed to load: ", err)
        return of({loading: false, error: err});
      })
    )
  }
}

@Component({
  selector: 'search-users-2',
  templateUrl: './search-users-2.html',
  imports: [
    FormsModule,
    // AsyncPipe
  ],
})
export class SearchUsers2 implements OnInit, OnDestroy {
  private searchUsersService = inject(SearchUsersService);
  private requestSubscription?: Subscription;

  query = '';
  loading: boolean = false;
  hasError: boolean = false;
  users?: User[];

  totalPages: number = 0;
  page: number = 1;

  ngOnInit(): void {
    this.doSearch();
  }

  debouncedFn = debounce(() => {
    this.page = 1;
    this.doSearch();
  });

  handleQueryChange() {
    console.log(`change query = |${this.query}|`);
    this.requestSubscription?.unsubscribe();
    this.debouncedFn();
  }

  private doSearch() {
    console.log(`Run search query = |${this.query}|, ${this.page}`);
    this.loading = true;
    this.hasError = false;
    this.requestSubscription = this.searchUsersService.getUsers(this.query, this.page).subscribe(({
      next: (res => {
        this.totalPages = res.data?.totalPages ?? 0;
        this.users = res.data?.users;
        this.loading = res.loading;
        this.hasError = !!res.error;
      }),
      error: (err => {
        alert("Unpredictable Error");
        console.error("Failed to load: ", err)
      })
    }));
  }

  ngOnDestroy(): void {
    this.requestSubscription?.unsubscribe()
  }

  previous() {
    this.page--;
    this.doSearch();
  }

  next() {
    this.page++;
    this.doSearch();
  }
}

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

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number = 500): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  };
}
