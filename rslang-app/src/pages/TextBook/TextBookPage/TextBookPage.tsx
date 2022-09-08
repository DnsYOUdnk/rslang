import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Word, User } from '../../../types/types';
import WordCard from '../../../components/WordCard/WordCard';
import TextBookPageNav from './TextBookPageNav/TextBookPageNav';
import { getWords, getUserAggregatedWords } from '../../../utils/api';
import cl from './TextBookPage.module.css';
import cn from 'classnames';

type Props = {
  group: {
    activeGroup: string;
    setActiveGroup: React.Dispatch<React.SetStateAction<string>>;
  };
  page: {
    activePage: number;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
  };
  authorization: {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
  };
  gamesButtonsState: {
    disabledGameButtons: boolean;
    setDisabledGameButtons: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export default function TextBookPage({ group, page, authorization, gamesButtonsState }: Props) {

  const pageUrlParams = useParams();
  const { groupId, pageId } = pageUrlParams;

  if (groupId) group.setActiveGroup(groupId);
  if (pageId) page.setActivePage(+pageId);

  useEffect(() => {
    if (groupId) group.setActiveGroup(groupId);
    if (pageId) page.setActivePage(+pageId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageUrlParams]);

  // Words --------------
  const [words, setWords] = useState<Word[]>([]);
  const [wordChanged, setWordChanged] = useState(false);
  const groupsValue: { [key: string]: number } = {
    A1: 0,
    A2: 1,
    B1: 2,
    B2: 3,
    C1: 4,
    C2: 5,
  };

  const getWordsData = () => {
    if (group.activeGroup && group.activeGroup !== 'difficultWords' && !authorization.user) {
      const params = { group: groupsValue[group.activeGroup], page: page.activePage - 1 }; 
      return getWords(params);
    }
    
    if (group.activeGroup && group.activeGroup !== 'difficultWords' && authorization.user) {
      const params = { wordsPerPage: 20, group: groupsValue[group.activeGroup], page: page.activePage - 1 };
      return getUserAggregatedWords(authorization.user.userId, authorization.user.token, params);
    }
    if (group.activeGroup && group.activeGroup === 'difficultWords' && authorization.user) {
      const params = { wordsPerPage: 3600, filter: { 'userWord.difficulty': 'hard' } };
      return getUserAggregatedWords(authorization.user.userId, authorization.user.token, params);
    }
    return null;
  };
  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      const wordsData = await getWordsData();
      if (!cleanupFunction && wordsData && !(wordsData instanceof Error)) setWords(wordsData);
    })();
    return () => {
      cleanupFunction = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  // Audio --------------
  const [audiotrack, setAudiotrack] = useState<HTMLAudioElement | null>(null);


  return (
    <div className={cn(cl.textbookPage)}>
      {group.activeGroup === 'difficultWords' ? '' : <TextBookPageNav group={group} page={page} />}
      
      <div className={cl.difficultWordsWrap}>
        {words.map((word: Word) => {
          return (
            <WordCard
              info={word}
              audio={{ audiotrack, setAudiotrack }}
              key={word.id || word._id}
              authorization={authorization}
              wordState={{ wordChanged, setWordChanged }}
            />
          );
        })}
      </div>

      {group.activeGroup === 'difficultWords' ? '' : <TextBookPageNav group={group} page={page} />}

    </div>
  );
}
