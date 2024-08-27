import { create } from "zustand";

interface BirthdayState {
    introFinished: boolean,
    setIntroFinished: (value: boolean) => void,

    imageLoaded: boolean,
    setImageLoaded: (value: boolean) => void,
    
    inboxChecked: boolean,
    setInboxChecked: (value: boolean) => void,
}

const useBirthdayState = create<BirthdayState>()((set, get) => ({
    introFinished: false,
    setIntroFinished(value) {
        set({ introFinished: value })
    },
    
    imageLoaded: false,
    setImageLoaded(value) {
        set({ imageLoaded: value });
    },
    
    inboxChecked: false,
    setInboxChecked(value) {
        set({ inboxChecked: value });
    },
}));

export default useBirthdayState;