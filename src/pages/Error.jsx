import { Link } from "react-router-dom";


function Error() {
    return ( 
        <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
				<span className="sr-only">Error</span>404
			</h2>
			<p className="text-2xl font-semibold md:text-3xl">Désolé, y&apos;a rien à voir ici.</p>
			<p className="mt-4 mb-8 dark:text-gray-400">Aller champion ! C'est pas un url pour un Vrai Garçon ça !</p>
			<Link rel="noopener noreferrer" to="/" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Retourner à l&apos;entrée de la salle</Link>
		</div>
	</div>
</section>
     );
}

export default Error;