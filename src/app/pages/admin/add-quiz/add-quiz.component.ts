import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css',
})
export class AddQuizComponent implements OnInit {
  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },

      (error) => {
        Swal.fire('Error !!', 'Error in loading data from server', 'error');
        console.log(error);
      },
    );
  }

  categories = [
    {
      cid: 23,
      title: 'Programming',
    },
    {
      cid: 24,
      title: 'Aptitude',
    },
  ];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
      // title: '',
    },
  };

  addQuiz() {
    // console.log(this.quizData);

    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open('Title Reqired', '', {
        duration: 3000,
      });

      return;
    }

    //validation

    //call server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data) => {
        Swal.fire('Success', 'Quiz is added', 'success');

        this._router.navigate(['/admin/quizzes']);
        //after submission data set all value to null/blank
        // this.quizData={
        //   title: '',
        //   description: '',
        //   maxMarks : '',
        //   numberOfQuestions: '',
        //   active : true,
        //   category :{
        //     cid: '',
        //     // title: '',
        //   },
        // };
      },

      (error) => {
        Swal.fire('Error!! ', 'Error occured while adding quiz', 'error');
        console.log(error);
      },
    );
  }
}
