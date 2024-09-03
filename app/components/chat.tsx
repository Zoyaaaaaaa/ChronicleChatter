'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, User } from 'lucide-react';
import axios from 'axios';
import { supabase } from '@/utils/supabase/supaBaseclient'; // Adjust the path if necessary

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  characterName: string;
}

export function ChatDialog({ open, onOpenChange, characterName }: ChatDialogProps) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      fetchChatHistory();
    } else {
      setMessages([]);
    }
  }, [open, characterName]);

  const fetchChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('role, content')
        .eq('character_name', characterName)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching chat history:', error);
        return;
      }

      if (data) {
        setMessages(data.map(entry => ({
          role: entry.role,
          content: entry.content
        })));
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = { role: 'user', content: inputMessage };
    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/character-chat', {
        characterName,
        userMessage: inputMessage,
      });

      const aiMessage = { role: 'assistant', content: response.data.reply };
      setMessages(prevMessages => [...prevMessages, aiMessage]);

      await supabase
        .from('chat_history')
        .insert([
          { character_name: characterName, role: 'user', content: inputMessage },
          { character_name: characterName, role: 'assistant', content: response.data.reply }
        ]);

    } catch (error) {
      console.error('Error generating answer:', error);
      const errorMessage = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-[800px] h-[80vh] flex flex-col bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950 text-white rounded-xl shadow-2xl border border-blue-700">
        <DialogHeader className="border-b border-blue-700 pb-4 mb-4">
          <DialogTitle className="text-3xl font-bold text-white flex items-center">
            <MessageSquare className="mr-2 text-blue-400" />
            Ready to Chat with {characterName} !
          </DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto mb-4 p-6 rounded-lg bg-black bg-opacity-40 backdrop-blur-sm">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-flex items-center ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' ? 'bg-blue-700 ml-2' : 'bg-indigo-700 mr-2'
                }`}>
                  {message.role === 'user' ? <User size={16} /> : <MessageSquare size={16} />}
                </div>
                <span className={`inline-block p-4 rounded-lg max-w-[80%] ${
                  message.role === 'user' 
                    ? 'bg-blue-800 text-white rounded-br-none' 
                    : 'bg-indigo-800 text-white rounded-bl-none'
                } shadow-md`}>
                  {message.content}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow bg-gray-800 text-green placeholder-gray-400 border-blue-700 focus:ring-2 focus:ring-blue-600 text-lg p-3 rounded-full"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out text-lg flex items-center"
          >
            {isLoading ? 'Sending...' : <><Send className="mr-2" /> Send</>}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import axios from 'axios';
// import { supabase } from '@/utils/supabase/supaBaseclient'; // Adjust the path if necessary

// interface ChatDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   characterName: string;
// }

// export function ChatDialog({ open, onOpenChange, characterName }: ChatDialogProps) {
//   const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     if (open) {
//       fetchChatHistory();
//     } else {
//       setMessages([]); // Clear messages when dialog is closed
//     }
//   }, [open, characterName]);

//   const fetchChatHistory = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('chat_history')
//         .select('role, content')
//         .eq('character_name', characterName)
//         .order('created_at', { ascending: true });

//       if (error) {
//         console.error('Error fetching chat history:', error);
//         return;
//       }

//       if (data) {
//         setMessages(data.map(entry => ({
//           role: entry.role,
//           content: entry.content
//         })));
//       }
//     } catch (error) {
//       console.error('Error fetching chat history:', error);
//     }
//   };

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!inputMessage.trim()) return;

//     const newMessage = { role: 'user', content: inputMessage };
//     setMessages([...messages, newMessage]);
//     setInputMessage('');
//     setIsLoading(true);

//     try {
//       // Send the user message to the server
//       const response = await axios.post('/api/character-chat', {
//         characterName,
//         userMessage: inputMessage,
//       });

//       // Receive the AI's response
//       const aiMessage = { role: 'assistant', content: response.data.reply };
//       setMessages(prevMessages => [...prevMessages, aiMessage]);

//       // Save chat messages to Supabase
//       await supabase
//         .from('chat_history')
//         .insert([
//           { character_name: characterName, role: 'user', content: inputMessage },
//           { character_name: characterName, role: 'assistant', content: response.data.reply }
//         ]);

//     } catch (error) {
//       console.error('Error generating answer:', error);
//       const errorMessage = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
//       setMessages(prevMessages => [...prevMessages, errorMessage]);
//     }

//     setIsLoading(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-[90vw] w-[800px] h-[80vh] flex flex-col bg-black text-white">
//         <DialogHeader className="border-b border-gray-700 pb-4 mb-4">
//           <DialogTitle className="text-3xl font-bold text-white"> Let's chat with {characterName}</DialogTitle>
//         </DialogHeader>
//         <div className="flex-grow overflow-y-auto mb-4 p-6 rounded-lg bg-gray-900">
//           {messages.map((message, index) => (
//             <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
//               <span className={`inline-block p-4 rounded-lg max-w-[80%] ${
//                 message.role === 'user' 
//                   ? 'bg-blue-600 text-white rounded-br-none' 
//                   : 'bg-gray-700 text-white rounded-bl-none'
//               }`}>
//                 {message.content}
//               </span>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//         <form onSubmit={handleSendMessage} className="flex gap-3">
//           <Input
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-grow bg-gray-800 text-black border-gray-700 focus:ring-2 focus:ring-blue-500 text-lg p-3"
//           />
//           <Button 
//             type="submit" 
//             disabled={isLoading}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out text-lg rounded-full"
//           >
//             {isLoading ? 'Sending...' : 'Send'}
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
