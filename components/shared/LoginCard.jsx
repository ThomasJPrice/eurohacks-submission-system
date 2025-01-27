'use client'

import { login, loginWithNFC } from '@/actions/auth';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Smartphone, Lock } from "lucide-react"

const LoginCard = () => {
  const [teamCode, setTeamCode] = useState('');
  const [pin, setPin] = useState('');

  const [status, setStatus] = useState('Tap to sign in');

  // PIN LOGIN
  const handlePinLogin = async () => {
    const data = await login(teamCode, pin);

    console.log(teamCode, pin, data);


    if (!data.error) {
      window.location.href = '/';
    } else {
      toast.error(data.error)
      setPin('')
      setTeamCode('')
    }
  };

  // NFC LOGIN
  useEffect(() => {
    async function startNFC() {
      if ('NDEFReader' in window) {
        try {
          const nfcReader = new NDEFReader();
          await nfcReader.scan();

          nfcReader.onreading = async (event) => {
            const decoder = new TextDecoder();
            let cardId = '';

            for (const record of event.message.records) {
              cardId = decoder.decode(record.data);
            }

            if (/^[A-Z]{2}\d{3}-\d{4}$/.test(cardId)) {
              setStatus('Loading...')
              const data = await loginWithNFC(cardId);

              if (!data.error) {
                window.location.href = '/';
              } else {
                toast.error(data.error)
                setPin('')
                setTeamCode('')
                setStatus('Tap to sign in');
              }
            } else {
              console.log('Invalid card ID:', cardId);
            }
          };
        } catch (error) {
          console.error('NFC reading error:', error);
          setStatus('NFC scanning failed. Try again.');
        }
      } else {
        setStatus('NFC not supported on this device.');
      }
    }

    startNFC()
  }, [])


  return (
    <Card className="w-full max-w-3xl overflow-hidden !border-none">
      <CardHeader className="bg-primary text-foreground relative">
        <CardTitle className="text-2xl !tracking-normal !font-medium">Sign In</CardTitle>
        <CardDescription className="text-foreground">Choose your preferred sign-in method</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NFC Sign-in Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-6 h-6" />
              <h3 className="text-lg">Sign in with NFC</h3>
            </div>
            <p className="text-sm text-foreground/80">
              Tap your custom Eurohacks NFC card to sign into your team faster.
            </p>
            <div className="border-2 border-dashed border-card-foreground rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <Smartphone className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm font-medium">{status}</p>
              </div>
            </div>
          </div>

          {/* Code and PIN Sign-in Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Lock className="w-6 h-6" />
              <h3 className="text-lg">Sign in with Code & PIN</h3>
            </div>
            <p className="text-sm text-foreground/80">Enter your unique country code and PIN to access your team's project.</p>
            <div className="space-y-3">
              <Input type="text" placeholder="Enter your code" className="w-full" value={teamCode} onChange={(e) => setTeamCode(e.target.value)} />
              <Input type="password" placeholder="Enter your PIN" className="w-full" value={pin} onChange={(e) => setPin(e.target.value)} />
              <Button className="w-full" onClick={handlePinLogin}>Sign In</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginCard