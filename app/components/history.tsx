// ChatHistory.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/supaBaseclient'; // Adjust path as necessary

interface ChatHistoryProps {
  userId: string;
}

export function ChatHistory({ userId }: ChatHistoryProps) {
  const [history, setHistory] = useState<{ character_name: string; role: string; content: string; created_at: string }[]>([]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_history')
          .select('character_name, role, content, created_at')
          .eq('user_id', userId)
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error fetching chat history:', error);
          return;
        }

        console.log('Fetched chat history:', data);  // Log data here

        if (data) {
          setHistory(data);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [userId]);

  return (
    <div className="overflow-y-auto max-h-[70vh]">
      {history.length === 0 ? (
        <p>No chat history available.</p>
      ) : (
        history.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-4 rounded-lg max-w-[80%] ${
              message.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-gray-700 text-white rounded-bl-none'
            }`}>
              <strong>{message.character_name}</strong>: {message.content}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
