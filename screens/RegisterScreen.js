import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image,Alert } from 'react-native';
import auth from "@react-native-firebase/auth"

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [disableButton, setDisableButton] = useState(true);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError(text.includes('@') ? '' : 'Email phải chứa @');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(text.length >= 6 ? '' : 'Password phải có ít nhất 6 kí tự');
    setConfirmPasswordError(password1 === text ? '' : 'Password và Confirm Password không trùng khớp');
  };

  const handleConfirmPasswordChange = (text) => {
    setPassword1(text);
    setConfirmPasswordError(password === text ? '' : 'Password và Confirm Password không trùng khớp');
  };

  const handleRegister = () => {
    // Xử lý đăng ký ở đây
    if (!email.includes('@')) {
      Alert.alert('Lỗi', 'Email phải chứa @');
    } else if (password.length < 6) {
      Alert.alert('Lỗi', 'Password phải có ít nhất 6 kí tự');
    } else if (password !== password1) {
      Alert.alert('Lỗi', 'Password và Confirm Password không trùng khớp');
    } else {
      // Xử lý đăng ký khi dữ liệu hợp lệ
      auth().createUserWithEmailAndPassword(email,password)
      .then(()=>Alert.alert("Dang Ky Thanh Cong")
      ,navigation.navigate('Login')
      )
      .catch(e => Alert.alert(e.message))

      console.log('Username:', username);
      console.log('Password:', password);
      console.log('Email:', email);
    // Sau khi đăng ký thành công, có thể chuyển hướng đến màn hình Login
    //navigation.navigate('Login');
    }
    
  };
  //Ham dieu huong -> LoginScreen
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Image style={styles.logo}
        source={require('../assets/logo1.png')}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        //onChangeText={text => setEmail(text)}
        onChangeText={handleEmailChange}
      />
      <Text style={styles.error } >{emailError}</Text>

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        //onChangeText={text => setPassword(text)}
        onChangeText={handlePasswordChange}
      />
      <Text style={styles.error}>{passwordError}</Text>

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={password1}
        //onChangeText={text => setPassword1(text)}
        onChangeText={handleConfirmPasswordChange}
      />
      <Text style={styles.error}>{confirmPasswordError}</Text>

      <TouchableOpacity style={[styles.button, (emailError || passwordError || confirmPasswordError) && styles.disabledButton]} 
        onPress={handleRegister} disabled={!!emailError || !!passwordError || !!confirmPasswordError}>
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.registerLink} onPress={navigateToLogin}>
        <Text style={styles.registerText}>Already got an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo:{
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: 'lightgray',
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    color: '#007bff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize:12,
    width :300,
    height:20,
    marginTop: -20,
  },
});

export default RegisterScreen;