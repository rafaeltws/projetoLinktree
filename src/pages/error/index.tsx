import { Link } from 'react-router-dom'

export function ErrorPage() {
  return (
    <div className="flex w-full min-h-screen justify-center items-center flex-col text-white">
      <h1 className="font-bold text-6xl mb-2 bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">404</h1>
      <h1 className="font-bold text-4xl mb-4">Página não encontrada</h1>
      <p className="italic text-xl mb-4">Você caiu em uma página que não existe!</p>

      <Link
        to="/"
        className="py-2 px-5 rounded-md transition-all duration-300 bg-gray-50/20 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-400"
      >
        Voltar para home
      </Link>
    </div>
  );
}
