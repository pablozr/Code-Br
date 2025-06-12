#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function runCommand(command, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} concluído!`);
    return true;
  } catch (error) {
    console.error(`❌ Erro em ${description}:`, error.message);
    return false;
  }
}

async function checkGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    return status.trim().length === 0;
  } catch (error) {
    console.error('❌ Erro ao verificar status do Git:', error.message);
    return false;
  }
}

async function getCurrentBranch() {
  try {
    const branch = execSync('git branch --show-current', { encoding: 'utf8' });
    return branch.trim();
  } catch (error) {
    console.error('❌ Erro ao obter branch atual:', error.message);
    return 'main';
  }
}

async function deployToVercel() {
  console.log('🚀 Script de Deploy para Vercel\n');

  // Verificar se há mudanças não commitadas
  const isClean = await checkGitStatus();
  if (!isClean) {
    console.log('📝 Há mudanças não commitadas no repositório.');
    const shouldCommit = await question('Deseja fazer commit das mudanças? (y/n): ');
    
    if (shouldCommit.toLowerCase() === 'y') {
      const commitMessage = await question('Digite a mensagem do commit: ');
      
      if (!runCommand('git add .', 'Adicionando arquivos ao Git')) return;
      if (!runCommand(`git commit -m "${commitMessage}"`, 'Fazendo commit')) return;
    } else {
      console.log('❌ Deploy cancelado. Faça commit das mudanças primeiro.');
      return;
    }
  }

  // Verificar branch atual
  const currentBranch = await getCurrentBranch();
  console.log(`📍 Branch atual: ${currentBranch}`);

  // Escolher tipo de deploy
  const deployType = await question(`
Tipo de deploy:
1. Produção (push para main)
2. Preview (push para branch atual)
3. Apenas validar build local

Escolha (1/2/3): `);

  switch (deployType) {
    case '1':
      await deployProduction(currentBranch);
      break;
    case '2':
      await deployPreview(currentBranch);
      break;
    case '3':
      await validateBuild();
      break;
    default:
      console.log('❌ Opção inválida.');
  }

  rl.close();
}

async function deployProduction(currentBranch) {
  console.log('\n🎯 Deploy para Produção');
  
  if (currentBranch !== 'main') {
    console.log(`⚠️  Você está na branch '${currentBranch}', mas o deploy de produção é feito na 'main'.`);
    const shouldSwitch = await question('Deseja fazer merge para main? (y/n): ');
    
    if (shouldSwitch.toLowerCase() === 'y') {
      if (!runCommand('git checkout main', 'Mudando para branch main')) return;
      if (!runCommand(`git merge ${currentBranch}`, `Fazendo merge de ${currentBranch}`)) return;
    } else {
      console.log('❌ Deploy cancelado.');
      return;
    }
  }

  // Validar build local antes do push
  console.log('\n🔍 Validando build local antes do deploy...');
  if (!runCommand('npm run build', 'Build local')) {
    console.log('❌ Build local falhou. Corrija os erros antes do deploy.');
    return;
  }

  // Push para produção
  if (!runCommand('git push origin main', 'Push para produção')) return;

  console.log('\n🎉 Deploy para produção iniciado!');
  console.log('📊 Acompanhe o progresso em: https://vercel.com/dashboard');
  console.log('🌐 Seu site estará disponível em alguns minutos.');
}

async function deployPreview(currentBranch) {
  console.log('\n👀 Deploy de Preview');
  
  if (currentBranch === 'main') {
    console.log('⚠️  Você está na branch main. Preview deploys são para outras branches.');
    const newBranch = await question('Digite o nome da nova branch para preview: ');
    
    if (newBranch) {
      if (!runCommand(`git checkout -b ${newBranch}`, `Criando branch ${newBranch}`)) return;
      currentBranch = newBranch;
    } else {
      console.log('❌ Deploy cancelado.');
      return;
    }
  }

  // Validar build local
  if (!runCommand('npm run build', 'Build local')) {
    console.log('❌ Build local falhou. Corrija os erros antes do deploy.');
    return;
  }

  // Push para preview
  if (!runCommand(`git push origin ${currentBranch}`, 'Push para preview')) return;

  console.log('\n🎉 Deploy de preview iniciado!');
  console.log('📊 Acompanhe o progresso em: https://vercel.com/dashboard');
  console.log(`🌐 Preview estará disponível em: https://projeto-git-${currentBranch}-usuario.vercel.app`);
}

async function validateBuild() {
  console.log('\n🔍 Validando Build Local');
  
  if (!runCommand('npm run validate-env', 'Validação de ambiente')) return;
  if (!runCommand('npm run build', 'Build de produção')) return;

  console.log('\n✅ Build local validado com sucesso!');
  console.log('🚀 Você pode fazer deploy com segurança.');
}

// Executar apenas se for chamado diretamente
if (require.main === module) {
  deployToVercel().catch(console.error);
}

module.exports = { deployToVercel };
