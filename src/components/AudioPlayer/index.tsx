import './AudioPlayer.css'
import  Circle  from '../../../src/assets/svg/risian.svg?react'
import  VolumeMuteIcon  from '../../../src/assets/svg/volume-cross.svg?react'
import  VolumeHighIcon  from '../../../src/assets/svg/volume-loud.svg?react'
import Button from "../Button";
import {ChangeEvent, memo, useCallback, useEffect, useRef, useState} from "react";
import TrackInfo from "../TrackInfo";
import {RangeSlider} from "../RangeSlider";
import {tracks} from "../../shared/constants";
import {classNames} from "../../helpers/classNames";

const AudioPlayer = memo(() => {
    const [isRotating, setIsRotating] =  useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(0.5);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);


    useEffect(() => {
        const audioElement = audioRef.current;
        const handleTimeUpdate = () => {
            if (audioElement) {
                setCurrentTime(audioElement.currentTime);
                setDuration(audioElement.duration);
            }
        };

        if (audioElement) {
            audioElement.volume = volume;
            audioElement.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (audioElement) {
                audioElement.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, [volume]);

    const loadAndPlayAudio = async () => {
        const audioElement = audioRef.current;
        if (audioElement) {
            await audioElement.load();
            await audioElement.play();
        }
    }
    const togglePlay = useCallback(() => {
        const audioElement = audioRef.current;

        if (audioElement) {
            if (isPlaying) {
                audioElement.pause();
            } else {
                audioElement.play();
            }
            setIsPlaying(!isPlaying);
            handleButtonClick()
        }
    },[isPlaying])

    const handleVolumeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setVolume(+event.target.value);
    },[])

    const handleProgressChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newTime = +event.target.value * duration;
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    },[duration])

    const handleNextTrack = useCallback(() => {
        if (currentTrackIndex < tracks.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
        } else {
            setCurrentTrackIndex(0);
        }
        loadAndPlayAudio()

    },[currentTrackIndex])

    const handlePreviousTrack = useCallback(() => {
        if (currentTrackIndex > 0) {
            setCurrentTrackIndex(currentTrackIndex - 1);
        } else {
            setCurrentTrackIndex(tracks.length - 1);
        }
        loadAndPlayAudio()
    },[currentTrackIndex])
    const handleButtonClick = () => {
        setIsRotating(!isRotating);
    };


    return (
       <div className='audio-player-wrap'>
            <div className='audio-player'>
                <div className='audio-player__controls'>
                    <Button typeIcon='rewindBack' onClick={handlePreviousTrack}/>
                    <Button typeIcon='pause' onClick={togglePlay}/>
                    <Button typeIcon='rewindForward' onClick={handleNextTrack}/>
                </div>
                <audio ref={audioRef} src={tracks[currentTrackIndex].src} />
                <div className='audio-player__volume'>
                    <VolumeMuteIcon/>
                    <RangeSlider value={volume}  onChange={handleVolumeChange} />
                    <VolumeHighIcon/>
                </div>
                <TrackInfo title={tracks[currentTrackIndex].title} currentTime={currentTime} duration={duration}/>
                    <div className={classNames('audio-player__progress', {['hidden']:!isPlaying })}>
                        <RangeSlider value={currentTime / duration || 0}  onChange={handleProgressChange} />
                    </div>

                <img className='audio-player__image' src='../../../src/assets/img/Logo.png' alt='Упс'/>
                <Circle className={classNames('audio-player__circle-image', {['rotating']: isRotating})}/>
            </div>
       </div>
    )
})


export default AudioPlayer
