import { useState } from 'react'

function App() {
  // 【应用维度：第 1 步】定义歌曲数据（原材料）
  const songs = [
    {
      title: "晴天",
      artist: "周杰伦",
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // 测试音频链接
    },
    {
      title: "温柔",
      artist: "五月天",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    }
  ];

  // 【应用维度：第 2 步】用 State 记录当前听到第几首（默认第 0 首，即第一首）
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // 取出当前正在播放的那首歌的完整信息
  const currentSong = songs[currentSongIndex];

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '15px', marginTop: '50px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h1>🎵 我的音乐播放器</h1>
      
      {/* 歌曲信息组件大样 */}
      <div style={{ marginTop: '20px' }}>
        <img src={currentSong.cover} alt="封面" style={{ width: '150px', height: '150px', borderRadius: '10px', objectFit: 'cover' }} />
        <h2 style={{ margin: '10px 0 5px 0' }}>{currentSong.title}</h2>
        <h3 style={{ margin: '0', color: '#666', fontWeight: 'normal' }}>{currentSong.artist}</h3>
      </div>

      <p style={{ fontSize: '12px', color: '#999', marginTop: '20px' }}>大局观：我们现在把“磁带”装进了播放器里！</p>
    </div>
  )
}

export default App