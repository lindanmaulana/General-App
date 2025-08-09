import {create} from "zustand"


type State = {
    isShow: boolean
}

type Action = {
    handleShow: () => void
}

export const useShow = create<State & Action>((set, get) => ({
    isShow: false,
    handleShow: () => set(() => ({isShow: !get().isShow}))
}))