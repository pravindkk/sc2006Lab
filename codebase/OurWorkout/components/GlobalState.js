import { createGlobalState } from "react-hooks-global-state";


const initialState = {
    loggedIn: false,
}

export const { useGlobalState } = createGlobalState(initialState);