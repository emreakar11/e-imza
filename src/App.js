import React, { useState } from 'react';
import './App.css';
import { Button, Div } from './components/Anasayfa';
import logo from './images/logo.png'

function App() {

  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');

  const dosyaDegistir = (event) => {
    setFile(event.target.files[0]);
  };



  const dosyaYukle = async (event) => {
    
    event.preventDefault();
    console.log("çalışıyor")
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      const veriyiAl = await response.blob();
      const url = URL.createObjectURL(veriyiAl);

      setDownloadLink(url);
    }
  };

  return (
    <Div className="App">
      <h1>E-İmza Uygulaması</h1>
      <img src={logo} alt="Logo" className="logo-image" />
      <form onSubmit={dosyaYukle}>
        <input type="file" onChange={dosyaDegistir} required />
        <Button type="submit">Dosyayı İmzala</Button>
      </form>
      {downloadLink && (
        <a href={downloadLink} download={`${file.name.replace(/(\.[\w\d_-]+)$/i, '_imzali$1')}`}>
          İmzalanmış Dosyayı İndir
        </a>
      )}
    </Div>
  );
} 

export default App;
