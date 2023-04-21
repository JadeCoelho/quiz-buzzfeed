import { Component } from '@angular/core';
import quizQuestions from '../../../assets/data/quiz-questions.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  title!: string;
  questions!: any;
  currentQuestion!: any;
  answers: string[] = [];
  answer!: string;

  questionIndex: number = 0;
  maxQuestions!: number;
  complete: boolean = false;

  ngOnInit(): void {
    if (quizQuestions) {
      this.complete = false;
      this.title = quizQuestions.title;
      this.questions = quizQuestions.questions;
      this.currentQuestion = this.questions[this.questionIndex];
      this.maxQuestions = this.questions.length;
    }
  }
  clickedBtn(l: string) {
    this.answers.push(l);
    this.next();
  }
  async next() {
    this.questionIndex += 1;

    if (this.maxQuestions > this.questionIndex) {
      this.currentQuestion = this.questions[this.questionIndex];
    } else {
      const res: string = await this.checkResult(this.answers);
      this.complete = true;
      this.answer =
        quizQuestions.results[res as keyof typeof quizQuestions.results];
    }
  }
  async checkResult(answers: string[]) {
    const result = answers.reduce((prev, curr, i, arr) => {
      if (
        arr.filter((item) => item === prev).length >
        arr.filter((item) => item === curr).length
      ) {
        return prev;
      } else {
        return curr;
      }
    });
    return result;
  }
}
