import { StyleSheet, Text, View ,KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import React ,{useState} from 'react'
import { TextInput } from 'react-native';
import { auth } from 'dictionary-e7247.firebaseapp.com';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    auth.createUserWithEmailAndPassword(email,password)
    then(userCredentials =>{
      const user = userCredentials.user;
      console.log('Kullanıcı',user.email)
    })
    .catch(error => (error.message))
  }
  return (
    //KeyboardAvoidingView sayesinde klavye açılınca yazı  yazılan alan da yukarı çıkar klavye ekranı kapatmamış olur.
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={text => setEmail(text)}/>
        <TextInput style={styles.input} 
        placeholder='Şifre' secureTextEntry 
        value={password}
        onChangeText={text => setPassword(text)}/>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp} style={[styles.button,styles.outlineButton]}>
          <Text style={styles.outlineButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'black',
  },
  inputContainer:{
    width:'80%'
  },
  input:{
    backgroundColor:'white',
    paddingHorizontal:'15',
    paddingVertical:'10',
    marginTop:15,
    borderRadius:5,
    padding:5,
  },
  buttonContainer:{
    width:'50%',
    marginTop:30,
  },
  button:{
    backgroundColor:'#0782F9',
    marginTop:15,
    borderRadius:5,
    padding:5,
    alignItems:'center',
  },
  buttonText:{
    color:'white',
    fontSize:16,//yazı tipi boyutu
    //fontWeight: 700,
    //fontWeight: 70,
  },
  outlineButton:{
    backgroundColor:'green',
  },
  outlineButtonText:{
    fontSize:16,
    color:'white',
  },

});