import "./index.scss";
export default function Result({ correct, questions }) {
    return (
        <div className="result">
            <img
                src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
                alt="result pic"
            />
            <h2>
                Вы отгадали {correct} ответа из {questions.length}
            </h2>
            <a href="/">
                <button>Попробовать снова</button>
            </a>
        </div>
    );
}
