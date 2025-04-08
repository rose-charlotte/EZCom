import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createContext, useReducer } from "react";

export const UserContext = createContext<FirebaseAuthTypes.User | undefined>(undefined);
