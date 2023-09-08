/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";

const ToolbarWrapper = styled.div`
    margin: 20px;
    display: flex;
    gap: 0.5rem;
`;

const Input = styled.input`
    border: 1px solid rgb(71 85 105);
    border-radius: 4px;
`;

const Button = styled.button`
    color: white;
    width: 80px;
    border-radius: 4px;
    background-color: rgb(71 85 105);
`;

export default function Toolbar({
    flipBookRef,
    flippingTime,
    nextButtonClick,
    prevButtonClick,
}) {
    const [inputNumber, setInputNumber] = useState("");

    const flipToPage = () => {
        // 自动翻页，翻过单张执行的速度 = 翻页动画速度
        // NOTE: 通过 getCurrentPageIndex 只会获取到偶数位的 pageNumber，即 1246
        const pageNumber =
            flipBookRef.current.pageFlip().getCurrentPageIndex() + 1;
        let timerId;

        const { count, swipeRight } = getFlipCount({
            type: "haveCover",
            currentNum: pageNumber,
            targetNum: inputNumber,
        });

        autoSwipe({
            count,
            direction: swipeRight,
            time: flippingTime,
            actions: { right: nextButtonClick, left: prevButtonClick },
        });

        /**
         * @description 返回一个对象，包含翻页的次数，翻页的方向
         */
        function getFlipCount({ type, currentNum, targetNum }) {
            // NOTE 处理往回翻页，即目标页数小于当前页数的情况
            let swipeRight;
            if (targetNum < currentNum) {
                swipeRight = false;
            } else {
                swipeRight = true;
            }

            // 有封面的情况下，前往目标页面需要翻动的次数
            if (type == "haveCover") {
                const isOdd = inputNumber % 2;
                if (isOdd) {
                    return {
                        count: Math.abs(targetNum - 1 - currentNum) / 2,
                        swipeRight,
                    };
                } else {
                    return {
                        count:
                            targetNum == 2 && currentNum == 1
                                ? 1
                                : Math.abs(targetNum - currentNum) / 2,
                        swipeRight,
                    };
                }
            }
        }

        /**
         * @description 根据方向(direction)，自动执行翻页(action)若干次(count), 每次间隔 time ms
         */
        function autoSwipe({ count, direction, time, actions }) {
            let action;
            const { right, left } = actions;
            if (direction) {
                action = right;
            } else {
                action = left;
            }

            let n = count;
            timerId = setInterval(() => {
                n <= 0 ? clearInterval(timerId) : action();
                n = n - 1;
            }, time);
        }
    };
    return (
        <ToolbarWrapper>
            <Input
                type="text"
                value={inputNumber}
                onChange={(e) => {
                    setInputNumber(Number(e.target.value));
                }}></Input>
            <Button onClick={flipToPage}>跳转</Button>
            <Button onClick={prevButtonClick}>上一页</Button>
            <Button onClick={nextButtonClick}>下一页</Button>
        </ToolbarWrapper>
    );
}
