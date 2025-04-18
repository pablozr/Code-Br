'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BlackHoleAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    // Set canvas size
    const setCanvasSize = () => {
      // Garantir que o canvas ocupe toda a área disponível
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      // Ajustar o tamanho do renderer para evitar problemas de escala
      renderer.setPixelRatio(window.devicePixelRatio);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create black hole sphere with darker material - tamanho aumentado
    const geometry = new THREE.SphereGeometry(15, 64, 64);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;

        void main() {
          vUv = uv;
          vPosition = position;

          // Distorção suave sem efeito de pulsação
          vec3 pos = position;
          float dist = length(pos.xy);

          // Pequena distorção vertical estática
          pos.z += sin(dist * 3.0) * 0.3;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;

        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = length(vUv - center);

          // Cores para o buraco negro - sem efeito de pulsação
          vec3 black = vec3(0.0, 0.0, 0.0);
          vec3 darkPurple = vec3(0.1, 0.0, 0.2);

          // Gradiente simples do centro para a borda
          vec3 color = mix(black, darkPurple, dist);

          gl_FragColor = vec4(color, 1.0 - dist * 1.2);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const blackHole = new THREE.Mesh(geometry, material);
    scene.add(blackHole);

    // Create orbital particles with gravitational effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 6000; // Aumentado para mais densidade e variedade
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    // Array para armazenar o tipo de cada partícula
    // 0 = partículas que serão sugadas
    // 1 = partículas em órbita estável
    // 2 = partículas que escapam da gravidade
    const particleTypes = new Uint8Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Distribuição de partículas em três grupos
      const random = Math.random();

      // 20% das partículas serão sugadas para o buraco negro
      if (random < 0.2) {
        particleTypes[i/3] = 0; // Tipo: partículas que serão sugadas

        // Posicionar em uma espiral que se aproxima do centro
        const angle = Math.random() * Math.PI * 2;
        const radiusBase = 20 + Math.random() * 30; // Começam um pouco mais distantes
        const height = (Math.random() - 0.5) * 5;

        positions[i] = Math.cos(angle) * radiusBase;
        positions[i + 1] = Math.sin(angle) * radiusBase;
        positions[i + 2] = height;

        // Velocidades com componente radial em direção ao centro
        const speed = 0.01 + Math.random() * 0.02;
        const inwardFactor = 0.5 + Math.random() * 0.5; // Fator de movimento para dentro
        velocities[i] = -Math.sin(angle) * speed - Math.cos(angle) * speed * inwardFactor;
        velocities[i + 1] = Math.cos(angle) * speed - Math.sin(angle) * speed * inwardFactor;
        velocities[i + 2] = 0;
      }
      // 50% das partículas em órbitas estáveis
      else if (random < 0.7) {
        particleTypes[i/3] = 1; // Tipo: partículas em órbita estável

        // Distribuir em órbitas elípticas em diferentes planos
        const angle = Math.random() * Math.PI * 2;
        const radiusBase = 40 + Math.random() * 60; // Órbitas médias a distantes
        const eccentricity = 0.1 + Math.random() * 0.3; // Excentricidade da órbita
        const height = (Math.random() - 0.5) * 15; // Variação no plano Z

        // Posição em uma elipse
        positions[i] = Math.cos(angle) * radiusBase * (1 + eccentricity * Math.cos(angle));
        positions[i + 1] = Math.sin(angle) * radiusBase * (1 - eccentricity * Math.cos(angle));
        positions[i + 2] = height;

        // Velocidades orbitais estáveis - velocidade orbital kepleriana
        const distance = Math.sqrt(positions[i]**2 + positions[i+1]**2);
        const speed = 0.5 / Math.sqrt(distance) * (0.8 + Math.random() * 0.4); // Velocidade orbital proporcional a 1/sqrt(r)
        velocities[i] = -Math.sin(angle) * speed;
        velocities[i + 1] = Math.cos(angle) * speed;
        velocities[i + 2] = (Math.random() - 0.5) * 0.01; // Pequena variação no eixo Z
      }
      // 30% das partículas escapam da gravidade
      else {
        particleTypes[i/3] = 2; // Tipo: partículas que escapam

        // Posicionar em uma região intermediária
        const angle = Math.random() * Math.PI * 2;
        const radiusBase = 70 + Math.random() * 50; // Começam em distância média
        const height = (Math.random() - 0.5) * 20;

        positions[i] = Math.cos(angle) * radiusBase;
        positions[i + 1] = Math.sin(angle) * radiusBase;
        positions[i + 2] = height;

        // Velocidades com componente radial para fora
        const speed = 0.01 + Math.random() * 0.03;
        const outwardFactor = 0.5 + Math.random() * 1.0; // Fator de movimento para fora
        velocities[i] = -Math.sin(angle) * speed + Math.cos(angle) * speed * outwardFactor;
        velocities[i + 1] = Math.cos(angle) * speed + Math.sin(angle) * speed * outwardFactor;
        velocities[i + 2] = (Math.random() - 0.5) * 0.02; // Pequena variação no eixo Z
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Usar material simples sem textura para garantir que as partículas sejam visíveis
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.4, // Tamanho reduzido para um visual mais limpo
      color: 0x9B87F5,
      transparent: true,
      opacity: 0.8, // Opacidade reduzida para um visual mais sutil
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Position camera - mais próxima para destacar o buraco negro
    camera.position.z = 70; // Distância ajustada para equilibrar visibilidade do buraco negro e partículas

    // Animation with gravitational effect - comportamentos diferentes para cada tipo de partícula
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      time += 0.005; // Velocidade de animação reduzida pela metade
      material.uniforms.time.value = time;

      blackHole.rotation.y += 0.0005; // Rotação mais lenta

      // Update particle positions based on their type
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const particleIndex = i / 3;
        const particleType = particleTypes[particleIndex];

        // Get current position
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        // Calculate distance to black hole
        const distance = Math.sqrt(x * x + y * y + z * z);
        const angle = Math.atan2(y, x);

        // Comportamento baseado no tipo de partícula
        switch (particleType) {
          // Partículas que serão sugadas para o buraco negro
          case 0: {
            // Movimento espiral em direção ao centro
            const spiralFactor = Math.max(0.1, Math.min(1.0, 20 / distance)); // Mais forte quanto mais perto
            const rotationSpeed = 0.003 + spiralFactor * 0.01; // Rotação mais rápida perto do centro
            const newAngle = angle + rotationSpeed;

            // Força gravitacional forte
            const pull = 0.05 + spiralFactor * 0.15; // Aumentada a força de atração
            const newRadius = Math.max(0, distance - pull);

            // Atualizar posição com movimento espiral para dentro
            if (distance > 18) { // Ainda não está perto o suficiente para desaparecer
              positions[i] = Math.cos(newAngle) * newRadius;
              positions[i + 1] = Math.sin(newAngle) * newRadius;

              // Efeito de profundidade - partículas se aproximam do observador ao serem sugadas
              const depthEffect = Math.max(0, (40 - distance) / 40);
              positions[i + 2] = z * 0.98 + depthEffect * 0.5; // Efeito de profundidade mais sutil

              // Diminuir gradualmente a opacidade das partículas ao se aproximarem do centro
              // Isso é feito ajustando o tamanho da partícula, já que não podemos alterar a opacidade diretamente
              if (distance < 25) {
                // Reduzir o tamanho da partícula para simular desaparecimento
                // Isso é feito no material das partículas, não aqui
                // Mas podemos preparar a partícula para desaparecer completamente
                if (distance < 20) {
                  // Chance de desaparecer aumenta quanto mais perto do centro
                  if (Math.random() < (20 - distance) / 10) {
                    // Partícula desaparece - reposicionar em uma nova órbita
                    const resetAngle = Math.random() * Math.PI * 2;
                    const resetRadius = 50 + Math.random() * 70; // Órbita mais ampla
                    positions[i] = Math.cos(resetAngle) * resetRadius;
                    positions[i + 1] = Math.sin(resetAngle) * resetRadius;
                    positions[i + 2] = (Math.random() - 0.5) * 15;

                    // 70% de chance de reaparecer como partícula que será sugada novamente
                    // 30% de chance de reaparecer como partícula em órbita estável
                    particleTypes[particleIndex] = Math.random() < 0.7 ? 0 : 1;
                  }
                }
              }
            } else {
              // Partícula chegou muito perto do centro - reposicionar imediatamente
              // Isso evita que partículas entrem literalmente no buraco negro e o tornem roxo
              const resetAngle = Math.random() * Math.PI * 2;
              const resetRadius = 50 + Math.random() * 70; // Órbita mais ampla
              positions[i] = Math.cos(resetAngle) * resetRadius;
              positions[i + 1] = Math.sin(resetAngle) * resetRadius;
              positions[i + 2] = (Math.random() - 0.5) * 15;

              // 70% de chance de reaparecer como partícula que será sugada novamente
              // 30% de chance de reaparecer como partícula em órbita estável
              particleTypes[particleIndex] = Math.random() < 0.7 ? 0 : 1;
            }
            break;
          }

          // Partículas em órbita estável
          case 1: {
            // Movimento orbital kepleriano - mais rápido perto do centro
            const orbitalSpeed = 0.5 / Math.sqrt(Math.max(30, distance)) * 0.01;
            const newAngle = angle + orbitalSpeed;

            // Manter a distância com pequenas variações para criar órbitas elípticas
            const eccentricity = 0.1 + (particleIndex % 10) * 0.02; // Variação de excentricidade entre partículas
            const radiusVariation = Math.sin(time * 0.2 + particleIndex * 0.1) * eccentricity;
            const newRadius = distance * (1 + radiusVariation);

            // Atualizar posição com movimento orbital
            positions[i] = Math.cos(newAngle) * newRadius;
            positions[i + 1] = Math.sin(newAngle) * newRadius;

            // Variação no eixo Z para criar efeito 3D de órbitas em diferentes planos
            const zVariation = Math.sin(time * 0.1 + particleIndex * 0.3) * (0.5 + (particleIndex % 5) * 0.1);
            positions[i + 2] = z * 0.99 + zVariation;

            // Pequena chance de mudar para partícula que escapa (evento aleatório)
            if (Math.random() < 0.0002) {
              particleTypes[particleIndex] = 2;
            }

            // Pequena chance de ser atraída para o buraco negro (perturbação orbital)
            if (Math.random() < 0.0001 && distance < 60) {
              particleTypes[particleIndex] = 0;
            }

            // Se a partícula sair da área visível, reposicioná-la
            if (distance > 200 || Math.abs(positions[i]) > 180 || Math.abs(positions[i + 1]) > 150) {
              const resetAngle = Math.random() * Math.PI * 2;
              const resetRadius = 40 + Math.random() * 60;
              positions[i] = Math.cos(resetAngle) * resetRadius;
              positions[i + 1] = Math.sin(resetAngle) * resetRadius;
              positions[i + 2] = (Math.random() - 0.5) * 15;
            }
            break;
          }

          // Partículas que escapam da gravidade
          case 2: {
            // Movimento com componente radial para fora - efeito de ejeção extremamente suave
            const escapeSpeed = 0.0003 + 0.0005 * (distance / 100); // Velocidade drasticamente reduzida

            // Rotação muito mais lenta e suave
            const rotationSpeed = 0.0003 / (1 + distance * 0.01); // Rotação muito mais lenta
            const newAngle = angle + rotationSpeed;

            // Aumentar a distância de forma muito gradual
            const accelerationFactor = 1.0 + (distance / 500); // Aceleração extremamente suave
            const newRadius = distance + escapeSpeed * distance * 0.05 * accelerationFactor; // Fator significativamente reduzido

            // Atualizar posição com movimento para fora muito suave
            positions[i] = Math.cos(newAngle) * newRadius;
            positions[i + 1] = Math.sin(newAngle) * newRadius;

            // Variação no eixo Z mínima e extremamente suave
            // Apenas uma pequena fração das partículas terá variação Z
            if (particleIndex % 8 === 0) { // Reduzido para apenas 12.5% das partículas
              const zDirection = (particleIndex % 16 === 0) ? 1 : -1;
              // Usar uma função senoidal para criar movimento Z mais suave
              const zSpeed = 0.01 * Math.sin(time * 0.1 + particleIndex * 0.01) * (distance / 200);
              positions[i + 2] = z + zDirection * zSpeed;
            } else {
              // Manter as outras partículas em um plano praticamente estável
              positions[i + 2] = z * 0.9995; // Decaimento extremamente leve
            }

            // Adicionar pequena variação na trajetória baseada no índice da partícula
            // Isso cria um padrão mais natural e menos mecânico
            const uniqueOffset = Math.sin(particleIndex * 0.1) * 0.0001;
            positions[i] += Math.cos(time * 0.2 + particleIndex * 0.05) * uniqueOffset * distance;
            positions[i + 1] += Math.sin(time * 0.2 + particleIndex * 0.05) * uniqueOffset * distance;

            // Se a partícula sair completamente da área visível, reposicioná-la
            if (distance > 250 || Math.abs(positions[i]) > 200 || Math.abs(positions[i + 1]) > 180) {
              // Reposicionar como uma nova partícula
              // 20% de chance de ser sugada
              // 60% de chance de entrar em órbita estável
              // 20% de chance de escapar novamente (criar jatos de partículas)
              const randomFate = Math.random();
              if (randomFate < 0.2) {
                particleTypes[particleIndex] = 0; // Sugada
              } else if (randomFate < 0.8) {
                particleTypes[particleIndex] = 1; // Órbita estável
              } else {
                particleTypes[particleIndex] = 2; // Escapa novamente
              }

              const resetAngle = Math.random() * Math.PI * 2;
              const resetRadius = 40 + Math.random() * 60;
              positions[i] = Math.cos(resetAngle) * resetRadius;
              positions[i + 1] = Math.sin(resetAngle) * resetRadius;
              positions[i + 2] = (Math.random() - 0.5) * 20;
            }
            break;
          }

          // Caso padrão (não deveria ocorrer)
          default: {
            // Movimento orbital simples
            const newAngle = angle + 0.002;
            positions[i] = Math.cos(newAngle) * distance;
            positions[i + 1] = Math.sin(newAngle) * distance;
            break;
          }
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      scene.remove(blackHole);
      scene.remove(particles);
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      overflow: 'hidden',
      pointerEvents: 'none' // Permite clicar em elementos abaixo
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          background: 'transparent', // Removido o fundo para usar o GradientNebulaBackground
        }}
      />
    </div>
  );
};

export default BlackHoleAnimation;
