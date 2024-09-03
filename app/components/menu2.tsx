'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { ChatDialog } from './chat';

export default function ImageGallery() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const characters = [
    { name: "Elon Musk", imgSrc: "/images/elon.jpg" },
    { name: "Taylor Swift", imgSrc: "/images/taylor.jpg" },
    { name: "Harry Potter", imgSrc: "/images/harry.jpg" },
    { name: "SpongeBob SquarePants", imgSrc: "/images/sponge.jpg" },
    { name: "Messi", imgSrc: "/images/messi.jpg" },
    { name: "Mickey Mouse", imgSrc: "/images/mickeymouse.jpg" },
    { name: "Yoda", imgSrc: "/images/yoda.jpg" },
  ];

  const handleImageClick = (name: string) => {
    setSelectedCharacter(name);
    setDialogOpen(true);
  };

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" />
      </Head>

      <div className="container">
        <h1>Embark on a Chat Adventure!</h1>
        <p>Select a character below and start an epic conversation.</p>
        <div className="gallery">
          {characters.map((character, index) => (
            <figure key={index} onClick={() => handleImageClick(character.name)}>
              <img src={character.imgSrc} alt={character.name} />
              <figcaption>{character.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <ChatDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        characterName={selectedCharacter || ''}
      />

      <style jsx>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background: #101820; /* Dark background for contrast */
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem;
          text-align: center;
          color: #f5f5f5;
        }

        h1 {
          font-size: 3.5rem;
          color: #f39c12; /* Bright color for emphasis */
          margin-bottom: 1rem;
          text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
          animation: pulse 2s infinite, colorChange 3s infinite;
        }

        p {
          font-size: 1.4rem;
          color: #dfe6e9; /* Lighter color for contrast */
          margin-bottom: 2.5rem;
          animation: fadeIn 3s ease-out, slideIn 2s ease-out;
        }

        .gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          justify-content: center;
        }

        figure {
          position: relative;
          border-radius: 1.2rem;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          border: 3px solid #f39c12; /* Border to highlight figures */
        }

        figure:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 30px rgba(0,0,0,0.4);
          border-color: #e67e22; /* Change border color on hover */
        }

        figure img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s, filter 0.4s;
          filter: grayscale(60%);
        }

        figure figcaption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
          color: #f5f5f5;
          font-size: 1.5rem;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.3s;
        }

        figure:hover figcaption {
          opacity: 1;
        }

        figure:hover img {
          transform: scale(1.1);
          filter: grayscale(0%);
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes colorChange {
          0% { color: #f39c12; }
          50% { color: #e74c3c; }
          100% { color: #f39c12; }
        }

        @media (max-width: 768px) {
          .gallery {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
          }

          h1 {
            font-size: 2.5rem;
          }

          p {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}
