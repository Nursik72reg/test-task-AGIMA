import {ITrackInfoProps} from "./interfaces";
import {formatTime} from "../../helpers/formatTime";
import './trackInfo.css'

export const TrackInfo = ({ title, currentTime, duration }:ITrackInfoProps) => {
    return (
        <div className="track-info-wrap">
            <h3>{title}</h3>
            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
        </div>
    );
}

export default TrackInfo;
