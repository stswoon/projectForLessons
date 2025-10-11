import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {map, Subscription} from 'rxjs';

//todo: paging, debounce, service, abort

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    FormsModule,
    // AsyncPipe
  ],
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private requestSubscription?: Subscription;

  query = '';
  loading: boolean = false;
  hasError: boolean = false;
  //$users?: Observable<User[]>;
  users?: User[];

  totalPages: number = 0;
  page: number = 1;

  ngOnInit(): void {
    this.doSearch();
  }

  debouncedFn = debounce(() => {
    this.doSearch();
  });

  handleQueryChange() {
    console.log(`change query = |${this.query}|`);
    this.requestSubscription?.unsubscribe();
    this.debouncedFn();
  }

  private doSearch() {
    console.log(`Run search query = |${this.query}|`);
    this.loading = true;
    this.hasError = false;
    const url = getUrl(this.query, this.page);
    const $httpRequest = this.http.get(url);
    this.requestSubscription = $httpRequest.pipe(
      map((rawResponse: any) => {
        return convertToUsers(rawResponse);
      }),
      // catchError((err) => {
      //   console.error("Failed to load: ", err)
      //   this.hasError = !!err;
      //   return of([]);
      // }),
      // finalize(() => {
      //   this.loading = false;
      // })
    ).subscribe(({
      next: (res => {
        this.totalPages = res.totalPages;
        this.users = res.users;
        this.loading = false;
      }),
      error: (err => {
        console.error("Failed to load: ", err)
        this.hasError = !!err;
        this.loading = false;
        this.users = [];
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
