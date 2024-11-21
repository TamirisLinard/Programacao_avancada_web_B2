import { Image, StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'expo-router';
import { getData } from '../storage';
import '../App.css'; 
import { AuthContext } from '../authcontext';

interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  author: User;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [data, setData] = useState<Post[]>(
