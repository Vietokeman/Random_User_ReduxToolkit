import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, ApiResponse } from "../utils/Types";
import { get } from "../utils/request";

interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  genderFilter: string;
  roleFilter: string;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
  genderFilter: "",
  roleFilter: "",
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({
    page,
    role,
    gender,
  }: {
    page: number;
    role?: string;
    gender?: string;
  }) => {
    const roleParam = role ? `&role=${role}` : "";
    const queury = gender
      ? `?gender=${gender}`
      : `?page=${page}&results=10${roleParam}`;
    const response: ApiResponse = await get(`${queury}`);
    console.log(response.results);

    return response.results;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setRoleFilter: (state, action) => {
      state.roleFilter = action.payload;
    },
    setGenderFilter: (state, action) => {
      state.genderFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const { setRoleFilter, setGenderFilter } = usersSlice.actions;
export default usersSlice.reducer;
