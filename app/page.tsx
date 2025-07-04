"use client";

import React, { useState, useEffect, FormEvent } from "react";
import PersonneForm from "./components/PersonneForm";
import PersonneList from "./components/PersonneList";
import Image from "next/image";
import { ArrowRight, Check, Loader2, Save } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Personne {
  id: number;
  nom: string;
  prenoms: string;
  telephone: string;
  email: string | null;
  entite: string;
  poste: string;
  createdAt: string;
}

interface PersonneFormData {
  nom: string;
  prenoms: string;
  telephone: string;
  email: string;
  entite: string;
  poste: string;
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [formLoader, setFormLoader] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [formData, setFormData] = useState<PersonneFormData>({
    nom: "",
    prenoms: "",
    telephone: "",
    email: "",
    entite: "",
    poste: "",
  });

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormLoader(true);

    // setTimeout(() => {
    try {
      const response = await fetch("/api/personnes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setTimeout(() => {
          setStep(3);
          setFormData({
            nom: "",
            prenoms: "",
            telephone: "",
            email: "",
            entite: "",
            poste: "",
          });
        }, 3000);
      }
    } catch (error) {
    } finally {
      setFormLoader(false);
    }
    // }, 3000);
    // console.log(formData);
  };

  const [isLoadingStep, setIsLoadingStep] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingStep(true);
    }, 2000);

    setTimeout(() => {
      setStep(2);
    }, 4000);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {/* Step 1 */}
      {step === 1 && (
        <motion.div
          key="step1"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="relative min-h-screen bg-[url(/img/Design.png)] bg-center bg-cover bg-no-repeat px-10 "
        >
          {isLoadingStep && (
            <div className="absolute bottom-10 left-1/2 -translate-1/2">
              <Loader2 size={40} className="animate-spin text-white text-5xl" />
            </div>
          )}

          <div className="grid md:grid-cols-2">
            <div className="flex justify-center items-center h-screen flex-col">
              {/* <h1 className="text-8xl font-bold uppercase">Yango hub Africa</h1> */}

              <Image
                src="/img/Title.png"
                alt="Design"
                width={800}
                height={800}
                className="object-cover"
              />

              <Image
                src="/img/Subtitle.png"
                alt="Design"
                width={800}
                height={800}
                className="object-cover mt-5"
              />

              {/* <p className="text-5xl">#AfricaInMotion #FromAbidjanToTheWorld</p> */}
            </div>
            <div className="md:flex justify-center items-center h-screen hidden">
              <Image
                src="/img/Carte.png"
                alt="Design"
                width={700}
                height={700}
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative min-h-screen bg-[url(/img/Design.png)] bg-center bg-cover bg-no-repeat"
        >
          <div className=" h-screen grid md:grid-cols-2">
            <div></div>
            <div className="bg-amber-50 p-10">
              <div>
                <div>
                  <Image
                    src="/img/Yango_(entreprise).png"
                    alt="Design"
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="text-black mt-10">
                <h1 className="text-5xl font-bold italic">Bienvenu !</h1>
                <p>Inscrivez vous sur la liste</p>
              </div>

              <div className="mt-10">
                <form action="" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-10 mb-8">
                    <div className="flex flex-col">
                      <label htmlFor="" className="text-black mb-2">
                        Nom *
                      </label>
                      <input
                        className="border h-10 border-[#000] rounded-lg focus:border-red-400 focus-visible:border-red-400 focus:border-4 outline-0 transition-all px-2 placeholder:text-gray-400 text-black"
                        type="text"
                        placeholder="Entrez votre nom"
                        name="nom"
                        id="nom"
                        value={formData.nom}
                        onChange={handlechange}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="text-black mb-2">
                        Prenoms *
                      </label>
                      <input
                        className="border h-10 border-[#000] rounded-lg focus:border-red-400 focus-visible:border-red-400 focus:border-4 outline-0 transition-all px-2 placeholder:text-gray-400 text-black"
                        type="text"
                        placeholder="Entrez votre prenoms"
                        name="prenoms"
                        id="prenoms"
                        value={formData.prenoms}
                        onChange={handlechange}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mb-8">
                    <label htmlFor="" className="text-black mb-2">
                      Nunero de telephone *
                    </label>
                    <input
                      className="border h-10 border-[#000] rounded-lg focus:border-red-400 focus-visible:border-red-400 focus:border-4 outline-0 transition-all px-2 placeholder:text-gray-400 text-black"
                      placeholder="Entrez votre numéro..."
                      type="text"
                      name="telephone"
                      id="telephone"
                      value={formData.telephone}
                      onChange={handlechange}
                      required
                    />
                  </div>

                  <div className="flex flex-col mb-8">
                    <label htmlFor="" className="text-black mb-2">
                      Email (optionnel)
                    </label>
                    <input
                      className="border h-10 border-[#000] rounded-lg focus:border-red-400 focus-visible:border-red-400 focus:border-4 outline-0 transition-all px-2 placeholder:text-gray-400 text-black"
                      type="email"
                      placeholder="Entrez votre email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handlechange}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="flex flex-col">
                      <label htmlFor="" className="text-black mb-2">
                        Entité *
                      </label>
                      <input
                        className="border h-10 border-[#000] rounded-lg focus:border-red-400 focus-visible:border-red-400 focus:border-4 outline-0 transition-all px-2 placeholder:text-gray-400 text-black"
                        type="text"
                        placeholder="Entrez votre Entité"
                        name="entite"
                        id="entite"
                        value={formData.entite}
                        onChange={handlechange}
                        required
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="" className="text-black mb-2">
                        Poste *
                      </label>
                      <input
                        className="border h-10 border-[#000] rounded-lg focus:border-red-400 focus-visible:border-red-400 focus:border-4 outline-0 transition-all px-2 placeholder:text-gray-400 text-black"
                        placeholder="Entrez votre poste"
                        type="text"
                        name="poste"
                        id="poste"
                        value={formData.poste}
                        onChange={handlechange}
                        required
                      />
                    </div>

                    <div>
                      <button className="flex items-center gap-2 bg-red-500 px-10 py-3 rounded-full font-semibold  hover:bg-red-600">
                        Enregistrer
                        {formLoader ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <ArrowRight className="ml-2" />
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <motion.div
          key="step3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-[url(/img/Design.png)] bg-center bg-cover bg-no-repeat px-10 flex items-center justify-center"
        >
          <div className="bg-white w-[600px] rounded-2xl p-3 text-black opacity-90">
            <div>
              <h2 className="text-5xl font-bold text-center mb-2">Merci !</h2>
              <p className="text-center text-2xl">
                Votre présence a bien été enregistrée.
              </p>
              <div className="my-4 flex items-center justify-center">
                <div className="border rounded-full border-red-500">
                  <Check color="#f00" size={80} />
                </div>
              </div>
              <p className="text-center text-xl">
                Nous sommes ravis de vous compter parmi nos invités.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
