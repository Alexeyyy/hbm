import { initialText } from "../logic/Congratulation";
import { useCallback, useEffect, useState } from 'react';
import useBirthdayState from '../store/store';

const BirthdayIntro = props => {
    let [introText, setIntroText] = useState('');
    let [introRowIndex, setIntroRowIndex] = useState(0);
    let [introCharIndex, setIntroCharIndex] = useState(0);

    const typeIntroText = useCallback(() => {
        if (introRowIndex >= initialText.length) {
            useBirthdayState.getState().setIntroFinished(true);
            setIntroText('');
            return;
        }

        const row = initialText[introRowIndex];
        if (introCharIndex == 0) {
            setIntroText(introText += '<p>');
            if (row.isCommand) {
                setIntroText(introText += '> ');
            }
        }
        
        if (!row.typed) {
            setIntroText(introText += row.text);
            setIntroCharIndex(0);
            setIntroRowIndex(introRowIndex + 1);
            setIntroText(introText += '</p>');
        } else {
            setIntroText(introText += row.text[introCharIndex]);

            if (introCharIndex < row.text.length - 1) {
                setIntroCharIndex(introCharIndex + 1);
            } else {
                setIntroCharIndex(0);
                setIntroRowIndex(introRowIndex + 1);
                setIntroText(introText += '</p>');                
            }
        }
    });

    useEffect(() => {
        const intervalId = setTimeout(typeIntroText, 100);
        return () => clearInterval(intervalId);
    }, [typeIntroText]);

    return <div {...props} dangerouslySetInnerHTML={{ __html: introText }}></div>;
};

export default BirthdayIntro;