import React from 'react'
import styled from 'styled-components';
import Spotify_Logo_CMYK_Green from "../assets/Spotify_Logo_CMYK_Green.png";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlist from './Playlist';

const Sidebar = () => {
    return (
        <Container>
            <div className='top-links'>
                <div className='logo'>
                    <img src={Spotify_Logo_CMYK_Green} alt="spotify" />
                </div>
                <ul>
                    <li>
                        <MdHomeFilled />
                        <span>Home</span>
                    </li>
                    <li>
                        <MdSearch />
                        <span>Search</span>
                    </li>
                    <li>
                        <IoLibrary />
                        <span>Your Library</span>
                    </li>
                </ul>
            </div>
            <Playlist />
        </Container>
    )
}

export default Sidebar;

const Container = styled.div`
    background-color: black;
    color: #b3b3b3;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    .top-links {
        display: flex;
        flex-direction: column;
        .logo {
            text-align: center;
            margin: 1 rem 0;
            img {
                max-inline-size: 80%;
                block-size: auto;
            }
        }
        ul {
            list-style-type: none;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
            li {
                display: flex;
                gap: 1rem;
                cursor: pointer;
                transition: 0.3s ease-in-out;
                &:hover {
                    color: white;
                }
            }
        }
    }

`;