import { useCallback, useEffect, useState } from 'react';
import { congratulationText } from '../logic/Congratulation';
import useBirthdayState from '../store/store';
import { shallow } from 'zustand/shallow';

const BirthdayCongratulation = props => {
    let [textCongratulation, setCongratulationText] = useState('');
    let [rowCongratulationIndex, setCongratulationRowIndex] = useState(0);
    let [charCongratulationIndex, setCongratulationCharIndex] = useState(0);
    const inboxChecked = useBirthdayState((state) => state.inboxChecked, shallow);

    const typeText = useCallback(() => {
        if (rowCongratulationIndex >= congratulationText.length) {
            return;
        }

        const row = congratulationText[rowCongratulationIndex];
        if (charCongratulationIndex == 0) {
            setCongratulationText(textCongratulation += '<p>');
            if (row.isCommand) {
                setCongratulationText(textCongratulation += '> ');
            }
        }
        
        if (!row.typed) {
            setCongratulationText(textCongratulation += row.text);
            setCongratulationCharIndex(0);
            setCongratulationRowIndex(rowCongratulationIndex + 1);
            setCongratulationText(textCongratulation += '</p>');
        } else {
            setCongratulationText(textCongratulation += row.text[charCongratulationIndex]);

            if (charCongratulationIndex < row.text.length - 1) {
                setCongratulationCharIndex(charCongratulationIndex + 1);
            } else {
                setCongratulationCharIndex(0);
                setCongratulationRowIndex(rowCongratulationIndex + 1);
                setCongratulationText(textCongratulation += '</p>');                
            }
        }
    });

    useEffect(() => {
        if (!inboxChecked) {
            return;
        }

        const intervalId = setTimeout(typeText, 120);
        return () => clearInterval(intervalId);
    }, [typeText, inboxChecked]);

    return <div {...props} dangerouslySetInnerHTML={{ __html: textCongratulation }}></div>;
}

export default BirthdayCongratulation;