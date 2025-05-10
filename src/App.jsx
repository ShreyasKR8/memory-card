import { useEffect, useState } from 'react'
import './App.css'
import Card from './Components/Card';

const API_KEY = "live_vvhXMoYxpfXhhByLBBLUGzUHem3o0IMomJSrhuRJjYHIoMmlwocuMLiffgP8cn9Q";

function App() {
    const [gameStats, setGameStats] = useState({
        score: 0,
        highScore: 0
    });
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

        const apiURL = `https://api.thecatapi.com/v1/images/search?limit=12&has_breeds=1&mime_types=jpg,png`

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
        // console.log(imagesUrls[0])
        return imagesUrls;
    }

    function handleCardClicked(clickedImage) {
        if (clickedImages.has(clickedImage)) {
            gameOver();
            return;
        }

        updateScores();

        const updatedSet = new Set(clickedImages);
        updatedSet.add(clickedImage)
        setClickedImages(updatedSet);
        
        shuffleCardImages();
    }

    function updateScores() {
        setGameStats(prevState => {
            return {
                ...prevState,
                score: prevState.score + 1
            }
        })
    }

    function gameOver() {
        setGameStats(prevState => {
            if (prevState.score > prevState.highScore) {
                return {
                    score: 0,
                    highScore: prevState.score
                }
            }
            else {
                return {
                    ...prevState,
                    score: 0
                }
            }
        });
        setClickedImages(new Set());
    }

    function shuffleCardImages() {
        let tempArr = cardImages;
        let shuffledImages = [];
        while(tempArr.length !== 0) {
            const index = Math.floor(Math.random() * (tempArr.length - 1));
            shuffledImages.push(tempArr[index]);
            tempArr.splice(index, 1);
        }
        setCardImages(shuffledImages);
    }

    return (
        <>
            <header className='header-section'>
                <h1>Cats Memory Game</h1>
                <p>Get points by clicking on an image but don't click on any more than once!</p>
            </header>
            <section className="game-stats">
                <h3>Score: {gameStats.score}</h3>
                <h3>High Score: {gameStats.highScore}</h3>
            </section>
            <section className="cards-section">
                {cardImages.map((cardImage, index) => (
                    <Card CardImage={cardImage} key={index} onCardClick={() => handleCardClicked(cardImage)} />
                ))
                }
            </section>
        </>
    )
}

export default App
