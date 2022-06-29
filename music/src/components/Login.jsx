import React from 'react';
import styled from 'styled-components';
import Spotify_Logo_CMYK_Green from '../assets/Spotify_Logo_CMYK_Green.png';


const Login = () => {
    const handleClick = () => {
        const clientId = "5015ba26b73f46d68bccea42a176db8e";
        const redirectUrl = "http://localhost:3000/";
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = [
            'user-read-email',
            'user-read-private',
            'user-modify-playback-state',
            'user-read-playback-state',
            'user-read-currently-playing',
            'user-read-recently-played',
            'user-read-playback-position',
            'user-top-read'
        ];
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
            " "
        )}&response_type=token&show_daialog=true`;
    };

    return (
        <Container>
            <img src={Spotify_Logo_CMYK_Green} alt="spotify" />
            <button onClick={handleClick}>Connect Spotify</button>
        </Container>
    )
}

export default Login;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; // Phần tử vh bằng 1/100 chiều cao của khung nhìn
    width: 100vw; // Phần tử vw bằng 1/100 chiều rộng của khung nhìn
    gap: 5rem; // xác định kích thước khoảng cách của các dòng và cột
    img {
        height: 20vh;
    }
    button {
        padding: 1rem 5rem;
        border-radius: 5rem;
        border: none;
        background-color: black;
        color: #49f585;
        font-size: 1.4rem;
        cursor: pointer; //con trỏ
    }
    
`;