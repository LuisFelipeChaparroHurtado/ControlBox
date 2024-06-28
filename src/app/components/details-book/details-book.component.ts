import { ReviewService } from './../../services/review.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {
  book: any;
  reviews: any[] = [];
  newReview: any = {
    comentario: '',
    calificacion: null,
    userId: 1, // Aquí deberías asignar el ID del usuario autenticado
    bookId: null
  };

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.bookService.getBookById(Number(bookId)).subscribe({
      next: (book) => {
        this.book = book;
        this.newReview.bookId = book.id;
        if (book.reviews && book.reviews.$values) {
          this.reviews = book.reviews.$values;
        } else {
          this.reviews = [];
        }
      },
      error: (err) => {
        console.error('Error fetching book details:', err);
      }
    });
  }

  submitReview(): void {
    this.reviewService.createReview(this.newReview).subscribe({
      next: (review) => {
        this.reviews.push(review);
        this.newReview.comentario = '';
        this.newReview.calificacion = null;
      },
      error: (err) => {
        console.error('Error submitting review:', err);
      }
    });
  }
}
