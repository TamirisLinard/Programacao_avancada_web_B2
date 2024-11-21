import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import './App.css'; 
import { getData, storeData } from '../storage';

interface FormData {
  name: string;
  email: string;
  passworld: string;
}

export default function SignUp() {

  const router = useRouter();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
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
        const response = await fetch("http://localhost:3000/user/create", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        }) 
        console.log(response)

        const responseData = await response.json();
        if (response.ok) {
          router.replace('/login');
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
        <p>Crie sua conta para acessar</p>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Nome de usuário" 
          className="input"
          required 
        />
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
        <button type="submit" className="submit-button">Cadastrar</button>
      </form>

      <footer className="footer">
        <p>Já tem uma conta? <a href="/login">Entrar</a></p>
      </footer>
    </div>
  );
}
