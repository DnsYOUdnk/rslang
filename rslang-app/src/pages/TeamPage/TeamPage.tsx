import cn from 'classnames';
import { Description } from '../../components/Description/Description';
import { TeamPerson } from '../../components/TeamPerson/TeamPerson';
import cl from './TeamPage.module.css';
import { TeamPageProps } from './TeamPage.props';

export const TeamPage = ({ className, ...props }: TeamPageProps): JSX.Element => {
  return (
    <main className={cn(className, cl.main)}>
      <h2 className={cl.title}>
        <span>Наша команда</span>
      </h2>
      <div className={cl.wrapper}>
        <TeamPerson
          title={'Валентин'}
          img={'https://avatars.githubusercontent.com/u/79157063?v=4'}
          link={'https://github.com/ValentinBrest'}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente adipisci soluta enim
          doloremque dicta voluptas sint consequatur labore nam quaerat id, debitis et delectus
          dolor optio fugit libero cum. Laboriosam.
        </TeamPerson>
        <TeamPerson
          title={'Денис'}
          img={'https://avatars.githubusercontent.com/u/89945375?v=4'}
          link={'https://github.com/DnsYOUdnk'}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente adipisci soluta enim
          doloremque dicta voluptas sint consequatur labore nam quaerat id, debitis et delectus
          dolor optio fugit libero cum. Laboriosam.
        </TeamPerson>
        <TeamPerson
          title={'Дмитрий'}
          img={'https://avatars.githubusercontent.com/u/86970087?v=4'}
          link={'https://github.com/KuzmakD'}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente adipisci soluta enim
          doloremque dicta voluptas sint consequatur labore nam quaerat id, debitis et delectus
          dolor optio fugit libero cum. Laboriosam.
        </TeamPerson>
      </div>
    </main>
  );
};
