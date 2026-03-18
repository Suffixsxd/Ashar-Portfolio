import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) tempCtx.drawImage(canvas, 0, 0);

      canvas.width = document.documentElement.scrollWidth;
      canvas.height = document.documentElement.scrollHeight;

      ctx.drawImage(tempCanvas, 0, 0);
    };
    
    updateCanvasSize();
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(document.body);

    let drawing = false;
    let erasing = false;
    let lastX = 0;
    let lastY = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        erasing = true;
        setIsErasing(true);
        if (filterNodeRef.current) {
          filterNodeRef.current.frequency.value = 400; // Lower pitch for eraser
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        erasing = false;
        setIsErasing(false);
        if (filterNodeRef.current) {
          filterNodeRef.current.frequency.value = 1500; // Normal pitch for pencil
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const initAudio = () => {
      if (audioCtxRef.current) return;
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;

      const bufferSize = audioCtx.sampleRate * 2;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = erasing ? 400 : 1500;
      filter.Q.value = 0.8;
      filterNodeRef.current = filter;

      const gain = audioCtx.createGain();
      gain.gain.value = 0;
      gainNodeRef.current = gain;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start();
    };

    const startDrawing = (e: MouseEvent) => {
      if (e.button !== 0) return;
      drawing = true;
      setIsDrawing(true);
      lastX = e.pageX;
      lastY = e.pageY;
      
      initAudio();
      if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0.1, audioCtxRef.current.currentTime, 0.05);
      }
    };

    const stopDrawing = () => {
      drawing = false;
      setIsDrawing(false);
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.05);
      }
    };

    const draw = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsHovering(!!(target.closest('a') || target.closest('button') || target.closest('.magnetic')));

      if (!drawing) return;

      const currentX = e.pageX;
      const currentY = e.pageY;

      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (gainNodeRef.current && audioCtxRef.current) {
        const targetGain = Math.min(0.2, speed * 0.005);
        gainNodeRef.current.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.05);
      }

      const inkColor = getComputedStyle(document.body).getPropertyValue('--color-ink').trim() || '#1A1A1A';

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(currentX, currentY);
      
      if (erasing) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 30;
        ctx.globalAlpha = 1;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = inkColor;
        ctx.globalAlpha = 0.7;
        ctx.lineWidth = 2;
      }
      
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      if (!erasing && Math.random() > 0.4) {
        ctx.beginPath();
        ctx.moveTo(lastX + (Math.random() - 0.5) * 3, lastY + (Math.random() - 0.5) * 3);
        ctx.lineTo(currentX + (Math.random() - 0.5) * 3, currentY + (Math.random() - 0.5) * 3);
        ctx.strokeStyle = inkColor;
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      lastX = currentX;
      lastY = currentY;
    };

    window.addEventListener('mousedown', startDrawing);
    window.addEventListener('mouseup', stopDrawing);
    window.addEventListener('mousemove', draw);

    return () => {
      window.removeEventListener('mousedown', startDrawing);
      window.removeEventListener('mouseup', stopDrawing);
      window.removeEventListener('mousemove', draw);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      resizeObserver.disconnect();
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none z-40"
        style={{ opacity: 0.8 }}
      />
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isErasing ? '30px' : '16px',
          height: isErasing ? '30px' : '16px',
          borderRadius: isErasing ? '4px' : '50%',
        }}
        animate={{
          scale: isDrawing && !isErasing ? 0.5 : isHovering && !isErasing ? 2 : 1,
          backgroundColor: isHovering && !isErasing ? 'transparent' : isErasing ? '#FFFFFF' : '#1A1A1A',
          border: isHovering && !isErasing ? '1px solid #1A1A1A' : 'none',
        }}
        transition={{ duration: 0.1 }}
      >
        {!isErasing && <div className="w-1 h-1 bg-white rounded-full" />}
      </motion.div>
    </>
  );
}
