import React from 'react';
import quizData from "./quizData"
import './reset.css';
import './App.css';
import $ from "jquery";
import swal from 'sweetalert';


class App extends React.Component {
  constructor(props){
    super(props)
    this.result_check = this.result_check.bind(this)
  }

result_check(){
  let ordered_list = document.querySelector(".ordered_list").childNodes
  var array = Array.from(ordered_list);
  const values = array.map(data => $(data).find('input:checked').val())

  const ifAllChecked = values.every(data => data !== undefined)
  if(!ifAllChecked){
    return swal({
      text: "Вы не ответили на все вопросы!",
      icon: "info",
      button: "Назад",
    });
  }else {const right_answers = values.reduce((acc,currValue,idx) => {
        if(currValue === quizData.questions[idx].choices[quizData.questions[idx].answer]){
             acc = [...acc,true]
        }
        return acc
        },[])
       const final_result = right_answers.length * 100/values.length
       if(final_result >= 50){
         return swal({
          title: "Хорошая работа!",
          text: `Вы прошли тест! Вы дали ${final_result.toFixed(0)}% правильных ответов!`,
          icon: "success",
          button: "ok!",
        });
       }else return swal("Провал!", `Ваш результат ${final_result.toFixed(0)}% правильных ответов!`, "warning");
  }
}


render(){
  return (
 <section>
  <h1>{quizData.title}</h1>
  <ol className="ordered_list">
 {quizData.questions.map((data,idx) =>(
       <li key={idx}className = "list_block">
          <h3 className="question">{idx + 1}. {data.question}</h3>
          <label htmlFor={data.question}>
            {data.choices.map( choice => (
                <div key = {choice} className="question_wrapper">
                    <span className = "choice">{choice}</span>
                    <input name={data.question} type="radio" value={choice} />
                </div>))
            }
          </label>
       </li>))}
  </ol>
  <button className="check_results" onClick = {this.result_check}>ПРОВЕРИТЬ</button>
 </section>
  );
}
}

export default App;
