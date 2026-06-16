import { useState, useRef } from 'react'

function App() {
  // 1. 歌曲数据
  const songs = [
    {
      title: "晴天",
      artist: "周杰伦",
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    }
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];

  // 【应用维度新增强化】：用一个布尔值记录“当前是否正在播放”，默认是 false（暂停）
  const [isPlaying, setIsPlaying] = useState(false);

  // 【应用维度新增强化】：使用 useRef 抓住网页上的 <audio> 标签，这样我们才能用代码控制它放音或闭嘴
  const audioRef = useRef(null);

  // 【应用维度新增强化】：点击按钮时运行的控制逻辑
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause(); // 让音频暂停
      setIsPlaying(false);      // 把状态牌子换成 false
    } else {
      audioRef.current.play();  // 让音频播放
      setIsPlaying(true);       // 把状态牌子换成 true
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '15px', marginTop: '50px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h1>🎵 我的音乐播放器</h1>
      
      {/* 歌曲信息 */}
      <div style={{ marginTop: '20px' }}>
        <img src={currentSong.cover} alt="封面" style={{ width: '150px', height: '150px', borderRadius: '10px', objectFit: 'cover' }} />
        <h2 style={{ margin: '10px 0 5px 0' }}>{currentSong.title}</h2>
        <h3 style={{ margin: '0', color: '#666', fontWeight: 'normal' }}>{currentSong.artist}</h3>
      </div>

      {/* 【应用维度新增强化】：隐藏在幕后的真正声音播放组件 */}
      <audio ref={audioRef} src={currentSong.url} />

      {/* 【应用维度新增强化】：底部的播放/暂停控制按钮 */}
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={togglePlay}
          style={{ padding: '10px 30px', fontSize: '18px', backgroundColor: isPlaying ? '#ff4d4f' : '#1890ff', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          {isPlaying ? '⏸️ 暂停' : '▶️ 播放'}
        </button>
      </div>

      <p style={{ fontSize: '12px', color: '#999', marginTop: '20px' }}>大局观：我们给卡带播放器装上了通电按钮！</p>
    </div>
  )
}

export default App