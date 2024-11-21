import React, { useState } from 'react';
import './App.css'; 
import { getData, storeData } from '../storage';
import { useRouter, useFocusEffect } from 'expo-router';

interface FormData {
  email: string;
  passworld: string;
}

export default function Login() {
  
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    passworld: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
        const response = await fetch("http://localhost:3000/signin", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        }) 
        console.log(response)

        const responseData = await response.json();
        if (response.ok) {
        await storeData(responseData.user.token)
        console.log(await getData())

        router.replace('/home');
        }

    }
    catch(error){
        console.log(error)
    }
};

  return (
    <div className="container">
      <header className="header">
        <h1>Bem-vindo</h1>
        <p>Entre com a sua conta</p>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="E-mail" 
          className="input"
          required 
        />
        <input 
          type="password" 
          name="passworld" 
          value={formData.passworld} 
          onChange={handleChange} 
          placeholder="Senha" 
          className="input"
          required 
        />
        <button type="submit" className="submit-button">Login</button>
      </form>

      <footer className="footer">
        <p>Não possui uma conta? <a href="/cadastro">Cadastre-se</a></p>
      </footer>
    </div>
  );
}
