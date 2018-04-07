import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {MessageService} from './message.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PersonService {

  private personListUrl = 'http://localhost:5000/person/list';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<PersonList>(this.personListUrl)
      .pipe(
        map( res => res.people ),
        catchError(this.handleError('getPeople', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('PersonService: ' + message);
  }
}

interface PersonList {
  people: Person[];
}

export interface Person {
  id: number;
  name: string;
}
