"use client";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";

const colors = ["#63dcec", "#11caeb", "#3309ee", "#09e7f7", "#8823fc"];
const text = "Salman";

// const  particles = [] as any

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null) as any;

  const particlesRef = useRef() as any;
  particlesRef.current = [];


  // const [mouses, setmouse] = useState({ x: 0, y: 0 })
  const mouse = useMemo(() => ({ x: 0, y: 0 }), []);
  let radius = 1;



  const initScene = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const ww = (canvas.width = window.innerWidth);
    const wh = (canvas.height = window.innerHeight);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `bold ${ww / 10}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(text, ww / 2, wh / 2);

    const data = ctx.getImageData(0, 0, ww, wh).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "screen";

    for (let i = 0; i < ww; i += Math.round(ww / 150)) {
      for (let j = 0; j < wh; j += Math.round(ww / 150)) {
        if (data[(i + j * ww) * 4 + 3] > 150) {
          particlesRef.current.push(new Particle(i, j, ww, wh, colors));
        }
      }
    }
  }, []);

  // const onMouseMove = (e: { clientX: number; clientY: number; }) => {
  //   setmouse({ x: e.clientX, y: e.clientY });
  // };



  const render = useCallback(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesRef.current.forEach(
      (particle: { render: (arg0: any, arg1: { x: number; y: number }, arg2: number) => any }) =>
        particle.render(ctx, mouse, radius)
    );
    requestAnimationFrame(render);
  },[mouse, radius]);

  useEffect(() => {
    initScene();
    render();
    // window.addEventListener("mousemove", onMouseMove);
    return () => {
      // window.removeEventListener("mousemove", onMouseMove);
    };
  }, [initScene, render]);

  return (
    <main className="bg-black">
      <canvas ref={canvasRef} />
    </main>
  );
}

class Particle {
  x: number;
  y: number;
  dest: { x: number; y: number };
  r: number;
  vx: number;
  vy: number;
  accX: number;
  accY: number;
  friction: number;
  color: any;
  constructor(x: number, y: number, ww: number, wh: number, colors: string | any[]) {
    this.x = Math.random() * ww;
    this.y = Math.random() * wh;
    this.dest = { x, y };
    this.r = Math.random() * 5 + 2;
    this.vx = (Math.random() - 0.5) * 20;
    this.vy = (Math.random() - 0.5) * 20;
    this.accX = 0;
    this.accY = 0;
    this.friction = Math.random() * 0.05 + 0.94;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  render(
    ctx: {
      shadowColor: any;
      shadowBlur: number;
      fillStyle: any;
      beginPath: () => void;
      arc: (arg0: any, arg1: any, arg2: any, arg3: number, arg4: boolean) => void;
      fill: () => void;
    },
    mouse: { x: number; y: number },
    radius: number
  ) {
    this.accX = (this.dest.x - this.x) / 1000;
    this.accY = (this.dest.y - this.y) / 1000;
    this.vx += this.accX;
    this.vy += this.accY;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;

    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    ctx.fill();

    const a = this.x - mouse.x;
    const b = this.y - mouse.y;
    const distance = Math.sqrt(a * a + b * b);
    if (distance < radius * 70) {
      this.accX = (this.x - mouse.x) / 100;
      this.accY = (this.y - mouse.y) / 100;
      this.vx += this.accX;
      this.vy += this.accY;
    }
  }
}
