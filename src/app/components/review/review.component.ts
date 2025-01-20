import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { USER_DATA_STRING } from '../../constants/db.index';
import { ReviewService } from './review.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  providers: [ReviewService],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {

  constructor(private reviewService: ReviewService){}

  displayDatas: {[key: string] : string} | null = {}; 

  ngOnInit(){
    this.displayDatas = this.reviewService.getDisplayDatas()
  }

}