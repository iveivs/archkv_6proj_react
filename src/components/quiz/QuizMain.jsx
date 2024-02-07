import { useState } from "react";
import Game from "./Game";
import "./index.scss";
import Result from "./Result";

const questions = [
    {
        title: "React - это ... ?",
        variants: ["библиотека", "фреймворк", "приложение"],
        correct: 0,
    },
    {
        title: "Компонент - это ... ",
        variants: [
            "приложение",
            "часть приложения или страницы",
            "то, что я не знаю что такое",
        ],
        correct: 1,
    },
    {
        title: "Что такое JSX?",
        variants: [
            "Это простой HTML",
            "Это функция",
            "Это тот же HTML, но с возможностью выполнять JS-код",
        ],
        correct: 2,
    },
];
export default function QuizMain() {
    const [step, setStep] = useState(0);
    const [correct, setCorrect] = useState(0);
    const question = questions[step];

    const onClickVariant = (index) => {
        console.log(step, index);
        setStep(step + 1);

        if (index === question.correct) {
            setCorrect(correct + 1);
        }
    };
    return (
        <div className="quiz">
            {step !== questions.length ? (
                <Game
                    questions={questions}
                    step={step}
                    question={question}
                    onClickVariant={onClickVariant}
                />
            ) : (
                <Result correct={correct} questions={questions} />
            )}
        </div>
    );
}
