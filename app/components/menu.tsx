'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ChatDialog } from './chat';
import { supabase } from '@/utils/supabase/supaBaseclient'; // Adjust the path if necessary
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ChatHistory } from './history';
interface ImageGalleryProps {
  userId: string; // Add userId as a prop
}

export default function ImageGallery({ userId }: ImageGalleryProps) {

  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCharacterName, setNewCharacterName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [characters, setCharacters] = useState([
    { name: "Elon Musk", imgSrc: "/images/elon.jpg" },
    { name: "Taylor Swift", imgSrc: "/images/taylor.jpg" },
    { name: "Harry Potter", imgSrc: "/images/harry.jpg" },
    { name: "SpongeBob SquarePants", imgSrc: "/images/sponge.jpg" },
    { name: "Messi", imgSrc: "/images/messi.jpg" },
    { name: "Mickey Mouse", imgSrc: "/images/mickeymouse.jpg" },
    { name: "Yoda", imgSrc: "/images/yoda.jpg" },
    { name: "Mark", imgSrc: "/images/mark.jpg" },
    { name: "Bill Gates", imgSrc: "/images/bill.jpg" },
    { name: "Iron Man", imgSrc: "/images/iron.jpg" },
    { name: "Wonder Woman", imgSrc: "/images/wonderwoman.jpg" },
    { name: "Sherlock Holmes", imgSrc: "/images/sherlock.jpg" }
  ]);
  

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };
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
        <h1>Get Ready for a Chat Adventure!</h1>
        <p>Pick your favorite character below and dive into a fun conversation with them.</p>
        <div className="input-container">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter character name"
             className="flex h-9 w-full rounded-2xl border-2 border-teal-300 bg-gradient-to-r from-cyan-50 to-teal-50 px-3 py-1 text-sm text-black"
          />
          <Button onClick={() => handleImageClick(inputValue)}>Talk</Button>


        </div>
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
    </div>
  );
}
