import { Injectable } from '@angular/core';
import { Apollo, gql, Query } from 'apollo-angular';
import { BehaviorSubject, take, tap } from 'rxjs';


const QUERY = gql`
  {
    characters {
      results {
        name
        status
        species
        gender
        image
      }
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  private characterSubject = new BehaviorSubject<any>(null);
  character$ = this.characterSubject.asObservable();

  constructor(private apollo: Apollo) {
    this.getCharacters();
  }

  getCharacters(): void {
    this.apollo
      .watchQuery<any>({
        query: QUERY,
      })
      .valueChanges.pipe(
        take(1),
        tap(({data}) => {
          const { characters } = data
          this.characterSubject.next(characters.results);
        })
      )
      .subscribe();
  }
}
