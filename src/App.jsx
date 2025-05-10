import { useEffect, useState } from 'react'
import './App.css'
import Card from './Components/Card';

const API_KEY = "live_lol_no";

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
        // console.log(imagesUrls)
        return imagesUrls;
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
                    <Card CardImage={cardImage} key={index} />
                ))
                }
            </section>
        </>
    )
}

export default App
