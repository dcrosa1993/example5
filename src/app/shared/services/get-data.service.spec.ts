import { TestBed } from '@angular/core/testing';
import { gql } from 'apollo-angular';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

import { GetDataService } from './get-data.service';

describe('GetDataService', () => {
  let service: GetDataService;
  let controller: ApolloTestingController;
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    service = TestBed.inject(GetDataService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('api response test', () => {
    service.getCharacters();
    const op = controller.expectOne(QUERY);
    
    service.character$.subscribe((res)=>{
      expect(res.data.characters.results.name).toEqual('Rick');
    });
    
    op.flush({
      data: {
        characters: {
          results: {
            name:'Rick',
            status:'dead',
            species: 'human',
            gender: 'male',
            image: 'https://some/url'
          },
        },
      },
    });
  });
});
