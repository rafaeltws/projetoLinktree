import { type FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");
  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      setLinks(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        console.log("CADASTRADO COM SUCESSO!");
      })
      .catch((error) => {
        console.log("ERRO AO CADSATRAR NO BANCO" + error);
      });
  }

  async function handleDelete(id: string) {
    const docRef = doc(db, "links", id)
    await deleteDoc(docRef)
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Url do Link</label>
        <Input
          type="url"
          placeholder="Digite a url..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex items-center gap-2">
            <label className="text-white font-medium">Cor do link</label>
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <input
                type="color"
                value={textColorInput}
                onChange={(e) => setTextColorInput(e.target.value)}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                title="Escolher cor do link"
              />
              <div
                className="w-full h-full"
                style={{ backgroundColor: textColorInput }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-white font-medium">Fundo do link</label>
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <input
                type="color"
                value={backgroundColorInput}
                onChange={(e) => setBackgroundColorInput(e.target.value)}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                title="Escolher cor de fundo"
              />
              <div
                className="w-full h-full"
                style={{ backgroundColor: backgroundColorInput }}
              />
            </div>
          </div>
        </section>

        {nameInput !== "" && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">
              Veja como está ficando:
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="mb-7 bg-gradient-to-r from-yellow-500 to-orange-400 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>

      {links.map((item, index) => (
        <article
          key={item.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ backgroundColor: item.bg, color: item.color }}
        >
          <p>{item.name}</p>
          <div>
            <button
              className="p-1 rounded bg-neutral-900 cursor-pointer"
              onClick={() => handleDelete(item.id)}
            >
              <FiTrash size={18} color="rgb(250, 158, 0)" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
