'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Box } from '@mantine/core';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';

function PostProcessing() {
  return (
    <EffectComposer>
      {/* Efeito de bloom para realçar as áreas brilhantes */}
      <Bloom
        intensity={2.2} // Aumentado para tornar as partículas mais brilhantes
        luminanceThreshold={0.08} // Reduzido para capturar mais áreas roxas
        luminanceSmoothing={0.85} // Ajustado para suavizar o efeito
        kernelSize={KernelSize.LARGE}
        blendFunction={BlendFunction.SCREEN}
      />

      {/* Aberração cromática para simular distorção gravitacional */}
      <ChromaticAberration
        offset={[0.002, 0.002]} // Sutil, mas visível
        radialModulation={true}
        modulationOffset={0.15}
      />

      {/* Vinheta para escurecer as bordas e focar no buraco negro */}
      <Vignette
        darkness={0.7}
        offset={0.3}
      />
    </EffectComposer>
  );
}



function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 12000; // Aumentado para preencher toda a tela
  const positions = useRef<Float32Array>(new Float32Array(particleCount * 3));
  const orbitalSpeeds = useRef<Float32Array>(new Float32Array(particleCount));
  const particleSizes = useRef<Float32Array>(new Float32Array(particleCount));
  const colors = useRef<Float32Array>(new Float32Array(particleCount * 3));

  useEffect(() => {
    const color1 = new THREE.Color('#7641C0'); // Roxo mais intenso
    const color2 = new THREE.Color('#9969E5'); // Roxo mais claro
    const brightColor = new THREE.Color('#B490FF'); // Roxo brilhante para partículas mais brilhantes

    for (let i = 0; i < particleCount; i++) {
      // Distribuição em toda a tela, não apenas ao redor do buraco negro
      const isNearCore = i < particleCount * 0.25; // 25% das partículas próximas ao centro
      const isNearHorizon = isNearCore; // Alias para manter compatibilidade

      let x, y, z, radius;

      if (isNearCore) {
        // Partículas próximas ao buraco negro em distribuição circular
        const angle = Math.random() * Math.PI * 2;
        radius = 1.5 + Math.pow(Math.random(), 2) * 3;
        x = Math.cos(angle) * radius;
        y = Math.sin(angle) * radius;
        z = (Math.random() - 0.5) * 0.5;
      } else {
        // Partículas distribuídas por toda a tela
        // Usamos uma distribuição mais ampla para cobrir toda a hero section
        x = (Math.random() - 0.5) * 40; // -20 a 20 (mais amplo horizontalmente)
        y = (Math.random() - 0.5) * 25; // -12.5 a 12.5 (mais amplo verticalmente)
        z = (Math.random() - 0.5) * 8; // Profundidade variada
      }

      positions.current[i * 3] = x;
      positions.current[i * 3 + 1] = y;
      positions.current[i * 3 + 2] = z;

      // Velocidades orbitais mais lentas
      const distance = Math.sqrt(x * x + y * y); // Distância ao centro
      orbitalSpeeds.current[i] = isNearHorizon ?
        0.0015 / (Math.max(0.5, distance) * 0.5) : // Velocidade reduzida perto do centro (50% mais lento)
        0.0005 / (Math.max(0.5, distance) * 0.2);  // Velocidade reduzida longe do centro (50% mais lento)

      // Tamanhos variados das partículas
      particleSizes.current[i] = isNearCore ?
        0.02 + Math.random() * 0.03 :
        0.01 + Math.random() * 0.02;

      // Cores com gradiente e algumas partículas brilhantes
      let color;
      if (Math.random() < 0.15) { // 15% das partículas são mais brilhantes
        color = brightColor.clone().lerp(color2, Math.random() * 0.3); // Mistura com roxo para manter tom
      } else {
        // Mais partículas roxas, com variação de tons
        color = isNearCore ?
          color1.clone().lerp(color2, Math.random() * 0.4) : // Tons mais escuros perto do centro
          color2.clone().lerp(color1, Math.random() * 0.3);  // Tons mais claros nas bordas
      }
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

    // Obter ou criar atributo de opacidade
    let opacityAttribute = particlesRef.current.geometry.getAttribute('opacity') as THREE.BufferAttribute;
    if (!opacityAttribute) {
      const opacities = new Float32Array(particleCount).fill(1.0);
      opacityAttribute = new THREE.BufferAttribute(opacities, 1);
      particlesRef.current.geometry.setAttribute('opacity', opacityAttribute);
    }

    // Raio do horizonte de eventos e parâmetros de movimento
    const eventHorizonRadius = 1.0;
    const fadeStartRadius = eventHorizonRadius * 1.5;
    const screenBounds = { x: 35, y: 25 }; // Limites ampliados para corresponder às novas órbitas

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = positionsArray[i3];
      const y = positionsArray[i3 + 1];
      const z = positionsArray[i3 + 2];

      const distance = Math.sqrt(x * x + y * y);
      const isNearCore = distance < 5; // Partículas próximas ao centro

      if (isNearCore) {
        // Movimento orbital para partículas próximas ao buraco negro
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

        // Ajustar opacidade baseada na distância ao centro
        if (newRadius < fadeStartRadius) {
          const opacity = Math.max(0, (newRadius - eventHorizonRadius) / (fadeStartRadius - eventHorizonRadius));
          opacityAttribute.setX(i, opacity * opacity);
        } else {
          opacityAttribute.setX(i, 1.0);
        }

        // Reposicionar partículas que entraram no horizonte de eventos
        if (newRadius < eventHorizonRadius * 0.8) {
          // Gera uma nova posição para a partícula em uma órbita externa
          const newOrbitRadius = 4 + Math.random() * 3;
          const newOrbitAngle = Math.random() * Math.PI * 2;
          positionsArray[i3] = Math.cos(newOrbitAngle) * newOrbitRadius;
          positionsArray[i3 + 1] = Math.sin(newOrbitAngle) * newOrbitRadius;
          positionsArray[i3 + 2] = (Math.random() - 0.5) * 1.0;
          opacityAttribute.setX(i, 0.2);
        }
      } else {
        // Movimento orbital para partículas distantes, mas mais lento
        const angle = Math.atan2(y, x);

        // Velocidade orbital variável, mais lenta que as partículas próximas
        const baseSpeed = orbitalSpeeds.current[i];
        const speedVariation = Math.sin(time * 0.3 + distance * 0.5) * 0.3;
        const finalSpeed = baseSpeed * (1 + speedVariation);

        // Adiciona variação única para cada partícula
        const uniqueOffset = i % 10; // Cria variação entre partículas
        const uniqueSpeed = 0.0001 * (uniqueOffset + 1);

        const newAngle = angle + finalSpeed + uniqueSpeed;

        // Força gravitacional mais fraca para partículas distantes
        const gravitationalPull = Math.max(0.00001, 0.0002 / (distance * distance));

        // Movimento orbital com leve aproximação ao centro
        const newRadius = distance - gravitationalPull;

        // Movimento espiral suave
        positionsArray[i3] = Math.cos(newAngle) * newRadius;
        positionsArray[i3 + 1] = Math.sin(newAngle) * newRadius;

        // Movimento vertical ondulante mais sutil
        positionsArray[i3 + 2] = z * 0.999 + Math.sin(time * 0.1 + distance + uniqueOffset * 0.2) * 0.003;

        // Mantém as partículas dentro dos limites da tela
        if (Math.abs(positionsArray[i3]) > screenBounds.x) {
          positionsArray[i3] = Math.sign(positionsArray[i3]) * screenBounds.x * 0.95;
        }

        if (Math.abs(positionsArray[i3 + 1]) > screenBounds.y) {
          positionsArray[i3 + 1] = Math.sign(positionsArray[i3 + 1]) * screenBounds.y * 0.95;
        }

        // Opacidade baseada na distância ao centro para criar um gradiente
        const centerFade = Math.min(1, distance / 10); // Mais brilhante perto do centro
        opacityAttribute.setX(i, centerFade);
      }
    }

    positionAttribute.needsUpdate = true;
    opacityAttribute.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3, false]}
          count={particleCount}
          array={positions.current}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors.current, 3, false]}
          count={particleCount}
          array={colors.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-opacity"
          args={[new Float32Array(particleCount).fill(0.7), 1, false]} /* Reduzido para 70% de opacidade */
          count={particleCount}
          itemSize={1}
          usage={THREE.DynamicDrawUsage}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        vertexShader={`
          attribute float opacity;
          varying float vOpacity;
          varying vec3 vColor;
          attribute vec3 color;
          uniform float size;

          void main() {
            vColor = color;
            vOpacity = opacity;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying float vOpacity;
          varying vec3 vColor;

          // Função para criar efeito de blur
          vec4 blur(vec2 coord, float radius) {
            vec4 color = vec4(0.0);
            float total = 0.0;

            // Amostragem em um padrão circular para criar o blur
            for (float angle = 0.0; angle < 3.14 * 2.0; angle += 0.5) {
              for (float r = 1.0; r <= radius; r += 1.0) {
                vec2 offset = vec2(cos(angle), sin(angle)) * r * 0.01;
                vec2 sampleCoord = coord + offset;

                // Calcula a cor e opacidade para este ponto
                vec2 sampleCenter = sampleCoord - vec2(0.5);
                float sampleDist = length(sampleCenter);
                float sampleAlpha = smoothstep(0.5, 0.3, sampleDist) * vOpacity * 0.8;

                // Peso baseado na distância
                float weight = 1.0 / (r * r + 1.0);

                // Acumula a cor com peso
                color += vec4(vColor, sampleAlpha) * weight;
                total += weight;
              }
            }

            return color / total;
          }

          void main() {
            // Cria um ponto circular com borda suave
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center);
            float alpha = smoothstep(0.5, 0.3, dist) * vOpacity * 0.8; // Reduzido para 80% da opacidade original

            // Garante que a cor seja visível e tenha um tom roxo mínimo
            vec3 minColor = vec3(0.46, 0.25, 0.75); // Tom roxo mínimo mais intenso (#7641C0)
            vec3 finalColor = max(vColor, minColor);

            // Adiciona um brilho mais intenso no centro com tom roxo
            vec3 centerGlow = vec3(0.7, 0.4, 0.9); // Roxo brilhante
            finalColor = mix(finalColor, centerGlow, 1.0 - dist * 2.0);

            // Aplica o efeito de blur
            vec4 blurredColor = blur(gl_PointCoord, 2.0);

            // Mistura a cor normal com o efeito de blur
            vec4 normalColor = vec4(finalColor, alpha);
            vec4 finalResult = mix(normalColor, blurredColor, 0.3); // 30% de efeito de blur

            // Aplica a cor e opacidade final
            gl_FragColor = finalResult;

            // Descarta fragmentos muito transparentes
            if (finalResult.a < 0.01) discard;
          }
        `}
        uniforms={{
          size: { value: 0.15 } // Aumentado ainda mais o tamanho das partículas para melhor visibilidade
        }}
      />
    </points>
  );
}

function BlackHoleCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (meshRef.current) {
      // Rotação ainda mais lenta para o core
      meshRef.current.rotation.z += 0.0008;

      // Atualiza o tempo do shader do core
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material && material.uniforms) {
        material.uniforms.time.value = time;
      }
    }
  });

  return (
    <group>
      {/* Horizonte de eventos principal */}
      <mesh ref={meshRef} renderOrder={10}> {/* Renderiza depois das partículas */}
        <sphereGeometry args={[1, 64, 64]} /> {/* Aumentei a resolução para mais detalhes */}
        <shaderMaterial
          transparent
          depthWrite={true} /* Escreve no buffer de profundidade */
          uniforms={{
            time: { value: 0 },
            color: { value: new THREE.Color("#000000") },
            opacity: { value: 1.0 }, // Opacidade total no centro
            glowColor1: { value: new THREE.Color("#6030A0") }, // Cor roxa escura (mesma das partículas)
            glowColor2: { value: new THREE.Color("#9461FF") }, // Cor roxa clara (mesma das partículas)
          }}
          vertexShader={`
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPosition;
            uniform float time;

            void main() {
              vUv = uv;
              vNormal = normalize(normalMatrix * normal);
              vPosition = position;

              // Distorção mais intensa e irregular na geometria
              float pulseFactor = sin(time * 0.7) * 0.5 + 0.5;
              float noiseFactor = sin(position.x * 5.0 + time) * sin(position.y * 4.0 - time * 0.5) * sin(position.z * 3.0 + time * 0.2);
              float distortion = (sin(time * 0.3 + position.x * 3.0) * 0.03 + noiseFactor * 0.02) * pulseFactor;
              vec3 pos = position + normal * distortion;

              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 color;
            uniform vec3 glowColor1;
            uniform vec3 glowColor2;
            uniform float opacity;
            uniform float time;
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPosition;

            // Função para criar efeito de blur
            vec4 blur(vec2 uv, float radius, float intensity) {
              vec4 blurredColor = vec4(0.0);
              float total = 0.0;

              // Amostragem em um padrão circular para criar o blur
              for (float angle = 0.0; angle < 6.28; angle += 0.4) {
                for (float r = 1.0; r <= radius; r += 1.0) {
                  vec2 offset = vec2(cos(angle), sin(angle)) * r * 0.01;
                  float weight = 1.0 / (r * r + 1.0);

                  // Amostra a cor em um ponto deslocado
                  vec2 sampleUv = uv + offset;
                  float sampleDist = length(sampleUv - vec2(0.5));
                  float sampleFactor = smoothstep(0.4, 0.0, sampleDist) * intensity;

                  blurredColor += vec4(vec3(0.0), sampleFactor) * weight;
                  total += weight;
                }
              }

              return blurredColor / total;
            }

            // Função para simular lente gravitacional baseada na física real
            // Implementação baseada na equação de deflexão da luz em um campo gravitacional
            vec2 gravitationalLensing(vec2 uv, float strength, float blackHoleRadius) {
              vec2 center = vec2(0.5, 0.5);
              vec2 toCenter = uv - center;
              float dist = length(toCenter);

              // Raio de Schwarzschild (horizonte de eventos)
              float rs = blackHoleRadius * 0.8;

              // Evita divisão por zero e limita a distorção máxima
              float safeDist = max(dist, rs * 1.05);

              // Fórmula de deflexão da luz baseada na Relatividade Geral
              // A deflexão é proporcional a 1/r, onde r é a distância ao centro
              float deflectionAngle = strength * rs / safeDist;

              // Quanto mais próximo do horizonte de eventos, mais forte é a distorção
              // Esta fórmula cria um efeito não-linear que se intensifica dramaticamente perto do horizonte
              float distortionFactor = 1.0 - exp(-rs / (safeDist - rs * 0.9));
              distortionFactor = pow(distortionFactor, 2.0) * 3.0;

              // Aplica a distorção em direção ao centro
              // O sinal negativo cria o efeito de "puxar" a luz para o centro
              vec2 deflection = normalize(toCenter) * deflectionAngle * distortionFactor * -1.0;

              // Adiciona um efeito de rotação para simular o arrasto do espaço-tempo (efeito Lense-Thirring)
              float rotationAngle = strength * rs / (safeDist * safeDist) * 0.5;
              vec2 tangent = vec2(-toCenter.y, toCenter.x) / safeDist;
              vec2 rotation = tangent * rotationAngle;

              // Combina os efeitos de deflexão radial e rotação
              return uv + deflection + rotation;
            }

            // Função para criar um anel de Einstein (efeito de lente gravitacional)
            float einsteinRing(float dist, float radius, float width) {
              return smoothstep(radius - width, radius, dist) *
                     smoothstep(radius + width, radius, dist);
            }

            void main() {
              vec2 center = vec2(0.5, 0.5);
              vec2 uv = vUv - center;
              float dist = length(uv);

              // Parâmetros do buraco negro
              float blackHoleRadius = 0.4;
              float photonSphereRadius = blackHoleRadius * 1.5; // Esfera de fótons
              float accretionInnerRadius = blackHoleRadius * 2.0;
              float distortionRadius = blackHoleRadius * 4.0; // Raio onde a distorção começa a ser visível

              // Efeito de lente gravitacional mais forte e realista
              float lensStrength = 0.5; // Aumentado para criar distorção mais visível

              // Aplica a distorção gravitacional
              vec2 lensedUv = vUv;

              // Aplica a distorção apenas fora do horizonte de eventos
              if (dist > blackHoleRadius * 0.9) {
                lensedUv = gravitationalLensing(vUv, lensStrength, blackHoleRadius);
              }

              // Cria o horizonte de eventos (região completamente preta)
              float eventHorizon = smoothstep(blackHoleRadius, blackHoleRadius - 0.05, dist);

              // Removido o efeito de anel brilhante
              float photonSphere = 0.0; // Sem anel de fótons

              // Cria um efeito de distorção do espaço-tempo ao redor do buraco negro
              // Distorção mais gradual e extensa
              float spacetimeDistortion = 1.0 - smoothstep(distortionRadius, blackHoleRadius, dist);

              // Adiciona um efeito de "dobra" do espaço-tempo
              // Simula como a luz de objetos distantes é distorcida ao redor do buraco negro
              vec2 distortedUv = mix(vUv, lensedUv, spacetimeDistortion);
              float distortionIntensity = length(distortedUv - vUv) * 5.0;

              // Removido o efeito de anel de distorção
              float distortionRing = 0.0;

              // Adiciona turbulência ao redor do horizonte de eventos
              // Turbulência mais complexa e realista
              float turbulence = 0.0;
              for (int i = 1; i <= 5; i++) { // Mais iterações para maior complexidade
                float freq = float(i) * 15.0;
                float speed = float(i) * 0.7;
                // Turbulência que varia com a distância
                float turbAmp = 0.1 / float(i) * smoothstep(blackHoleRadius * 3.0, blackHoleRadius, dist);
                turbulence += sin(dist * freq - time * speed) * turbAmp;
                // Adiciona variação angular para quebrar a simetria radial
                float angle = atan(uv.y, uv.x);
                turbulence += sin(angle * float(i) * 2.0 + time) * turbAmp * 0.5;
              }

              // Amostra uma textura virtual distorcida para simular a distorção da luz de fundo
              // Isso simula como veríamos objetos distantes através da distorção gravitacional
              vec2 backgroundUv = mix(vUv, lensedUv, smoothstep(blackHoleRadius, distortionRadius, dist));
              float backgroundPattern = sin(backgroundUv.x * 20.0) * sin(backgroundUv.y * 20.0) * 0.5 + 0.5;
              backgroundPattern = mix(0.0, backgroundPattern, smoothstep(blackHoleRadius * 1.1, blackHoleRadius * 1.5, dist));

              // Cores base para o buraco negro (sem anel)
              vec3 photonColor = vec3(0.0); // Sem cor para o anel

              // Sem efeito de distorção visível
              vec3 distortionColor = vec3(0.0);

              // Combina os efeitos
              vec3 finalColor = color; // Começa com preto

              // Adiciona o efeito de distorção visível
              finalColor = mix(finalColor, distortionColor, distortionRing * 0.7);

              // Adiciona o anel de fótons
              finalColor = mix(finalColor, photonColor, photonSphere);

              // Adiciona o padrão de fundo distorcido
              finalColor = mix(finalColor, photonColor * 0.5, backgroundPattern * 0.3);

              // Ajusta a opacidade
              float finalOpacity = opacity;

              // Aplica o efeito de blur na borda do buraco negro
              vec4 blurEffect = blur(vUv, 3.0, 0.5);

              // Região central do buraco negro - esfera 3D com sombreamento
              if (dist < blackHoleRadius * 0.8) {
                // Calcula a normal da esfera a partir das coordenadas UV
                // Isso cria um efeito de esfera 3D
                vec3 normal;
                normal.xy = uv.xy * 2.0;
                normal.z = sqrt(1.0 - min(1.0, dot(normal.xy, normal.xy)));

                // Direção da luz principal (ajuste para mudar a posição da luz)
                vec3 lightDir1 = normalize(vec3(0.5, 0.8, 1.0));

                // Direção da luz secundária (luz de preenchimento)
                vec3 lightDir2 = normalize(vec3(-0.3, -0.2, 0.8));

                // Calcula iluminação difusa para as duas luzes (reduzida significativamente)
                float diffuse1 = max(0.0, dot(normal, lightDir1)) * 0.25; // Luz principal mais fraca
                float diffuse2 = max(0.0, dot(normal, lightDir2)) * 0.1; // Luz secundária muito fraca
                float diffuse = diffuse1 + diffuse2;

                // Luz ambiente mínima para manter o efeito 3D sem clarear muito
                float ambient = 0.05;

                // Adiciona um brilho especular muito sutil para a luz principal
                vec3 reflectDir = reflect(-lightDir1, normal);
                vec3 viewDir = vec3(0.0, 0.0, 1.0);
                float spec = pow(max(dot(viewDir, reflectDir), 0.0), 128.0); // Brilho mais concentrado
                float specular = 0.15 * spec;

                // Adiciona um brilho especular mais suave para a luz secundária (muito reduzido)
                vec3 reflectDir2 = reflect(-lightDir2, normal);
                float spec2 = pow(max(dot(viewDir, reflectDir2), 0.0), 32.0); // Brilho mais difuso
                specular += 0.05 * spec2;

                // Cor base extremamente escura, quase preta, com um leve tom azulado
                vec3 baseColor = vec3(0.005, 0.005, 0.01);

                // Cor para as sombras - praticamente preta
                vec3 shadowColor = vec3(0.001, 0.001, 0.002);

                // Combina iluminação para criar efeito 3D muito sutil
                finalColor = mix(shadowColor, baseColor, ambient + diffuse) + vec3(specular);

                // Adiciona um gradiente muito sutil para aumentar a percepção de profundidade
                // Ligeiramente mais escuro no centro
                float depthGradient = smoothstep(0.0, blackHoleRadius * 0.8, dist) * 0.5;
                finalColor = mix(shadowColor, finalColor, 0.3 + depthGradient * 0.7);

                // Adiciona uma variação mais notável baseada no tempo
                float breathEffect = sin(time * 0.15) * 0.5 + 0.5;
                finalColor *= 0.9 + breathEffect * 0.1; // Aumentado para 10% de variação

                // Aplica o efeito de blur na borda do buraco negro
                float blurIntensity = smoothstep(0.0, blackHoleRadius * 0.8, dist) * 0.3;
                finalColor = mix(finalColor, finalColor * 0.7, blurIntensity);

                finalOpacity = 1.0; // Totalmente opaco
              } else {
                // Região de distorção (sem anel)
                // Apenas uma leve distorção do espaço-tempo
                finalOpacity = mix(finalOpacity, opacity * 0.5, spacetimeDistortion * 0.3);
                // Sem anel de fótons
                // Sem anel de distorção
                finalOpacity = max(finalOpacity, backgroundPattern * 0.1); // Padrão de fundo distorcido reduzido
              }

              // Aplica o efeito de blur na borda do horizonte de eventos
              float edgeBlur = smoothstep(blackHoleRadius * 0.7, blackHoleRadius * 0.9, dist) * 0.5;
              vec4 blurredEdge = vec4(finalColor * 0.8, finalOpacity * 0.9);

              // Mistura a cor normal com o efeito de blur na borda
              gl_FragColor = mix(vec4(finalColor, finalOpacity), blurredEdge, edgeBlur) + blurEffect * 0.1;
            }
          `}
        />
      </mesh>
    </group>
  );
}

