import { mockResults } from './mock';
import React, { useEffect, useState } from 'react';
import { v4 as Uuid } from 'uuid';

export interface IUseSendMessage {
    sendMessage: (message: string) => void;
    messages: Message[];
    loading: boolean;
}
interface Message {
    isResponse: boolean;
    message: string;
    time: Date;
    results?: any[];
}
interface sendMessageInput {
    user_input: string;
    session_id: string;
}
// const request = 'http://34.94.96.59:8080/infindbot/ask'
const request = 'https://us-central1-patbio.cloudfunctions.net/output2'



const RECCOMENDATION_KEY = 'product_recommendations'

export const useSendMessage = (): IUseSendMessage => {
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>()
    const [messages, setMessages] = useState<Message[]>([])
    useEffect(() => {
      setSessionId(Uuid())
    },[])

    const sendMessage =  async (message: string) => {
        if(!sessionId) return;
        setLoading(true);
       const input: sendMessageInput = { user_input: message, session_id: sessionId}
       setMessages(prev => [ ...prev,{isResponse: false, message, time: new Date(Date.now())}])
       try {
        const response = await fetch(request, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        const data = await response.json()
        console.log("🚀 ~ sendMessage ~ data:", data)
        if(data?.name === RECCOMENDATION_KEY) {
            try {
                // Temp cause api is not returning results in correct format
                const results = data?.content as any[];
                console.log(results);
                setMessages(prev => [ ...prev, {isResponse: true, message: 'Here are some recommendations based on your input', time: new Date(Date.now()), results}])
            } catch(e) {
                setMessages(prev => [ ...prev, {isResponse: true, message: 'Here are some recommendations based on your input', time: new Date(Date.now()), results: [ mockResults, mockResults, mockResults, mockResults, mockResults, mockResults]}])
            }
        } else {
            setMessages(prev => [ ...prev, {isResponse: true, message: data?.content, time: new Date(Date.now())}])
        }
        
    } catch(e) {
        console.log(e);
        setMessages(prev => [ ...prev, {isResponse: true, message: 'Infind api failed', time: new Date(Date.now())}])
    } finally {
        setLoading(false)
    }
    }

    return { sendMessage, loading: loading && !!sessionId, messages }
}