import React from 'react'
import quiz from "../assets/quiz.png";
import note from "../assets/note.png";
const Quizz = () => {
  return (
    <div className="fixed right-12 top-[300px]">
    <img
        className="w-16 h-16 m-8 cursor-pointer hover:shadow-2xl hover:translate-x-2"
        src={quiz}
    />
    <img
        className="w-16 h-16 m-8 cursor-pointer hover:shadow-lg hover:translate-x-2"
        src={note}
    />
</div>
  )
}

export default Quizz