import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  selectedBook: any = null;
  filterText: string = '';
  reviewForm!: FormGroup;
  loggedInUserId: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.initializeForm();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe(
      (data: any) => {
        if (data && data.$values) {
          this.books = data.$values;
          this.applyFilter();
        } else {
          console.error('Unexpected data format:', data);
        }
      },
      (error) => {
        console.error('Error fetching books: ', error);
      }
    );
  }

  applyFilter() {
    const filterValue = this.filterText.toLowerCase().trim();
    if (!filterValue) {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(book =>
        book.titulo.toLowerCase().includes(filterValue) ||
        book.autor.toLowerCase().includes(filterValue) ||
        book.categoria.toLowerCase().includes(filterValue)
      );
    }
  }

  showBookDetails(book: any) {
    this.selectedBook = book;
    this.reviewForm.patchValue({
      bookId: book.id
    });
  }

  initializeForm() {
    this.reviewForm = this.formBuilder.group({
      calificacion: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comentario: ['', Validators.required],
      userId: [this.loggedInUserId, Validators.required],
      bookId: ['', Validators.required]
    });
  }

  submitReview() {
    if (this.selectedBook && this.reviewForm.valid) {
      const reviewData = this.reviewForm.value;
      reviewData.bookId = this.selectedBook.id;

      this.reviewService.createReview(reviewData).subscribe(
        (res) => {
          console.log('Reseña enviada exitosamente:', res);
          this.resetReviewForm();
        },
        (error) => {
          console.error('Error al enviar la reseña:', error);
        }
      );
    }
  }

  resetReviewForm() {
    this.reviewForm.reset({
      calificacion: '',
      comentario: '',
      userId: this.loggedInUserId,
      bookId: ''
    });
  }
}
