import { useState, useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import '../../home/translations/i18n';
import { MainLayout } from '../../layout/components/MainLayout'
import { MyButton } from '../../shared/components/MyButton';
import { MyInput } from '../../shared/components/MyInput';
import { MyPicker } from '../../shared/components/MyPicker';
import { AuthContext } from '../../../context/auth';

const languageOptions = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' },
]

const SettingsScreen = () => {
    const [language, setLanguage] = useState('es')
    const { t, i18n } = useTranslation()
    const [name, setName] = useState({ value: '', errorMessage: '' })
    const [currentPassword, setCurrentPassword] = useState({ value: '', errorMessage: '' })
    const [newPassword, setNewPassword] = useState({ value: '', errorMessage: '' })
    const [confirmPassword, setConfirmPassword] = useState({ value: '', errorMessage: '' })

    const { logout } = useContext(AuthContext)

    const resetPasswordInputs = () => {
        setCurrentPassword({ value: '', errorMessage: '' })
        setNewPassword({ value: '', errorMessage: '' })
        setConfirmPassword({ value: '', errorMessage: '' })
    }

    const validationsPassword = () => {
        if (!currentPassword.value) {
            setCurrentPassword({ ...currentPassword, errorMessage: t('settings:errorMessage:requiredPassword') })
            return false
        } else {
            setCurrentPassword({ ...currentPassword, errorMessage: '' })
        }
        if (!newPassword.value) {
            setNewPassword({ ...newPassword, errorMessage: t('settings:errorMessage:requiredPassword') })
            return false
        } else if (newPassword.value.length < 8) {
            setNewPassword({ ...newPassword, errorMessage: t('settings:errorMessage:lengthPassword') })
            return false
        } else {
            setNewPassword({ ...newPassword, errorMessage: '' })
        }
        if (!confirmPassword.value) {
            setConfirmPassword({ ...confirmPassword, errorMessage: t('settings:errorMessage:requiredPassword') })
            return false
        } else if (confirmPassword.value !== newPassword.value) {
            setConfirmPassword({ ...confirmPassword, errorMessage: t('settings:errorMessage:passwordsNotMatch') })
            return false
        } else {
            setConfirmPassword({ ...confirmPassword, errorMessage: '' })
        }

        return true
    }

    const onChangeName = () => {
        if (!name.value) {
            setName({ ...name, errorMessage: t('settings:errorMessage:requiredName') })
            return
        }
        console.log({ name: name.value })
        setName({ value: '', errorMessage: '' })
    }

    const onChangePassword = () => {
        if (!validationsPassword()) return
        console.log({
            currentPassword: currentPassword.value,
            newPassword: newPassword.value,
            confirmPassword: confirmPassword.value,
        })
        resetPasswordInputs()
    }

    const onChangeLanguage = () => {
        i18n.changeLanguage(language);
    }

    const onSingOff = () => logout()

    return (
        <MainLayout>
            <Text style={styles.title}>{t('settings:title')}</Text>
            <View style={styles.settingsContainer} >
                <Text style={styles.subtitle}>{t('settings:subtitle1')}</Text>
                <MyInput
                    errorMessage={name.errorMessage}
                    placeholder={t('settings:placeholder:name')}
                    value={name.value}
                    onChangeText={(value) => setName({ ...name, value })} />
                <MyButton onPress={onChangeName} content={'Guardar'} />

                <MyInput
                    errorMessage={currentPassword.errorMessage}
                    placeholder={t('settings:placeholder:password')}
                    value={currentPassword.value}
                    onChangeText={(value) => setCurrentPassword({ ...currentPassword, value })} />
                <MyInput
                    errorMessage={newPassword.errorMessage}
                    placeholder={t('settings:placeholder:newPassword')}
                    value={newPassword.value}
                    onChangeText={(value) => setNewPassword({ ...newPassword, value })} />
                <MyInput
                    errorMessage={confirmPassword.errorMessage}
                    placeholder={t('settings:placeholder:confirmPassword')}
                    value={confirmPassword.value}
                    onChangeText={(value) => setConfirmPassword({ ...confirmPassword, value })} />
                <MyButton onPress={onChangePassword} content={'Guardar'} />

                <View style={styles.separator}></View>
                <Text style={styles.subtitle}>{t('settings:subtitle2')}</Text>
                <MyPicker
                    label={t('settings:selectLanguage')}
                    value={language}
                    onValueChange={setLanguage}
                    pickerItems={languageOptions} />

                <MyButton onPress={onChangeLanguage} content={t('settings:button:save')} />
                <MyButton onPress={onSingOff} content={t('settings:button:signOff')} />
            </View>
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 50,
    },
    settingsContainer: {
        marginVertical: 20,
        marginHorizontal: 30,
    },
    subtitle: {
        color: 'white',
        fontSize: 30,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '100%',
        backgroundColor: 'red',
    }
})

export default SettingsScreen