import { useEffect, useState } from 'react'
import './App.css'
import Card from './Components/Card';

const API_KEY = "live_lol_no";

function App() {

    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [cardImages, setCardImages] = useState([]);
    const [clickedImages, setClickedImages] = useState(new Set());

    useEffect(() => {
        async function fetchImages() {
            const fetchedCardImages = await fetchCardImages();
            setCardImages(fetchedCardImages);
        };

        fetchImages();
    }, [])

    async function fetchCardImages() {

        const apiURL = `https://api.thecatapi.com/v1/images/search?limit=12&mime_types=jpg,png`

        let imagesUrls = [];
        const response = await fetch(apiURL, {
            headers: {
                'x-api-key': API_KEY
            }
        });

        const data = await response.json();

        data.forEach(ele => {
            const url = ele.url;
            imagesUrls.push(url);
        });
        console.log(imagesUrls.length)
        return imagesUrls;
    }

    function handleCardClicked(clickedImage) {
        if(clickedImages.has(clickedImage)) {
            gameOver();
            return;
        }
        const updatedSet = new Set(clickedImages);
        updatedSet.add(clickedImage)
        setClickedImages(updatedSet);
        updateScores();
    }

    function updateScores() {
        setScore(prevScore => {
            const newScore = prevScore + 1;
            if (newScore > highScore) {
                setHighScore(newScore);
            }

            return newScore;
        })
    }

    function gameOver() {
        setScore(0);
        setClickedImages(new Set());
    }

    return (
        <>
            <p>Score: {score}</p>
            <p>High Score: {highScore}</p>
            <section className="cards-section">
                {cardImages.map((cardImage, index) => (
                    <Card CardImage={cardImage} key={index} onCardClick={() => handleCardClicked(cardImage)}/>
                ))
                }
            </section>
        </>
    )
}

export default App
