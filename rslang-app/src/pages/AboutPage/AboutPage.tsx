import cn from 'classnames';
import { Description } from '../../components/Description/Description';
import cl from './AboutPage.module.css';
import { AboutPageProps } from './AboutPage.props';

export const AboutPage = ({ className, ...props }: AboutPageProps): JSX.Element => {
  return (
    <main className={cn(className, cl.main)}>
      <div className={cl.special}>
        <h2 className={cl.title}>
          <span>Особенности</span>
        </h2>
        <Description title={'Узнавай новое'} img={'/icons/knew.svg'}>
          В учебнике собраны 3600 самых используемых в повседневной жизни слов, есть его определение
          и пример как на русском так и на английском!.
        </Description>
        <Description title={'Повторяй'} img={'/icons/repeat.svg'}>
          Все слова которые ты изучил попадают в твой личный словарь. Ты можешь отметить сложные для
          тебя слова, чтобы знать, на что чаще обращать внимание!.
        </Description>
        <Description title={'Следи за прогрессом'} img={'/icons/progress.svg'}>
          В личном кабинете ты можешь следить за своим прогрессом: сколько слов ты уже выучил всего
          и за каждый день.
        </Description>
      </div>

      <div className={cl.games}>
        <h2 className={cl.title}>
          <span>Игры</span>
        </h2>
        <Description title={'Аудиовызов'} img={'/icons/audio.svg'}>
          Аудиовызов поможет тебе разить навыки аудирования и перевода, выбирай одно из 4 слов
          которые услышишь
        </Description>
        <Description title={'Спринт'} img={'/icons/sprint.svg'}>
          В Игре Спринт тебе надо указать правильный перевод слова или нет
        </Description>
      </div>
    </main>
  );
};
