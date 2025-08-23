import Select from 'react-select';

import DropdownIndicator from './DropdownIndicator/DropdownIndicator';
import customSelectStyles from './customSelectStyles';
import s from './FilterBar.module.css';

const FilterBar = ({
  filters,
  onChange,
  languageOptions,
  levelOptions,
  priceOptions,
}) => {
  const handleSelectChange = (selectedOption, { name }) => {
    onChange(prev => ({
      ...prev,
      [name]: selectedOption?.value || '',
    }));
  };

  return (
    <section className={s.filterBar}>
      <div className={s.filterContainer}>
        <div className={s.selectWrap}>
          <label htmlFor="language" className={s.label}>
            Language
          </label>
          <Select
            inputId="language"
            name="language"
            placeholder="Language"
            options={languageOptions}
            value={
              filters.language
                ? { value: filters.language, label: filters.language }
                : null
            }
            onChange={handleSelectChange}
            styles={customSelectStyles}
            className={s.input}
            components={{ DropdownIndicator }}
            isClearable
          />
        </div>

        <div className={s.selectWrap}>
          <label htmlFor="level" className={s.label}>
            Level of knowledge
          </label>
          <Select
            inputId="level"
            name="level"
            placeholder="Level"
            options={levelOptions}
            value={
              filters.level
                ? { value: filters.level, label: filters.level }
                : null
            }
            onChange={handleSelectChange}
            styles={customSelectStyles}
            className={s.input}
            components={{ DropdownIndicator }}
            isClearable
          />
        </div>

        <div className={s.selectWrap}>
          <label htmlFor="price" className={s.label}>
            Price
          </label>
          <Select
            inputId="price"
            name="price"
            placeholder="Price"
            options={priceOptions}
            value={
              filters.price
                ? {
                    value: filters.price,
                    label: `${filters.price}$`,
                  }
                : null
            }
            onChange={handleSelectChange}
            styles={customSelectStyles}
            className={s.input}
            components={{ DropdownIndicator }}
            isClearable
          />
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
