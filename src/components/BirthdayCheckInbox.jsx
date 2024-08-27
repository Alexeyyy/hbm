import { inboxTexts } from "../logic/Congratulation";
import { useCallback, useEffect, useState } from 'react';
import useBirthdayState from '../store/store';
import { shallow } from 'zustand/shallow';

const BirthdayCheckInbox = props => {
    let [inboxText, setInboxText] = useState('');
    let [inboxRowIndex, setInboxRowIndex] = useState(0);
    let [inboxCharIndex, setInboxCharIndex] = useState(0);

    const imageLoaded = useBirthdayState((state) => state.imageLoaded, shallow);

    const typeCheckInboxText = useCallback(() => {
        if (inboxRowIndex >= inboxTexts.length) {
            useBirthdayState.getState().setInboxChecked(true);
            setInboxText('');
            return;
        }

        const row = inboxTexts[inboxRowIndex];
        if (inboxCharIndex == 0) {
            setInboxText(inboxText += '<p>');
            if (row.isCommand) {
                setInboxText(inboxText += '> ');
            }
        }
        
        if (!row.typed) {
            setInboxText(inboxText += row.text);
            setInboxCharIndex(0);
            setInboxRowIndex(inboxRowIndex + 1);
            setInboxText(inboxText += '</p>');
        } else {
            setInboxText(inboxText += row.text[inboxCharIndex]);

            if (inboxCharIndex < row.text.length - 1) {
                setInboxCharIndex(inboxCharIndex + 1);
            } else {
                setInboxCharIndex(0);
                setInboxRowIndex(inboxRowIndex + 1);
                setInboxText(inboxText += '</p>');                
            }
        }
    });

    useEffect(() => {
        if (!imageLoaded) {
            return;
        }

        const intervalId = setTimeout(typeCheckInboxText, 100);
        return () => clearInterval(intervalId);
    }, [typeCheckInboxText, imageLoaded]);

    return <div {...props} dangerouslySetInnerHTML={{ __html: inboxText }}></div>;
};

export default BirthdayCheckInbox;

/*

const personalRights = usePersonalRights((state) => state.userRights, shallow);
* */