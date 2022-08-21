import cn from 'classnames';
import { Description } from '../../components/Description/Description';
import cl from './AboutPage.module.css';
import { AboutPageProps } from './AboutPage.props';

export const AboutPage = ({ className, ...props }: AboutPageProps): JSX.Element => {
  const special = [
    {
      title: 'Узнавай новое',
      img: '/icons/knew.svg',
      text: 'В учебнике собраны 3600 самых используемых в повседневной жизни слов, есть его определение и пример как на русском так и на английском!.',
      id: 1,
    },
    {
      title: 'Повторяй',
      img: '/icons/repeat.svg',
      text: 'Все слова которые ты изучил попадают в твой личный словарь. Ты можешь отметить сложные для тебя слова, чтобы знать, на что чаще обращать внимание!.',
      id: 2,
    },
    {
      title: 'Следи за прогрессом',
      img: '/icons/progress.svg',
      text: 'В личном кабинете ты можешь следить за своим прогрессом: сколько слов ты уже выучил всего и за каждый день.',
      id: 3,
    },
  ];
  const games = [
    {
      title: 'Аудиовызов',
      img: '/icons/audio.svg',
      text: 'Аудиовызов поможет тебе разить навыки аудирования и перевода, выбирай одно из 4 слов которые услышишь',
      id: 1,
    },
    {
      title: 'Спринт',
      img: '/icons/sprint.svg',
      text: 'В Игре Спринт тебе надо указать правильный перевод слова или нет',
      id: 2,
    },
  ];
  return (
    <main className={cn(className, cl.main)}>
      <div className={cl.special}>
        <h2 className={cl.title}>
          <span>Особенности</span>
        </h2>
        {special.map((item) => (
          <Description title={item.title} img={item.img} key={item.id}>
            {item.text}
          </Description>
        ))}
      </div>

      <div className={cl.games}>
        <h2 className={cl.title}>
          <span>Игры</span>
        </h2>
        {games.map((item) => (
          <Description title={item.title} img={item.img} key={item.id}>
            {item.text}
          </Description>
        ))}
      </div>
    </main>
  );
};
