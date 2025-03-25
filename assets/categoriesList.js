const categoriesList = [
    "Education", "Santé", "Environnement", "Sport", "Culture", "Socioculturel", "Politique", "Spiritualité", "Emploi & Développement local", "Amicales", "Solidarité", "Loisirs", "Réflexion", "Activités économiques", "Droits & Civisme", "Divers", "Communication", "Interventions sociales", "Justice", "Logement", "Patrimoine", "Recherche", "Economie", "Sécurité", "Médico-social", "Services familiaux", "Tourisme",
]

const sortedCategories = categoriesList.filter(cat => cat !== "Divers").sort(); // on enlève divers et on trie les catégories par ordre alphébetique
sortedCategories.push("Divers"); // on ajoute Divers à la fin

export default sortedCategories;