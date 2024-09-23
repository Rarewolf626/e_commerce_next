import { create } from "zustand";

type TProps = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
};

const useRegisterStore = create<TProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useRegisterStore;
