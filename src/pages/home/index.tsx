import { useState, useEffect } from "react";
import { Container } from "../../components/container";
import { Link } from "react-router-dom";

import { 
  collection,
  query,
  orderBy,
  getDocs,
  where, 
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";


interface CarsProps{
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string;
  city: string;
  km: string;
  images: CarImagemProps[];
}

interface CarImagemProps{
  name: string;
  uid: string;
  url: string;
}



export function Home() {

  const [cars,setCars] = useState<CarsProps[]>([])
  const [loadImages, setLoadImages] = useState<string[]>([])
  const [input, setInput] = useState("")

  useEffect( () => {
 



    loadCars()
  },[])

  function loadCars(){
    const carsRef = collection(db, "cars")
    const queryRef = query(carsRef, orderBy("created", "desc"))

    getDocs(queryRef)
    .then( (snapshot) => {
      let listcars = [] as CarsProps[]

      snapshot.forEach( doc => {
        listcars.push({
          id: doc.id,
          uid: doc.data().uid,
          name: doc.data().name,
          year: doc.data().year,
          km: doc.data().km,
          city: doc.data().city,
          price: doc.data().price,
          images: doc.data().images,
        })
      })
      setCars(listcars)
    })
  }

  function handleImageLoad(id: string){
    setLoadImages( (prevImageLoaded) => [...prevImageLoaded, id])
  }

  async function handleSearchCar(){
    if(input === ""){
      loadCars()
      return;
    }
    setCars([])
    setLoadImages([])

    const q = query(collection(db, "cars"),
    where("name", ">=", input.toUpperCase()),
    where("name", "<=", input.toUpperCase() + "\uf88f")
    )

    const querySnapshot = await getDocs(q)

    let listcars = [] as CarsProps[]

    querySnapshot.forEach( (doc) => {        
      listcars.push({
        id: doc.id,
        uid: doc.data().uid,
        name: doc.data().name,
        year: doc.data().year,
        km: doc.data().km,
        city: doc.data().city,
        price: doc.data().price,
        images: doc.data().images,
    })

    })
    setCars(listcars)
  }

    return (
      <Container>
        <section className="bg-white p-4 rounded-lg w-full max-w-4xl mx-auto flex justify-center items-center gap-2">
          <input 
          value={input}
          onChange={ (e) => setInput(e.target.value) }
          className="w-full border-2 rounded-lg h-9 px-3 outline-none"
          placeholder="Digite o nome do carro"
          />

          <button 
          onClick={handleSearchCar}
          className="bg-red-600 h-9 px-8 rounded-lg text-white font-medium text-lg">
            Buscar
          </button>

        </section>

        <h1 className="font-bold text-center mt-6 text-2xl mb-4">
            Carros novos e usados em todo Brasil
        </h1>

        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 ">
          {cars.map( car => (
              <Link to={`/car/${car.id}`} key={car.id}>
                  <section  className="w-full bg-white rounded-lg">
                    <div 
                    style={{display: loadImages.includes(car.id) ? "none" : "block"}}
                    className="w-full h-56 rounded-lg bg-slate-200"></div>
                    <img 
                    style={{ display:  loadImages.includes(car.id) ? "block" : "none" }}
                    className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                    src={car.images[0].url}
                    alt="Carro" 
                    onLoad={ () => handleImageLoad(car.id)}
                    />
                    <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>
        
                    <div className="flex flex-col px-2">
                      <span className="text-zinc-700 mb-6">{car.year} | {car.km} km</span>
                      <strong className="text-black font-medium text-xl">R$ {car.price}</strong>
                    </div>
        
                    <div className="w-full h-px bg-slate-200 my-2"></div>
        
                    <div className="px-2 pb-2">
                      <span className="text-zinc-700">{car.city}</span>
                    </div>
        
                  </section>
              </Link>
          ))}
        </main>
      </Container>
    )
  }