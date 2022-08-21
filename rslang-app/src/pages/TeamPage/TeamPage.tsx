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
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente adipisci soluta enim doloremque dicta voluptas sint consequatur labore nam quaerat id, debitis et delectus dolor optio fugit libero cum. Laboriosam.',
      id: 1,
    },
    {
      title: 'Денис',
      img: 'https://avatars.githubusercontent.com/u/89945375?v=4',
      link: 'https://github.com/DnsYOUdnk',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente adipisci soluta enim doloremque dicta voluptas sint consequatur labore nam quaerat id, debitis et delectus dolor optio fugit libero cum. Laboriosam.',
      id: 2,
    },
    {
      title: 'Дмитрий',
      img: 'https://avatars.githubusercontent.com/u/86970087?v=4',
      link: 'https://github.com/KuzmakD',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente adipisci soluta enim doloremque dicta voluptas sint consequatur labore nam quaerat id, debitis et delectus dolor optio fugit libero cum. Laboriosam.',
      id: 3,
    },
  ];
  return (
    <main className={cn(className, cl.main)}>
      <h2 className={cl.title}>
        <span>Наша команда</span>
      </h2>
      <div className={cl.wrapper}>
        {arrayTeamPerson.map((item) => (
          <TeamPerson title={item.title} img={item.img} link={item.link} key={item.id}>
            {item.text}
          </TeamPerson>
        ))}
      </div>
    </main>
  );
};