function AccretionDisk() {
  // Componente vazio - anel removido
  return null;
}

interface PulseEffectProps {
  position?: [number, number, number];
}

function PulseEffect({ position = [0, 0, 0.1] }: PulseEffectProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = time;
    }
  });

  return (
    <mesh ref={meshRef} renderOrder={5} position={position}> {/* Usa a posição passada como prop */}
      <planeGeometry args={[30, 30]} /> {/* Plano maior para cobrir mais área */}
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          time: { value: 0 },
          color1: { value: new THREE.Color("#7641C0") }, // Roxo escuro
          color2: { value: new THREE.Color("#9461FF") }, // Roxo claro
        }}
        vertexShader={`
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec3 color1;
          uniform vec3 color2;
          varying vec2 vUv;

          void main() {
            // Calcula a distância ao centro
            vec2 center = vec2(0.5, 0.5);
            vec2 toCenter = vUv - center;
            float dist = length(toCenter);

            // Cria o efeito de pulso - como uma respiração suave
            float pulseSpeed = 0.2; // Velocidade ainda mais lenta para parecer respiração natural
            float pulseSize = 0.8 + sin(time * pulseSpeed) * 0.15; // Varia entre 0.65 e 0.95 (menos intenso)

            // Cria múltiplos anéis de pulso que se expandem (mais finos e sutis)
            float ring1 = smoothstep(0.005, 0.015, abs(dist - (0.05 * pulseSize)));
            float ring2 = smoothstep(0.005, 0.015, abs(dist - (0.1 * pulseSize)));
            float ring3 = smoothstep(0.005, 0.015, abs(dist - (0.15 * pulseSize)));
            float ring4 = smoothstep(0.005, 0.015, abs(dist - (0.2 * pulseSize)));
            float ring5 = smoothstep(0.005, 0.015, abs(dist - (0.25 * pulseSize)));
            float ring6 = smoothstep(0.005, 0.015, abs(dist - (0.3 * pulseSize)));
            float ring7 = smoothstep(0.005, 0.015, abs(dist - (0.35 * pulseSize)));
            float ring8 = smoothstep(0.005, 0.015, abs(dist - (0.4 * pulseSize)));
            float ring9 = smoothstep(0.005, 0.015, abs(dist - (0.45 * pulseSize)));
            float ring10 = smoothstep(0.005, 0.015, abs(dist - (0.5 * pulseSize)));

            // Combina os anéis com intensidades diferentes (decaimento gradual)
            float rings = ring1 * 0.9 + ring2 * 0.8 + ring3 * 0.7 + ring4 * 0.6 + ring5 * 0.5 +
                         ring6 * 0.4 + ring7 * 0.3 + ring8 * 0.2 + ring9 * 0.1 + ring10 * 0.05;
            rings = 1.0 - min(rings, 1.0); // Inverte para que os anéis sejam brilhantes

            // Adiciona variação de intensidade baseada no tempo
            float breathEffect = 0.3 + 0.7 * (0.5 + 0.5 * sin(time * pulseSpeed));

            // Gradiente de cor que varia com o tempo
            vec3 pulseColor = mix(color1, color2, 0.5 + 0.5 * sin(time * 0.2));

            // Opacidade que diminui com a distância
            float alpha = rings * breathEffect * smoothstep(0.8, 0.0, dist);

            // Torna o efeito mais visível no centro
            alpha *= 0.6; // Aumentado para um efeito mais visível
            // Concentra o efeito no centro
            alpha *= smoothstep(0.6, 0.0, dist);

            gl_FragColor = vec4(pulseColor, alpha);
          }
        `}
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
        overflow: 'hidden', // Evita scroll indesejado
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 20], // Afastei mais a câmera para uma melhor visualização
          fov: 70, // Ajustado o campo de visão para melhor enquadramento
          near: 0.1,
          far: 1000,
        }}
      >
        {/* Iluminação */}
        <ambientLight intensity={0.3} />
        <pointLight
          position={[0, 0, 0]}
          color="#7641C0"
          intensity={3} // Aumentei a intensidade
          distance={15}
          decay={2}
        />
        <pointLight
          position={[0, 0, 5]}
          color="#FF90FF"
          intensity={1}
          distance={10}
          decay={2}
        />
        {/* Luz adicional para iluminar a esfera do buraco negro - muito mais sutil */}
        <pointLight
          position={[5, 8, 10]}
          color="#FFFFFF"
          intensity={0.2} // Reduzida significativamente
          distance={20}
          decay={2}
        />
        {/* Luz de preenchimento do lado oposto - muito mais sutil */}
        <pointLight
          position={[-3, -2, 8]}
          color="#9461FF"
          intensity={0.1} // Reduzida significativamente
          distance={15}
          decay={2}
        />

        {/* Distorção do espaço ao fundo */}
        <SpaceDistortion />

        {/* Grupo principal com o buraco negro e seus elementos */}
        <group scale={[2.5, 2.5, 2.5]} position={[0, 0, 0]}>
          {/* Efeito de pulso roxo que emana do centro - agora dentro do grupo para ficar centralizado */}
          <PulseEffect position={[0, 0, 0.1]} /> {/* Posicionado mais alto na tela */}
          {/* Ordem de renderização: primeiro partículas, depois disco de acreção, por último o core */}
          <Particles />
          <AccretionDisk />
          <BlackHoleCore />
        </group>

        {/* Efeitos de pós-processamento */}
        <PostProcessing />
      </Canvas>
    </Box>
  );
}
