import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.03;
    vec2 m = uMouse * 0.08;

    float n  = sin((uv.x * 2.0 + t) + sin(uv.y * 2.5 - t)) * 0.5 + 0.5;
    float n2 = sin((uv.y * 2.2 - t * 0.7) + cos(uv.x * 2.0 + t)) * 0.5 + 0.5;

    vec3 col = uColorA;
    col = mix(col, uColorB, n * 0.10);
    col = mix(col, uColorC, n2 * 0.06);

    float d = distance(uv, vec2(0.5) + m);
    col += uColorB * smoothstep(0.7, 0.0, d) * 0.06;

    float vig = smoothstep(1.25, 0.3, distance(uv, vec2(0.5)));
    col *= vig;

    float g = hash(uv * (uTime + 1.0)) * 0.02;
    col += g - 0.01;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function ShaderPlane() {
  const matRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color('#050810') },
      uColorB: { value: new THREE.Color('#00d4ff') },
      uColorC: { value: new THREE.Color('#7c3aed') },
    }),
    []
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    const u = uniforms.uMouse.value;
    u.x += (mouse.current.x - u.x) * 0.05;
    u.y += (mouse.current.y - u.y) * 0.05;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export default function HeroBackground() {
  const wrapRef = useRef();
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    const onVis = () => setActive(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      obs.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 z-0"
      style={{ background: 'var(--bg)' }}
      aria-hidden="true"
    >
      <Canvas
        className="!absolute inset-0"
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        frameloop={active ? 'always' : 'never'}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
