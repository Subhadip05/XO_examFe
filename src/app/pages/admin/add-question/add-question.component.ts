import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css',
})
export class AddQuestionComponent implements OnInit {
  _fb = inject(FormBuilder);
  parentForm!: FormGroup;

  qId: any;
  qTitle: any;

  constructor(
    private _route: ActivatedRoute,
    private _ques: QuestionService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];

    this.initQuestionsForm();
    this.addQuestion();
  }

  initQuestionsForm() {
    this.parentForm = this._fb.group({
      questionDetailsVo: this._fb.array([]),
    });
  }

  get questionDetailsArray(): FormArray {
    return this.parentForm.get('questionDetailsVo') as FormArray;
  }

  questionDetails(): FormGroup {
    return this._fb.group({
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

  deleteQuestion(i?: any) {
    this.questionDetailsArray.removeAt(i);
  }

  addQuestion(): void {
    const newQuestion = this.questionDetails();
    newQuestion.patchValue({
      quiz: {
        qid: this.qId,
      },
    });

    this.questionDetailsArray.push(newQuestion);
    console.log('Add button clicked');
  }

  saveQuestion() {
    if (this.parentForm.invalid) {
      Swal.fire(
        'Error',
        'Please fill all required fields in all questions.',
        'error',
      );
      return;
    }

    const payload = this.questionDetailsArray.value;
    console.log('Saving question payload: ', payload);

    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Save',
      title: 'Are you sure, want to add questions ?',
    }).then((result) => {
      // return;
      this._ques.addQuestions(payload).subscribe({
        next: (data: any) => {
          console.log('Saving question response: ', data);
          Swal.fire('Success', 'Questions Added Successfully', 'success');
          this._router.navigate([
            '/admin/view-questions/' + this.qId + '/' + this.qTitle,
          ]);
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Error', 'Error in adding questions', 'error');
        },
      });
    });
  }

  saveUpdatedQuestion(updatedQuestionData: any) {
    this._ques.updateQuestion(updatedQuestionData).subscribe({
      next: (data: any) => {
        console.log('Updated question: ', data);
        Swal.fire('Success', 'Question Updated Successfully', 'success');
        this._router.navigate([
          '/admin/view-questions/' + this.qId + '/' + this.qTitle,
        ]);
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in updating question', 'error');
      },
    });
  }
}
