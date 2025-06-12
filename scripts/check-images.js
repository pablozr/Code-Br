#!/usr/bin/env node

/**
 * Script para verificar se todas as imagens necessárias existem
 * Execute com: node scripts/check-images.js
 */

const fs = require('fs');
const path = require('path');

// Lista de imagens críticas que devem existir
const criticalImages = [
  'public/images/hero-bg.webp',
  'public/images/services-bg.webp',
  'public/android-chrome-192x192.png',
  'public/android-chrome-512x512.png',
  'public/images/portfolio/landingpage1.webp',
  'public/images/portfolio/ecommerce1.webp',
  'public/images/portfolio/institucional1.webp',
  'public/logo.svg',
];

// Lista de imagens opcionais
const optionalImages = [
  'public/favicon.ico',
  'public/apple-touch-icon.png',
  'public/favicon-32x32.png',
  'public/favicon-16x16.png',
];

console.log('🔍 Verificando imagens necessárias...\n');

let missingCritical = [];
let missingOptional = [];
let foundImages = [];

// Verificar imagens críticas
criticalImages.forEach(imagePath => {
  if (fs.existsSync(imagePath)) {
    const stats = fs.statSync(imagePath);
    foundImages.push({
      path: imagePath,
      size: stats.size,
      type: 'critical'
    });
    console.log(`✅ ${imagePath} (${(stats.size / 1024).toFixed(1)}KB)`);
  } else {
    missingCritical.push(imagePath);
    console.log(`❌ ${imagePath} - FALTANDO`);
  }
});

console.log('\n📋 Verificando imagens opcionais...\n');

// Verificar imagens opcionais
optionalImages.forEach(imagePath => {
  if (fs.existsSync(imagePath)) {
    const stats = fs.statSync(imagePath);
    foundImages.push({
      path: imagePath,
      size: stats.size,
      type: 'optional'
    });
    console.log(`✅ ${imagePath} (${(stats.size / 1024).toFixed(1)}KB)`);
  } else {
    missingOptional.push(imagePath);
    console.log(`⚠️  ${imagePath} - OPCIONAL, mas recomendado`);
  }
});

// Resumo
console.log('\n📊 RESUMO:\n');
console.log(`✅ Imagens encontradas: ${foundImages.length}`);
console.log(`❌ Imagens críticas faltando: ${missingCritical.length}`);
console.log(`⚠️  Imagens opcionais faltando: ${missingOptional.length}`);

if (missingCritical.length > 0) {
  console.log('\n🚨 AÇÃO NECESSÁRIA:');
  console.log('As seguintes imagens críticas estão faltando:');
  missingCritical.forEach(img => console.log(`   - ${img}`));
  console.log('\nConsulte public/images/README.md para instruções de como adicionar as imagens.');
  process.exit(1);
}

if (missingOptional.length > 0) {
  console.log('\n💡 RECOMENDAÇÃO:');
  console.log('Considere adicionar as seguintes imagens opcionais:');
  missingOptional.forEach(img => console.log(`   - ${img}`));
}

console.log('\n🎉 Todas as imagens críticas estão presentes!');
console.log('O projeto deve funcionar corretamente na Vercel.');
