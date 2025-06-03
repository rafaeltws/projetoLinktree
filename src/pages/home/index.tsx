import { useEffect, useState } from "react";

import { Social } from "../../components/Social";

import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { db } from "../../services/firebaseConnection";
import {
  getDoc,
  getDocs,
  collection,
  orderBy,
  query,
  doc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialProps {
  instagram: string;
  youtube: string;
  tiktok: string;
  twitterX: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [social, setSocial] = useState<SocialProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
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
    }

    loadLinks();
  }, []);

  useEffect(() => {
    async function loadSocialLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocial({
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
            tiktok: snapshot.data()?.tiktok,
            twitterX: snapshot.data()?.twitterX,
          });
        }
      });
    }

    loadSocialLinks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl  text-3xl font-bold text-white mt-20">
        Rafael Sá
      </h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            style={{ backgroundColor: link.bg, color: link.color }}
            key={link.id}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
          >
            <a href={link.url} target="_blank">
              <p className="text-base md:text-lg">{link.name}</p>
            </a>
          </section>
        ))}

        { social && Object.keys(social).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
          <Social url={social?.instagram}>
            <FaInstagram size={35} color="#FFF" />
          </Social>

          <Social url={social?.youtube}>
            <FaYoutube size={35} color="#FFF" />
          </Social>

          <Social url={social?.tiktok}>
            <FaTiktok size={35} color="#FFF" />
          </Social>

          <Social url={social?.twitterX}>
            <FaXTwitter size={35} color="#FFF" />
          </Social>
        </footer>
        ) }
      </main>
    </div>
  );
}
