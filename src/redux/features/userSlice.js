import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
  user: {
    name: "",
    email: "",
    image: null,
    isLoading: true,
    isError: false,
    error: "",
  },
  token: {
    token: ''
  }
};

export const createUser = createAsyncThunk(
  "userSlice/createUser",
  async ({ email, password, name, image }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    // console.log(data);
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
    console.log(data.user.displayName);
    return {
      email: data.user.email,
      name: data.user.displayName,
    };
  }
);

export const createSignin = createAsyncThunk(
  "userSlice/createSignin",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return {
      email: data.user.email,
      name: data.user.displayName || "",
    };
  }
);


const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setToken: (state, {payload}) => {
      state.token.token = payload.token
    },
    setUser: (state, { payload }) => {
      state.user.name = payload.name;
      state.user.email = payload.email;
      state.user.image = payload.image
    },
    setLoading: (state, { payload }) => {
      state.user.isLoading = payload;
    },
    setLogout: (state) => {
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.user.isLoading = true;
        state.user.isError = false;
        state.user.error = "";
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.user.email = payload.email;
        state.user.name = payload.name;
        state.user.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user.isError = true;
        state.user.error = action.error.message || "Failed to create user";
        state.user.isLoading = false;
      })
      // Handling createSignin cases
      .addCase(createSignin.pending, (state) => {
        state.user.isLoading = true;
        state.user.isError = false;
        state.user.error = "";
      })
      .addCase(createSignin.fulfilled, (state, { payload }) => {
        state.user.email = payload.email;
        state.user.name = payload.name;
        state.user.isLoading = false;
      })
      .addCase(createSignin.rejected, (state, action) => {
        state.user.isError = true;
        state.user.error = action.error.message || "Failed to sign in";
        state.user.isLoading = false;
      });
  },
});

export const { setUser, setLoading, setLogout,setToken } = userSlice.actions;

export default userSlice.reducer;
