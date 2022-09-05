import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Word, UserData } from '../../../common/types';
import WordCard from '../../../components/WordCard/WordCard';
import TextBookPageNav from './TextBookPageNav/TextBookPageNav';
import { getWords, getWordsRequest } from '../../../utils/Api';
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
    userData: UserData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  };
  gamesButtonsState: {
    disabledGameButtons: boolean;
    setDisabledGameButtons: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export default function TextBookPage({ group, page, authorization, gamesButtonsState }: Props) {
  // Router & URL --------------
  const pageUrlParams = useParams();
  const { groupId, pageId } = pageUrlParams;

  if (groupId) group.setActiveGroup(groupId);
  if (pageId) page.setActivePage(+pageId);

  // Words --------------
  const [words, setWords] = useState<Word[]>([]);
  const [wordChanged, setWordChanged] = useState(false);

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      const wordsData = await getWords({group: 1, page: 4});
      if (!cleanupFunction && wordsData && !(wordsData instanceof Error)) setWords(wordsData);
    })();
    return () => {
      cleanupFunction = true;
    };
  }, []);

  // Audio --------------
  const [audiotrack, setAudiotrack] = useState<HTMLAudioElement | null>(null);

  console.log(words);

  return (
    <div className={cn(cl.textbookPage, cl.levelA2)}>
      <TextBookPageNav group={group} page={page} />
      <div className={cl.difficultWordsWrap}>
        {(
          words.map((word: Word) => {
            return (
              <WordCard
                info={word}
                audio={{ audiotrack, setAudiotrack }}
                key={word.id || word._id}
                authorization={authorization}
                wordState={{ wordChanged, setWordChanged }}
              />
            );
          })
        )}
      </div>
      <TextBookPageNav group={group} page={page} />
    </div>
  );
}

