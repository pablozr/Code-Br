import { MantineTheme } from '@mantine/core';

// Estilos globais para os campos de formulário
export const formFieldStyles = {
  root: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
    borderColor: 'rgba(153, 105, 229, 0.3)',
    color: 'white',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    '&:focus': {
      borderColor: 'rgba(153, 105, 229, 0.8)',
      backgroundColor: 'rgba(40, 40, 40, 0.6)',
    },
    '&:hover': {
      borderColor: 'rgba(153, 105, 229, 0.5)',
      backgroundColor: 'rgba(35, 35, 35, 0.6)',
    },
    '&[data-invalid="true"]': {
      borderColor: '#ff6b6b !important',
      color: 'white',
      '&:focus': {
        borderColor: '#ff6b6b !important',
      },
    },
  },
  label: {
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: 500,
    marginBottom: 5,
  },
  section: {
    color: 'rgba(153, 105, 229, 0.8)',
  },
  error: {
    color: '#ff6b6b',
    fontSize: '0.8rem',
    fontWeight: 500,
    marginTop: 5,
    animation: 'fadeIn 0.3s ease',
    display: 'block', // Garantir que o erro seja sempre exibido
  },
  description: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  item: {
    color: 'white',
    '&[data-selected]': {
      backgroundColor: 'rgba(118, 65, 192, 0.3)',
      color: 'white',
    },
    '&[data-hovered]': {
      backgroundColor: 'rgba(118, 65, 192, 0.2)',
    },
  },
  dropdown: {
    backgroundColor: 'rgba(25, 25, 25, 0.95)',
    borderColor: 'rgba(153, 105, 229, 0.3)',
    backdropFilter: 'blur(10px)',
  },
};

// Estilos para o botão de envio
export const submitButtonStyles = {
  root: {
    background: 'linear-gradient(135deg, rgba(118,65,192,0.9), rgba(153,105,229,0.9))',
    boxShadow: '0 10px 20px rgba(118,65,192,0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 15px 25px rgba(118,65,192,0.4)',
    },
    '&:active': {
      transform: 'translateY(1px)',
    },
  },
};

// Estilos para o checkbox
export const checkboxStyles = {
  label: {
    color: 'white',
    fontSize: '0.9rem',
  },
  input: {
    cursor: 'pointer',
    borderColor: 'rgba(153, 105, 229, 0.5)',
  },
  icon: {
    color: 'rgba(153, 105, 229, 1)',
  },
};

// Estilos para o divider
export const dividerStyles = (theme: MantineTheme) => ({
  label: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: 500,
    padding: '0 15px',
    backgroundColor: 'transparent',
  },
  root: {
    borderColor: 'rgba(153, 105, 229, 0.3)',
  },
});

// Animações para os componentes
export const animations = `
@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  20%, 100% {
    transform: translateX(100%);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;
