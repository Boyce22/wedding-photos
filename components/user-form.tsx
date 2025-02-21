"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react"

interface UserData {
  firstName: string
  lastName: string
  createdAt: string
}

export function UserFormDialog() {
  const [open, setOpen] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (!userData) {
      setOpen(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (firstName && lastName) {
      const userData: UserData = {
        firstName,
        lastName,
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem("userData", JSON.stringify(userData))
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col sm:max-w-[425px] h-[100dvh] sm:h-auto p-0 sm:p-6 gap-0 bg-gradient-to-br from-rose-50 via-white to-rose-50 border-rose-100">
        {/* Mobile Layout */}
        <div className="relative flex-1 flex flex-col sm:hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-rose-100/40 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-rose-100/40 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
          </div>

          <div className="relative flex-1 flex flex-col items-center px-6">
            <div className="w-full max-w-md flex-1 flex flex-col">
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 rounded-full bg-white flex items-center justify-center border border-rose-100 shadow-xl mb-6">
                  <Heart className="w-6 h-6 text-rose-400" />
                </div>
                <DialogHeader>
                  <DialogTitle className="text-3xl text-rose-900 font-light mb-2">Bem-vindo(a)!</DialogTitle>
                  <DialogDescription className="text-rose-600 text-lg">
                    Por favor, insira seu nome para começarmos.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName-mobile" className="text-rose-700 text-lg">
                    Nome
                  </Label>
                  <Input
                    id="firstName-mobile"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Digite seu nome"
                    required
                    className="h-12 text-lg border-rose-100 focus:border-rose-200 focus:ring-rose-100 bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName-mobile" className="text-rose-700 text-lg">
                    Sobrenome
                  </Label>
                  <Input
                    id="lastName-mobile"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Digite seu sobrenome"
                    required
                    className="h-12 text-lg border-rose-100 focus:border-rose-200 focus:ring-rose-100 bg-white/80 backdrop-blur-sm"
                  />
                </div>

                <div className="flex-1" />

                <Button
                  type="submit"
                  className="h-14 text-lg bg-rose-500 hover:bg-rose-600 transition-colors duration-300 shadow-lg hover:shadow-xl mb-8"
                >
                  Continuar
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 border border-rose-100 shadow-xl">
            <Heart className="w-5 h-5 text-rose-400" />
          </div>
          <DialogHeader className="pt-4">
            <DialogTitle className="text-center text-2xl text-rose-900 font-light">Bem-vindo(a)!</DialogTitle>
            <DialogDescription className="text-center text-rose-600">
              Por favor, insira seu nome para começarmos.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="firstName-desktop" className="text-rose-700">
                Nome
              </Label>
              <Input
                id="firstName-desktop"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Digite seu nome"
                required
                className="border-rose-100 focus:border-rose-200 focus:ring-rose-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName-desktop" className="text-rose-700">
                Sobrenome
              </Label>
              <Input
                id="lastName-desktop"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Digite seu sobrenome"
                required
                className="border-rose-100 focus:border-rose-200 focus:ring-rose-100"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Continuar
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

