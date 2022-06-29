import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

const Body = ({ headerBackground }) => {
    const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] = useStateProvider();
    useEffect(() => {
        const getInitialPlaylist = async () => {
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                });
            const selectedPlaylist = {
                id: response.data.id,
                name: response.data.name,
                description: response.data.description,
                image: response.data.images[0].url,
                tracks: response.data.tracks.items.map(({ track }) => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map((artist) => artist.name),
                    image: track.album.images[2].url,
                    duration: track.duration_ms,
                    album: track.album.name,
                    context_uri: track.album.uri,
                    track_number: track.track_number,
                })),
            };
            //console.log(response.data);
            //console.log(selectedPlaylist);
            dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist })
        }
        getInitialPlaylist();
    }, [token, dispatch, selectedPlaylistId]);

    // chuyển từ mili giây thành phút & giây
    const msToMinuteandSeconds = (ms) => {
        const minutes = Math.floor(ms / 60000);
        // 1 minute = 60000 ms
        const seconds = Math.floor((ms % 60000) / 1000).toFixed(0);
        // 1 s = 1000 ms, toFixed() sẽ chuyển đổi một số thành kiểu chuỗi,
        // giữ lại số chữ số thập phân do người dùng xác định.
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };
    return (
        <Container headerBackground={headerBackground}>
            {selectedPlaylist && (
                <>
                    <div className='playlist'>
                        <div className='image'>
                            <img src={selectedPlaylist.image} alt="selectedplaylist" />
                        </div>
                        <div className='details'>
                            <span className='type'>PLAYLIST</span>
                            <h1 className='title'>{selectedPlaylist.name}</h1>
                            <p className='description'>{selectedPlaylist.description}</p>
                        </div>
                    </div>
                    <div className="list">
                        <div className="header-row">
                            <div className="col">
                                <span>#</span>
                            </div>
                            <div className="col">
                                <span>TITLE</span>
                            </div>
                            <div className="col">
                                <span>ALBUM</span>
                            </div>
                            <div className="col">
                                <span>
                                    <AiFillClockCircle />
                                </span>
                            </div>
                        </div>
                        <div className="tracks">
                            {
                                selectedPlaylist.tracks.map(({
                                    id,
                                    name,
                                    artists,
                                    image,
                                    duration,
                                    album,
                                    context_uri,
                                    track_number,
                                }, index) => {
                                    return (
                                        <div className="row" key={id}>
                                            <div className="col">
                                                <span>{index + 1}</span>
                                            </div>
                                            <div className="col-detail">
                                                <div className="image">
                                                    <img src={image} alt="track" />
                                                </div>
                                                <div className="info">
                                                    <span className="name">{name}</span>
                                                    <span>{artists}</span>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <span>{album}</span>
                                            </div>
                                            <div className="col">
                                                <span>{msToMinuteandSeconds(duration)}</span>
                                            </div>
                                        </div>
                                    );
                                }
                                )}
                        </div>
                    </div>
                </>
            )}
        </Container>
    )
}

export default Body;

const Container = styled.div`
    .playlist {
        margin: 0 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        .image {
        img {
            height: 15rem;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
                }
            }
        .details {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            color: #e0dede;
            .title {
                color: white;
                font-size: 4rem;
            }
        }
    }
    .list {
        .header-row {
            display: grid;
            grid-template-columns: 0.3fr 3fr 1.6fr 0.1fr;
            // fr (hay phân số) mô tả một phần của nhiều phần mà chúng ta chia đều nó.
            color: #dddcdc;
            margin: 1rem 0 0 0;
            position: sticky;
            top: 15vh;
            padding: 1rem 3rem;
            transition: 0.3s ease-in-out;
            background-color: ${({ headerBackground }) => headerBackground ? "black" : "none"};
        }
        .tracks {
            margin: 0 2rem;
            display: flex;
            flex-direction: column;
            margin-bottom: 5rem;
            .row {
                color: #dddcdc;
                padding: 0.5rem 1rem;
                display: grid;
                grid-template-columns: 0.3fr 3.2fr 1.6fr 0.1fr;
                &:hover {
                    background-color: rgba(0, 0, 0, 0.7);
                }
                .col {
                    display: flex;
                    align-items: center;
                    img {
                        height: 40px;
                    }
                }
                .col-detail {
                    display: flex;
                    gap: 1rem;
                    .info {
                        display: flex;
                        flex-direction: column;
                    }
                }
            }
        }
    }
`;