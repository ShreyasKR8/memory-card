import { useEffect, useState } from 'react'
import './App.css'
import Card from './Components/Card';
import SaturnImg from './assets/saturn.jpg';
import viteLogo from './assets/vite.svg';

function App() {

    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [cardImages, setCardImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            const fetchedCardImages = await fetchCardImages();
            setCardImages(fetchedCardImages);
        };

        fetchImages();
    }, [])

    async function fetchCardImages() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([SaturnImg, viteLogo]);
            }, 2000);
        });
    }

    function win() {
        setScore(prevScore => {
            const newScore = prevScore + 1;
            if (newScore > highScore) {
                setHighScore(newScore);
            }

            return newScore;
        })
    }

    function lose() {
        setScore(0);
    }

    return (
        <>
            <p>Score: {score}</p>
            <p>High Score: {highScore}</p>
            <button onClick={() => win()}>Win</button>
            <button onClick={() => lose()}>Lose</button>
            <section className="cards-section">
                {cardImages.map((cardImage, index) => (
                    <Card CardImage={cardImage} key={index}/>
                ))
                }
            </section>
        </>
    )
}

export default App
