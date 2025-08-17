import { View, Text, KeyboardTypeOptions, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useTheme } from "@react-navigation/native";
import { windowHeight, windowWidth } from "@/themes/app.constant";
import color from '@/themes/app.colors';
import fonts from '@/themes/app.fonts';

interface InputProps {
    title: string;
    placeholder: string;
    keyBoardType?: KeyboardTypeOptions;
    value?: string;
    warning?: string;
    onChangeText?: (text: string) => void;
    showWarning?: boolean;
    emailFormatWarning?: string;
    disabled?: boolean;
}

export default function Input({ title, placeholder, keyBoardType, value, warning, onChangeText, showWarning, emailFormatWarning, disabled }: InputProps) {
    const { colors } = useTheme()
    return (

        <View>
            <Text style={[styles.title, { color: colors.text }]} >{title}</Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={color.secondaryFont}
                keyboardType={keyBoardType}
                value={value}
                aria-disabled={disabled}
                onChangeText={onChangeText}
            />
            {showWarning && <Text style={[styles.warning]}> {warning}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.medium,
        fontSize: windowWidth(20),
        marginVertical: windowHeight(8),
    },
    input: {
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 5,
        height: windowHeight(30),
        color: color.secondaryFont,
        paddingHorizontal: 10,
    },
    warning: {
        color: color.red,
        marginTop: 3,
    },
});