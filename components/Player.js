import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const Player = ({ sources, handleVideoEnd }) => {
  const [selectedUrl, setSelectedUrl] = useState(null)
  const [progress, setProgress] = useState(0);
  const handleProgress = (progress) => {
    (Math.round(progress.played * 100));
  }
  const handleQualityChange = (url) => {
    setSelectedUrl(url)
  }
  useEffect(() => {
    //const defaultVideo = sources.find((main) => main.quality === 'default')
    const defaultVideo = sources.main != undefined && sources.main.quality === 'default'
    if (defaultVideo) {
      setSelectedUrl(sources.main.url)
    }
  }, [])
  return(
    <div className='gap-1 flex py-1 flex-wrap place-content-center'>
      {selectedUrl && (
        <ReactPlayer
          onEnded={handleVideoEnd}
          url={selectedUrl}
          controls width={'100%'} height={'100%'}/>
      )}
      <div className='gap-1 flex py-1 flex-wrap place-content-center'>
        {/*sources.map((video) => (
          <button
            onClick={() => handleQualityChange(video.url)} key={video.url}
            className={`${selectedUrl === video.url ? 'bg-secondary-focus text-primary border-2 border-primary' : 'bg-secondary text-primary'} my-auto px-3 py-2 text-xs`}>
            {video.quality}
          </button>
        ))*/}
          <button
            onClick={() => handleQualityChange(sources.main.url)} key={sources.main.url}
            className={`${selectedUrl === sources.main.url ? 'bg-secondary-focus text-primary border-2 border-primary' : 'bg-secondary text-primary'} my-auto px-3 py-2 text-xs`}>
            {sources.main.quality}
          </button>
          <button
            onClick={() => handleQualityChange(sources.backup.url)} key={sources.backup.url}
            className={`${selectedUrl === sources.backup.url ? 'bg-secondary-focus text-primary border-2 border-primary' : 'bg-secondary text-primary'} my-auto px-3 py-2 text-xs`}>
            {sources.backup.quality}
          </button>
      </div>
    </div>
  )
}

export default Player
