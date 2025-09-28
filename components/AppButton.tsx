import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface AppButtonProps {
    onPress?: () => void;
    children: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    icon?: keyof typeof Ionicons.glyphMap;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export default function AppButton({
    children,
    onPress = () => { },
    variant = 'primary',
    size = 'medium',
    disabled = false,
    icon,
    style,
    textStyle
}: AppButtonProps) {

    return (
        <TouchableOpacity
            style={[
                styles.button,
                size === 'small' && styles.buttonSmall,
                size === 'medium' && styles.buttonMedium,
                size === 'large' && styles.buttonLarge,
                variant === 'primary' && !disabled && styles.buttonPrimary,
                variant === 'secondary' && !disabled && styles.buttonSecondary,
                variant === 'outline' && !disabled && styles.buttonOutline,
                disabled && styles.buttonDisabled,
                style
            ]}
            onPress={onPress}
            activeOpacity={disabled ? 1 : 0.7}
            disabled={disabled}
        >
            {icon && (
                <Ionicons
                    name={icon}
                    size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
                    color={
                        disabled
                            ? '#9ca3af'
                            : variant === 'outline'
                                ? '#6366f1'
                                : '#fff'
                    }
                    style={styles.icon}
                />
            )}
            <Text style={[
                styles.text,
                size === 'small' && styles.textSmall,
                size === 'medium' && styles.textMedium,
                size === 'large' && styles.textLarge,
                variant === 'primary' && !disabled && styles.textPrimary,
                variant === 'secondary' && !disabled && styles.textSecondary,
                variant === 'outline' && !disabled && styles.textOutline,
                disabled && styles.textDisabled,
                textStyle
            ]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    buttonSmall: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    buttonMedium: {
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    buttonLarge: {
        paddingHorizontal: 32,
        paddingVertical: 20,
    },

    buttonPrimary: {
        backgroundColor: '#6366f1',
        shadowColor: '#6366f1',
    },
    buttonSecondary: {
        backgroundColor: '#64748b',
        shadowColor: '#64748b',
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '#6366f1',
        shadowOpacity: 0,
        elevation: 0,
    },

    buttonDisabled: {
        backgroundColor: '#e5e7eb',
        shadowOpacity: 0,
        elevation: 0,
        borderColor: '#e5e7eb',
    },

    text: {
        fontWeight: '600',
        textAlign: 'center',
    },

    textSmall: {
        fontSize: 14,
    },
    textMedium: {
        fontSize: 16,
    },
    textLarge: {
        fontSize: 18,
    },

    textPrimary: {
        color: '#fff',
    },
    textSecondary: {
        color: '#fff',
    },
    textOutline: {
        color: '#6366f1',
    },

    textDisabled: {
        color: '#9ca3af',
    },

    icon: {
        marginRight: 8,
    },
});