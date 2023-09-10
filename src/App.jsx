import { useState } from "react";
import { useRef } from "react";
import Toolbar from "./components/Toolbar";
import styled from "styled-components";
// import { ExampleBookOne } from "./views/ExampleOne";
import { ExampleBookTwo } from "./books/ExampleTwo";

const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
`;

function App() {
    const [flippingTime] = useState(1200);
    const flipBookRef = useRef(null);
    const nextButtonClick = () => {
        flipBookRef.current.pageFlip().flipNext();
    };

    const prevButtonClick = () => {
        flipBookRef.current.pageFlip().flipPrev();
    };

    return (
        <AppWrapper>
            {flipBookRef ? (
                <Toolbar
                    flipBookRef={flipBookRef}
                    flippingTime={flippingTime}
                    nextButtonClick={nextButtonClick}
                    prevButtonClick={prevButtonClick}></Toolbar>
            ) : (
                <></>
            )}

            {/* <ExampleBookOne ref={flipBookRef}></ExampleBookOne> */}
            <ExampleBookTwo
                ref={flipBookRef}
                flippingTime={flippingTime}></ExampleBookTwo>
        </AppWrapper>
    );
}

export default App;
