'use client';

import { useRef, useEffect } from 'react';
import { Box } from '@mantine/core';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';

function PostProcessing() {
  return (
    <EffectComposer>
      {/* Custom post-processing effect implementation would go here */}
    </EffectComposer>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 8000; // Aumentei o número de partículas
  const positions = useRef<Float32Array>(new Float32Array(particleCount * 3));
  const velocities = useRef<Float32Array>(new Float32Array(particleCount * 3));
  const orbitalSpeeds = useRef<Float32Array>(new Float32Array(particleCount));
  const particleSizes = useRef<Float32Array>(new Float32Array(particleCount));
  const colors = useRef<Float32Array>(new Float32Array(particleCount * 3));

  useEffect(() => {
    const color1 = new THREE.Color('#7641C0');
    const color2 = new THREE.Color('#9461FF');
    
    for (let i = 0; i < particleCount; i++) {
      const isEventHorizon = i < particleCount * 0.6;
      const angle = (i / (isEventHorizon ? particleCount * 0.6 : particleCount * 0.4)) * Math.PI * 2;
      
      // Distribuição de raio mais natural
      let radius;
      if (isEventHorizon) {
        radius = 1.5 + Math.pow(Math.random(), 2) * 2;
      } else {
        radius = 4 + Math.pow(Math.random(), 3) * 8;
      }
      
      positions.current[i * 3] = Math.cos(angle) * radius;
      positions.current[i * 3 + 1] = Math.sin(angle) * radius;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * (isEventHorizon ? 0.5 : 2);
      
      // Velocidades orbitais mais realistas
      orbitalSpeeds.current[i] = isEventHorizon ? 
        0.002 / (radius * 0.5) : // Mais rápido perto do centro
        0.0005 / (radius * 0.5); // Mais lento nas bordas
      
      // Tamanhos variados das partículas
      particleSizes.current[i] = isEventHorizon ?
        0.02 + Math.random() * 0.03 :
        0.01 + Math.random() * 0.02;
      
      // Cores com gradiente
      const color = isEventHorizon ? color1.lerp(color2, Math.random() * 0.3) : color2.lerp(color1, Math.random() * 0.5);
      colors.current[i * 3] = color.r;
      colors.current[i * 3 + 1] = color.g;
      colors.current[i * 3 + 2] = color.b;
    }
  }, []);

  useFrame(({ clock }) => {
    if (!particlesRef.current) return;

    const time = clock.getElapsedTime();
    const positionAttribute = particlesRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    const positionsArray = positionAttribute.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = positionsArray[i3];
      const y = positionsArray[i3 + 1];
      const z = positionsArray[i3 + 2];
      
      const distance = Math.sqrt(x * x + y * y);
      const angle = Math.atan2(y, x);
      
      // Velocidade orbital variável
      const baseSpeed = orbitalSpeeds.current[i];
      const speedVariation = Math.sin(time * 0.5 + distance) * 0.2;
      const finalSpeed = baseSpeed * (1 + speedVariation);
      
      const newAngle = angle + finalSpeed;
      
      // Força gravitacional não-linear
      const gravitationalPull = Math.max(0.00001, 0.001 / (distance * distance));
      const newRadius = distance - gravitationalPull;
      
      // Movimento espiral suave
      positionsArray[i3] = Math.cos(newAngle) * newRadius;
      positionsArray[i3 + 1] = Math.sin(newAngle) * newRadius;
      
      // Movimento vertical ondulante
      positionsArray[i3 + 2] = z * 0.998 + Math.sin(time + distance) * 0.001;
    }
    
    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions.current}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function BlackHoleCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.002;
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        transparent
        uniforms={{
          time: { value: 0 },
          color: { value: new THREE.Color("#000000") },
          opacity: { value: 0.95 },
        }}
        vertexShader={`
          varying vec2 vUv;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Adiciona uma leve distorção na geometria
            float distortion = sin(time * 0.5) * 0.02;
            pos += normal * distortion;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          
          void main() {
            vec2 center = vec2(0.5, 0.5);
            vec2 uv = vUv - center;
            float dist = length(uv);
            
            // Efeito de distorção gravitacional
            float distortionStrength = 2.0;
            float distortion = 1.0 / (1.0 + dist * distortionStrength);
            
            // Adiciona um efeito de turbulência
            float turbulence = sin(dist * 20.0 - time) * 0.1;
            distortion += turbulence;
            
            // Aplica a distorção
            vec2 distortedUv = uv * distortion;
            
            // Suaviza as bordas
            float edge = smoothstep(0.5, 0.2, dist);
            
            // Adiciona um brilho nas bordas
            float glow = smoothstep(0.5, 0.2, dist) * 0.5;
            vec3 glowColor = vec3(0.2, 0.0, 0.4); // Cor roxa escura
            
            vec3 finalColor = mix(color, glowColor, glow);
            float finalOpacity = opacity * (edge + glow);
            
            gl_FragColor = vec4(finalColor, finalOpacity);
          }
        `}
      />
    </mesh>
  );
}

function AccretionDisk() {
  const diskRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (diskRef.current) {
      diskRef.current.rotation.z += 0.0001;
    }
  });

  return (
    <mesh ref={diskRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.2, 3, 64]} />
      <meshBasicMaterial
        color="#7641C0"
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function SpaceDistortion() {
  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
      meshRef.current.material.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[20, 20, 1]} position={[0, 0, -10]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        transparent
        uniforms={{
          time: { value: 0 },
          color: { value: new THREE.Color("#7641C0") },
        }}
        vertexShader={`
          varying vec2 vUv;
          uniform float time;

          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Adiciona distorção na posição baseada na distância do centro
            vec2 center = vec2(0.5, 0.5);
            vec2 toCenter = vUv - center;
            float dist = length(toCenter);
            float distortionStrength = 0.2 * smoothstep(0.0, 0.5, dist);
            float angle = atan(toCenter.y, toCenter.x) + time * 0.2;
            
            pos.x += cos(angle) * distortionStrength;
            pos.y += sin(angle) * distortionStrength;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec3 color;
          varying vec2 vUv;

          void main() {
            vec2 center = vec2(0.5, 0.5);
            float dist = length(vUv - center);
            
            // Cria padrões de onda mais complexos
            float wave1 = sin(dist * 20.0 - time * 2.0) * 0.5 + 0.5;
            float wave2 = sin(dist * 15.0 - time * 1.5 + 3.14) * 0.5 + 0.5;
            float wave = mix(wave1, wave2, 0.5);
            
            // Ajusta a opacidade baseada na distância do centro
            float alpha = smoothstep(0.5, 0.1, dist) * wave * 0.5;
            
            // Adiciona um efeito de pulso
            alpha *= 0.8 + 0.2 * sin(time * 2.0);
            
            // Cria um gradiente de cor
            vec3 finalColor = mix(color, color * 1.5, wave);
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `}
      />
    </mesh>
  );
}

export function BlackHoleEffect() {
  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 12],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.3} />
        <pointLight
          position={[0, 0, 0]}
          color="#7641C0"
          intensity={2}
          distance={10}
          decay={2}
        />
        
        <SpaceDistortion />
        <group scale={[1.5, 1.5, 1.5]}> {/* Aumentando o tamanho do conjunto */}
          <Particles />
          <BlackHoleCore />
          <AccretionDisk />
        </group>
        <PostProcessing />
      </Canvas>
    </Box>
  );
}














