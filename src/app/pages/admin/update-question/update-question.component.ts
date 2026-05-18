import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css',
})
export class UpdateQuestionComponent {
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _fb = inject(FormBuilder);
  _ques = inject(QuestionService);

  quesId: any;
  quesDetails!: any;
  questionForm!: any;

  ngOnInit() {
    this.quesId = this._route.snapshot.params['quesId'];
    console.log('Update question id: ', this.quesId);

    this.initQuestionsForm();
    this.findQuestionDetails(this.quesId);
  }

  findQuestionDetails(id: any) {
    this._ques.getQuestionById(id).subscribe({
      next: (data: any) => {
        this.quesDetails = data;
        // console.log('Question details: ', this.quesDetails);
        this.pathFormData(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  initQuestionsForm() {
    this.questionForm = this._fb.group({
      quesId: [null],
      content: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      answer: ['', Validators.required],
      quiz: this._fb.group({
        qid: [null, Validators.required],
      }),
    });
  }

  pathFormData(questionDtl: any) {
    this.questionForm.patchValue({
      quesId: questionDtl?.quesId,
      content: questionDtl?.content,
      option1: questionDtl?.option1,
      option2: questionDtl?.option2,
      option3: questionDtl?.option3,
      option4: questionDtl?.option4,
      answer: questionDtl?.answer,
      quiz: {
        qid: questionDtl?.quiz?.qid,
      },
    });
  }

  updateQuestion() {
    const payload = this.questionForm.value;
    console.log('Update question payload ', payload);

    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Update',
      title: 'Are you sure, want to update this question ?',
    }).then(() => {
      // return;
      this._ques.updateQuestion(payload).subscribe({
        next: (data: any) => {
          console.log('Update question response: ', data);
          Swal.fire('Success', 'Questions updated successfully', 'success');
          this._router.navigate([
            '/admin/view-questions/' +
              this.quesDetails?.quiz?.qid +
              '/' +
              this.quesDetails?.quiz?.title,
          ]);
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Error', 'Error in updating questions', 'error');
        },
      });
    });
  }
}
