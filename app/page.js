"use client";
import image from "next/image";
import {useState, useEffect, useRef} from "react";
export default function Home() {
    let totalGridSize = 20;

    let snakeInittialPos = [
        {
            x: totalGridSize / 2,
            y: totalGridSize / 2,
        },
        {
            x: totalGridSize / 2,
            y: totalGridSize / 2 + 1,
        },
    ];

    // scoring
    const [score, setScore] = useState(0);
    const [food, setFood] = useState({
        x: 5,
        y: 5,
    });
    const [snake, setSnake] = useState(snakeInittialPos);
    const [direction, setDirection] = useState("LEFT");

    function renderBoard() {
        let cellarray = [];

        for (let row = 0; row < totalGridSize; row++){
            for (let col = 0; col < totalGridSize; row++){
                let classes = "cell";
                let isFood = food.x === col && food.y === row;
                let isSnakeHead = snake[0].x === col && snake[0].y === row;
                let isSnake = snake.some((ele) => ele.x === col && ele.y === row);

                if (isFood) {classes = `${classes} food`}
                if (isSnake) {classes = `${classes} snake`}
                if (isSnakeHead) {classes = `${classes} snake-head`}

                let cell = <div key = {`${row}-${col}`} className = {classes}></div>;

                cellarray.push(cell);
            }
        }
    
        return cellarray;
    }

    function renderFood() {
        let randomX = math.floor(math.random()* totalGridSize);
        let randomY = math.floor(math.random()* totalGridSize);

        setfood({
            x: randomX,
            y: randomY,
        });
    }

    function gameOver() {
        // check if game over
        if (
            snake[0].x < 0 ||
            snake[0].x >= totalGridSize ||
            snake[0].y < 0 ||
            snake[0].y >= totalGridSize
        ) {
            gameOver();
            return;
        }


        // check if snake eats itself
        const isBit = snake
            .slice(1)
            .some((ele) => ele.x === snake[0].x && ele.y === snake[0].y);
        if (isBit) {
            gameOver();
            return;
        }
    }
}
