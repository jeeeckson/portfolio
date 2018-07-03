import React from 'react';
import { PlayButton, Timer } from 'react-soundplayer/components';
import { withSoundCloudAudio } from 'react-soundplayer/addons';

const clientId = 'YOUR CLIENT ID';
const resolveUrl = 'https://soundcloud.com/invite-1/';

const Player = withSoundCloudAudio(props => {
    let { track, currentTime } = props;

    return (
        <div className="custom-player">
            <PlayButton
                className="custom-player-btn"
                onPlayClick={() => {
                    console.log('play button clicked!');
                }}
                {...props} />
            <h2 className="custom-player-title">
                {track ? track.title : 'Loading...'}
            </h2>
            <Timer
                className="custom-player-timer"
                duration={track ? track.duration / 1000 : 0}
                currentTime={currentTime}
                {...props} />
        </div>
    );
});

export const SoundCloud = () => {
    return (
        <Player
            clientId={clientId}
            resolveUrl={resolveUrl}
            playlistIndex={resolveUrl}
            onReady={() => console.log('track is loaded!')} />
    );
};

