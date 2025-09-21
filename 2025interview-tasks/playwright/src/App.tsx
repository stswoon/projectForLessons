import {useState} from "react";

function App() {
    const [counter, setCounter] = useState<number>(0)
    return (
        <>
            <h1>App</h1>
            <div className="counterView">Counter: {counter}</div>
            <button onClick={() => setCounter(counter => counter + 1)}>Increase counter</button>
        </>
    )
}

export default App;
