import { StyleSheet } from "react-native"
import { theme } from "../theme"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.base.gray600,
    },
    title: {
        color: theme.colors.base.gray100,
        fontFamily: theme.font_family.bold,
        fontSize: theme.font_size.lg,
    }

}
)