import { Injectable, Output } from '@angular/core';
import { Book } from '../_models/Book';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BookResponse } from '../_models/book-response';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(private httpClient: HttpClient) { }

  getBook(): Observable<Book> {
    return this.httpClient.get<BookResponse>('https://www.anapioficeandfire.com/api/books')
      .pipe(map(convertBookResponseToBook));
  }

  filterBooks(filter): Observable<Book[]>{
    return this.httpClient.get<Book[]>(`https://www.anapioficeandfire.com/api/books?sort=${filter}`);
  }
}

function convertBookResponseToBook(response: BookResponse): Book {
  return {
    text: response.name
  };
}