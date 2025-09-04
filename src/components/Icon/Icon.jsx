const Icon = ({ name, className }) => (
  <svg className={className}>
    <use href={`/icons.svg#${name}`} />
  </svg>
);

export default Icon;
