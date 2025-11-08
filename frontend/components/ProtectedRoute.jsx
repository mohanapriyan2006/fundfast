import { ActivityIndicator, View } from "react-native"
import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import { useNavigation } from "@react-navigation/native"
import { primary } from "../theme/colors"

const ProtectedRoute = ({ children }) => {
    const { userDetails, loading } = useContext(AuthContext)
    const navigation = useNavigation()

    useEffect(() => {
        if (!loading && !userDetails) {
            navigation.reset({ index: 0, routes: [{ name: "login" }] })
        }
    }, [loading, userDetails, navigation])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={primary.light} />
            </View>
        )
    }

    if (!userDetails) {
        return null
    }
    return children
}

export const withAuth = (ScreenComponent) =>
    function AuthWrapped(props) {
        return (
            <ProtectedRoute>
                <ScreenComponent {...props} />
            </ProtectedRoute>
        )
    }

export default ProtectedRoute