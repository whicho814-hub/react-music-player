import { useState, useRef, useEffect } from 'react'

function App() {
  // 工业级数据源：包含多首歌曲、精致封面及高质音频
  const songs = [
    { title: "晴天", artist: "周杰伦", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "温柔", artist: "五月天", cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "夜曲", artist: "周杰伦", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 进度条百分比
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");

  const audioRef = useRef(null);
  const currentSong = songs[currentIndex];

  // 核心控制：播放 / 暂停
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // 切歌逻辑（大局观：改变索引，并自动触发音频重载）
  const changeSong = (direction) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = songs.length - 1;
    if (newIndex >= songs.length) newIndex = 0;
    setCurrentIndex(newIndex);
    setIsPlaying(false);
    setProgress(0);
  };

  // 监听歌曲源改变：当用户切歌时，如果原本处于播放状态，自动让新歌响起来
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentIndex]);

  // 实时更新进度条与时间（大局观：这就是 Jenkins 自动化测试中常被模拟的数据流）
  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration || 0;
    if (total > 0) {
      setProgress((current / total) * 100);
    }
    setCurrentTime(formatTime(current));
  };

  // 拿到音频总长度
  const handleLoadedMetadata = () => {
    setDuration(formatTime(audioRef.current.duration));
  };

  // 拖动进度条逻辑
  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    setProgress(newProgress);
    const total = audioRef.current.duration || 0;
    audioRef.current.currentTime = (newProgress / 100) * total;
  };

  // 格式化时间辅助函数
  const formatTime = (time) => {
    const mins = Math.floor(time / 60).toString().padStart(2, '0');
    const secs = Math.floor(time % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#1e293b', padding: '30px', borderRadius: '30px', width: '350px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)', border: '1px solid #334155' }}>
        
        <span style={{ fontSize: '12px', background: '#38bdf8', color: '#0f172a', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold' }}>PRO VERSION</span>
        
        {/* 歌曲封面艺术区 */}
        <div style={{ marginTop: '25px', position: 'relative' }}>
          <img src={currentSong.cover} alt="Cover" style={{ width: '220px', height: '220px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #334155', animation: isPlaying ? 'spin 12s linear infinite' : 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)' }} />
        </div>

        {/* 歌曲主文本 */}
        <div style={{ marginTop: '25px' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', letterSpacing: '-0.5px' }}>{currentSong.title}</h2>
          <p style={{ margin: '0', color: '#94a3b8', fontSize: '16px' }}>{currentSong.artist}</p>
        </div>

        {/* 隐藏的底层硬件驱动 */}
        <audio ref={audioRef} src={currentSong.url} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => changeSong(1)} />

        {/* 工业级进度条组件 */}
        <div style={{ marginTop: '30px' }}>
          <input type="range" min="0" max="100" value={progress} onChange={handleProgressChange} style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginTop: '5px' }}>
            <span>{currentTime}</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* 炫酷控制台面板 */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', marginTop: '25px' }}>
          <button onClick={() => changeSong(-1)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '24px', cursor: 'pointer', transition: 'color 0.2s' }}>⏮️</button>
          
          <button onClick={togglePlay} style={{ background: isPlaying ? '#ef4444' : '#38bdf8', border: 'none', color: '#0f172a', width: '60px', height: '60px', borderRadius: '50%', fontSize: '24px', cursor: 'pointer', boxShadow: '0 4px 14px 0 rgba(56, 189, 248, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'transform 0.1s' }}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          
          <button onClick={() => changeSong(1)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '24px', cursor: 'pointer', transition: 'color 0.2s' }}>⏭️</button>
        </div>

        {/* 炫酷的黑客帝国大局观声明 */}
        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #334155', fontSize: '11px', color: '#475569', textAlign: 'left' }}>
          <div>⚡ 编译目标：Vite + React 18</div>
          <div>📦 流水线压测点：TimeUpdate 状态流</div>
        </div>

      </div>

      {/* 动态旋转动画的样式注入 */}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

export default App