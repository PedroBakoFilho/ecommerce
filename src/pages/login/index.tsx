import { useEffect } from 'react'
import logoImg from '../../assets/logo.svg'
import { Container } from '../../components/container'
import { Link, useNavigate } from 'react-router-dom'

import { Input } from '../../components/input'
import {useForm} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../services/firebaseConnection'

import toast from 'react-hot-toast'

const schema = z.object({
  email: z.string().email("Insira um email valido!").nonempty("O campo de email é obrigatorio"),
  password: z.string().nonempty("O campo senha é obrigatorio!")
})

type FormData = z.infer<typeof schema>


export function Login() {

  const navigate = useNavigate()

  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
      resolver: zodResolver(schema),
      mode: "onChange"
  })

  useEffect( () => {
    async function handleLogOut(){
      await signOut(auth)
    }

    handleLogOut()
  },[])

  function onSubmit(data: FormData){

    signInWithEmailAndPassword(auth ,data.email,data.password)
    .then( () => {
      toast.success("Logado com sucesso! :)")
      navigate("/dashboard", { replace: true})
    })
    .catch( err =>{
      toast.error("Erro ao fazer o login!!")
      console.log(err)
    })

  }


    return (
        <Container>
          <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4'>
              <Link to="/" className='mb-6 max-w-sm w-full'>
                <img 
                className='w-full'
                src={logoImg} 
                alt="Logo do site"
                />
              </Link>

              <form
              className="bg-white max-w-xl w-full rounded-lg p-4"
              onSubmit={handleSubmit(onSubmit)}
              >
              <div className='mb-3'>
              <Input 
                type="email" 
                placeholder="Digite seu email..."
                name="email"
                error={errors.email?.message}
                register={register}
                />
              </div>
              <div className='mb-3'>
              <Input 
                type="password" 
                placeholder="*******"
                name="password"
                error={errors.password?.message}
                register={register}
                />
              </div>

                <button className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium'>
                  Acessar
                </button>
                
              </form>
              <Link to="/register">
                Ainda não possui uma conta? Cadastre-se!
              </Link>
          </div>
        </Container>
    )
  }