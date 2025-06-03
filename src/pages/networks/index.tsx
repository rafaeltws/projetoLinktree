import { useState, type FormEvent, useEffect } from "react";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { db } from "../../services/firebaseConnection";
import {
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore'

export function Networks(){
  const [instagram, setInstagram] = useState("")
  const [youtube, setYoutube] = useState("")
  const [tiktok, setTiktok] = useState("")
  const [twitter, setTwitter] = useState("")

  useEffect(() => {
    function loadLinks(){
      const docRef = doc(db, "social", "link")
      getDoc(docRef)
      .then((snapshot) => {
        if(snapshot.data() !== undefined){
          setInstagram(snapshot.data()?.instagram)
          setYoutube(snapshot.data()?.youtube)
          setTiktok(snapshot.data()?.tiktok)
          setTwitter(snapshot.data()?.twitterX)
        }

      })
    }

    loadLinks()
  }, [])

  function handleRegister(e: FormEvent){
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
      instagram: instagram,
      youtube: youtube,
      tiktok: tiktok,
      twitterX: twitter
    })
    .then(() => {
      alert("CADASTROU")
    })
    .catch((error) => {
      console.log("ERRO AO CADASTRAR" + error)
    })
  }

  return(
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>

      <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
        <label className="text-white font-medium mt-2 mb-2">Link do Instagram</label>
        <Input 
          type="url"
          placeholder="Digite a utl..."
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">Link do YouTube</label>
        <Input 
          type="url"
          placeholder="Digite a utl..."
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">Link do TikTok</label>
        <Input 
          type="url"
          placeholder="Digite a utl..."
          value={tiktok}
          onChange={(e) => setTiktok(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">Link do X</label>
        <Input 
          type="url"
          placeholder="Digite a utl..."
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />

        <button
          type="submit"
          className="text-white bg-gradient-to-r from-yellow-500 to-orange-400 h-9 rounded-md items-center justify-center flex mb-7 font-medium cursor-pointer"
        >
          Salvar links
        </button>
      </form>
    </div>
  )
}