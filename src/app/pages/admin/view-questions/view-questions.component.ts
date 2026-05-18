import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrl: './view-questions.component.css',
})
export class ViewQuestionsComponent implements OnInit {
  qId: any;
  qTitle: any;

  questions = [
    {
      quesId: '1',
      content: 'What is type of Java programming ?',
      image: 'java.jpg',
      option1: 'OOPs',
      option2: 'Procedural',
      option3: 'Scripting',
      option4: 'None of These',
      answer: 'OOPs',
      quiz: {
        qid: '2',
      },
    },
    {
      quesId: '2',
      content: 'Which Which type of Programming does Python support?',
      image: 'pyhton.jpg',
      option1: ' Object-oriented programming',
      option2: 'Structured programming',
      option3: 'Functional programming',
      option4: 'All of the mentioned',
      answer: 'All of the mentioned',
      quiz: {
        qid: '23',
      },
    },
  ];

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snack: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];

    console.log('Quiz Id: ', this.qId);
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
        console.log('Questions -', this.questions);
      },

      (error) => {
        console.log(error);
      },
    );
  }

  deleteQuestion(qid: any) {
    // alert(qid);

    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure, want to delete this question ?',
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(qid).subscribe(
          (data) => {
            this._snack.open('Question Deleted', '', {
              duration: 3000,
            });
            this.questions = this.questions.filter((q) => q.quesId != qid);
          },
          (error) => {
            this._snack.open('Error in deleting question', '', {
              duration: 3000,
            });
            console.log(error);
          },
        );
      }
    });
  }
}
