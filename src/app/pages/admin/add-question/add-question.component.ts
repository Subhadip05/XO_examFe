import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css',
})
export class AddQuestionComponent implements OnInit {
  qId: any;
  qTitle: any;
  question = {
    quiz: {
      qid: '',
      title: '',
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private _route: ActivatedRoute,
    private _ques: QuestionService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    // console.log(this.qId);
    this.question.quiz['qid'] = this.qId;
  }

  formSubmit() {
    // alert("testing");

    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }
    if (this.question.option3.trim() == '' || this.question.option3 == null) {
      return;
    }
    if (this.question.option4.trim() == '' || this.question.option4 == null) {
      return;
    }

    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }

    //form submit
    this._ques.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Question Added', 'success');
        this._router.navigate([
          '/admin/view-questions/' + this.qId + '/' + this.qTitle,
        ]);

        // this.question = {
        //   quiz :{
        //     qid: '',
        //     title : '',
        //   },
        //   content : '',
        //   option1 : '',
        //   option2 : '',
        //   option3 : '',
        //   option4 : '',
        //   answer : '',
        // }
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in adding question', 'error');
      },
    );
  }
}
