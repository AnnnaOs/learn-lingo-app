import { components } from 'react-select';

import Icon from '../../Icon/Icon';
import s from './DropdownIndicator.module.css';

const DropdownIndicator = props => {
  const { menuIsOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <Icon name={menuIsOpen ? 'arrow-up' : 'arrow-down'} className={s.icon} />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
