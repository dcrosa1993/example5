import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/shared/services/get-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private getData: GetDataService) {}
  character$ = this.getData.character$;
}
