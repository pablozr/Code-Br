// Estilos globais para os campos de formulário
export const formFieldStyles = {
  input: {
    backgroundColor: 'rgba(25, 25, 25, 0.6)',
    border: '1px solid rgba(118, 65, 192, 0.2)',
    color: 'white',
    '&:focus': {
      borderColor: 'rgba(153, 105, 229, 0.5)',
    },
  },
  label: {
    color: 'white',
    marginBottom: 8,
  },
  error: {
    color: '#ff6b6b',
    fontSize: '0.8rem',
    fontWeight: 500,
    marginTop: 5,
  },
  item: {
    '&[data-selected]': {
      backgroundColor: 'rgba(118, 65, 192, 0.2)',
    },
    '&[data-hovered]': {
      backgroundColor: 'rgba(118, 65, 192, 0.1)',
    },
  },
  dropdown: {
    backgroundColor: '#0A0A0A',
    border: '1px solid rgba(118, 65, 192, 0.2)',
  },
};
