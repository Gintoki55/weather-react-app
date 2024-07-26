import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  weather:{},
  isLoading:false,
};

export const fetchWeather = createAsyncThunk("weatherApi/fetchWeather", async ()=>{
    console.log("calling weather Api")
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=17.01&lon=54.12&appid=788ab6b590686b994498137d8d18dbc7")

    const number = Math.round(response.data.main.temp - 272.15);
    const min = Math.round(response.data.main.temp_min - 272.15);
    const max = Math.round(response.data.main.temp_max - 272.15);
    const icon = response.data.weather[0].icon;
    const UrlIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const description = response.data.weather[0].description;
    const name = response.data.name;
   
    return {number, description, name, min, max, icon:UrlIcon}
})
        
    


export const wheatherSlice = createSlice({
    name: "wheatherApi",
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
          .addCase(fetchWeather.pending, (state, action) => {
            state.isLoading = true;
            console.log("from Pending palce. " + state.isLoading)
          })
          .addCase(fetchWeather.fulfilled, (state, action) => {
            state.isLoading = false;
            state.weather = action.payload
            console.log("from FullFiled place. " + state.isLoading);
          })
          .addCase(fetchWeather.rejected, (state, action) => {
            state.isLoading = false;
          });
    }
})



export default wheatherSlice.reducer;