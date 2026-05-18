import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})

export class ViewQuizzesComponent implements OnInit{


  constructor(private _quiz : QuizService){}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes = data;
        console.log(this.quizzes);
      },

      (error)=>{
        Swal.fire("Error !","Error in loading data !","error");
        console.log(error);
      }
    );
  }

  quizzes = [
    {
      qid : 23,
      title : 'Basic Of Java',
      description : 'This is about Core Java and OOPs concept',
      maxMarks : "100",
      numberOfQuestions : "20",
      active : "",
      category : {
        title : "Programming"
      }
    },
  ];



  //delete button
  deleteQuiz(qId: any) {
    
     //alert(qId);

    Swal.fire({
      icon : 'warning',
      title : "Are you sure ?",
      confirmButtonText : "Delete",
      showCancelButton : true,
    }).then((result)=>{

       //After clicking delete button 
      if(result.isConfirmed){
       
        this._quiz.deleteQuiz(qId).subscribe(
          (data)=>{
            this.quizzes = this.quizzes.filter((quiz)=> quiz.qid != qId);
            Swal.fire("Successfully Deleted",'Quiz Delete','success');
          },
          (error)=>{
            Swal.fire("Error",'Error',"error");
            console.log(error);
          },
        );

      }
    });
    
  }
}
