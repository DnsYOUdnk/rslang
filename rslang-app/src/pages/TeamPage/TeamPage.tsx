import cn from 'classnames';
import { TeamPerson } from '../../components/TeamPerson/TeamPerson';
import cl from './TeamPage.module.css';
import { TeamPageProps } from './TeamPage.props';

export const TeamPage = ({ className, ...props }: TeamPageProps): JSX.Element => {
  const arrayTeamPerson = [
    {
      title: 'Валентин',
      img: 'https://avatars.githubusercontent.com/u/79157063?v=4',
      link: 'https://github.com/ValentinBrest',
      about:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente adipisci soluta enim doloremque dicta voluptas sint consequatur labore nam quaerat id, debitis et delectus dolor optio fugit libero cum. Laboriosam.',
      done: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente adipisci soluta enim doloremque dicta voluptas sint consequatur labore nam quaerat id, debitis et delectus dolor optio fugit libero cum. Laboriosam.',
      id: 1,
      position: 'normal',
    },
    {
      title: 'Денис',
      img: 'https://avatars.githubusercontent.com/u/89945375?v=4',
      link: 'https://github.com/DnsYOUdnk',
      about:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente adipisci soluta enim doloremque dicta voluptas sint consequatur labore nam quaerat id, debitis et delectus dolor optio fugit libero cum. Laboriosam.',
      done: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente adipisci soluta enim doloremque dicta voluptas sint consequatur labore nam quaerat id, debitis et delectus dolor optio fugit libero cum. Laboriosam.',
      id: 2,
      position: 'reverse',
    },
    {
      title: 'Дмитрий',
      img: 'https://avatars.githubusercontent.com/u/86970087?v=4',
      link: 'https://github.com/KuzmakD',
      about:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente adipisci soluta enim doloremque dicta voluptas sint consequatur labore nam quaerat id, debitis et delectus dolor optio fugit libero cum. Laboriosam.',
      done: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente adipisci soluta enim doloremque dicta voluptas sint consequatur labore nam quaerat id, debitis et delectus dolor optio fugit libero cum. Laboriosam.',
      id: 3,
      position: 'normal',
    },
  ];
  return (
    <main className={cn(className, cl.main)}>
      <h2 className={cl.title}>
        <span>Наша команда</span>
      </h2>
      <div className={cl.wrapper}>
        {arrayTeamPerson.map((item) => (
          <TeamPerson
            title={item.title}
            img={item.img}
            link={item.link}
            key={item.id}
            position={item.position}
            done={item.done}
          >
            {item.about}
          </TeamPerson>
        ))}
      </div>
    </main>
  );
};
