import { NavigationContainer } from "@react-navigation/native"
import { StyleSheet } from "react-native"
import Route from "./screens/Routes/Route"


const App = () => {

    return (
        <NavigationContainer>
            <Route />
        </NavigationContainer>

    )
}

export default App

const styles = StyleSheet.create({})
