const customSelectStyles = {
  control: (base, { isFocused }) => ({
    ...base,
    display: 'flex',
    width: '221px',
    height: '48px',
    borderRadius: '14px',
    border: '1px solid transparent',
    borderColor: isFocused ? 'var(--theme-color-light)' : 'transparent',
    '&:hover': {
      borderColor: 'var(--theme-color-light)',
    },
    boxShadow: 'none',
    cursor: 'pointer',
  }),
  placeholder: base => ({
    ...base,
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '1.11',
    color: 'var(--main-text)',
  }),
  menu: base => ({
    ...base,
    padding: '5px 18px',
    boxShadow: 'none',
    borderRadius: '12px',
    backgroundColor: 'var(--background-white)',
  }),
  menuList: base => ({
    ...base,
    maxHeight: '160px',
    overflowY: 'auto',
    overflowX: 'hidden',

    '&::-webkit-scrollbar': {
      width: '5px',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--gray-select)',
      borderRadius: '10px',
    },
  }),
  option: (base, { isSelected }) => ({
    ...base,
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '1.11',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    padding: '4px 0',
    textOverflow: 'ellipsis',
    color: isSelected ? 'var(--main-text)' : 'var(--gray-select)',
    backgroundColor: isSelected ? 'transparent' : 'transparent',
    '&:hover': {
      color: 'var(--main-text)',
      backgroundColor: 'transparent',
    },
  }),
  indicatorSeparator: base => ({
    ...base,
    display: 'none',
  }),
  singleValue: base => ({
    ...base,
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '1.11',
    color: 'var(--main-text)',
  }),
};

export default customSelectStyles;