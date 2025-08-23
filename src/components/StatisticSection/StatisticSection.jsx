import { useEffect, useState } from 'react';

import { useTheme } from '../ThemeContext/ThemeContext';

import s from './StatisticSection.module.css';

const stats = [
  { number: 32000, label: 'Experienced tutors' },
  { number: 300000, label: '5-star tutor reviews' },
  { number: 120, label: 'Subjects taught' },
  { number: 200, label: 'Tutor nationalities' },
];

const StatisticSection = () => {
  const [svgUrl, setSvgUrl] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const themeColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--theme-color')
      .trim();

    const svg = `<svg xmlns='http://www.w3.org/2000/svg'><rect x='0' y='0' width='100%' height='100%' rx='30' ry='30' fill='none' stroke='${themeColor}' stroke-width='3' stroke-dasharray='15,15'/></svg>`;

    const encoded = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    setSvgUrl(encoded);
  }, [theme]);

  return (
    <section className={s.statistic}>
      {svgUrl && (
        <div
          className={s.dashedBorder}
          style={{ backgroundImage: `url("${svgUrl}")` }}
        />
      )}

      <ul className={s.list}>
        {stats.map(item => (
          <li key={item.label} className={s.item}>
            <p className={s.number}>{item.number.toLocaleString('en-US')} +</p>
            <p className={s.label}>{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StatisticSection;
