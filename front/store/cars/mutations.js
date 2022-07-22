export default {
    SET_CARS (state, cars) {
        state.cars = cars
    },

    UPDATE_PAGINATION(state, pagination) { 
        state.pagination = pagination
    },

    SELECT_CAR(state, car) { 
        if (car) {
            state.selectedCar = car
            state.selectedCar.color_id = state.selectedCar.color.id 
            state.selectedCar.bannerPreview = state.selectedCar.banner
            state.selectedCar.banner = null
            
            return
        }

        state.selectedCar = null
    }
}