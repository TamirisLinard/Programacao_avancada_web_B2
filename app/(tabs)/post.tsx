import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '../authcontext';
import { getData } from '../storage';
import '../App.css';

interface Post {
  title: string;
  content: string;
  authorId: number;
}

export default function NewPost() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [postTitle, setPostTitle] = useState<string>('');
  const [postContent, setPostContent] = useState<string>('');

  useEffect(() => {
    const verifyAuth = async () => {
      const token = await getData();
      if (!token) {
        router.replace('/login');
      }
    };

    verifyAuth();
  }, [router]);

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/post/create", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: postTitle,
          content: postContent,
          authorId: user?.id,
        }),
      });
      console.log(await response.json());
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="nova-postagem-container">
      <div className="user-info">
        <div className="username">@{user?.email.split('@')[0]}</div>
      </div>

      <form className="post-form-container" onSubmit={handlePostSubmit}>
        <div className="form-title">Criar Nova Postagem</div>
        <div className="post-input-container">
          <input
            type="text"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Título da postagem"
            className="post-title-input"
          />
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Escreva sua postagem aqui..."
            className="post-input"
          />
        </div>
        <button type="submit" className="publish-button">
          Publicar
        </button>
      </form>
    </div>
  );
}
