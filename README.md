# Web-API-EFREI-Final-Project
No time for additional details or focusing on conventional commits :/ Normally a bit better but whatever.


My Social Networks API

Contexte
Dans le cadre de ce projet, vous devez concevoir et développer un web service avec les outils vus en cours pour la conception d’API.  Vous travaillez au sein des équipes techniques de Facebook et vous êtes responsable de la refonte de ses API. 

L’objectif est d’améliorer la réactivité et les performances de ses services, afin d’offrir aux utilisateurs une expérience plus fluide et plus rapide.  Dans ce contexte, Facebook a défini des besoins très précis. Le nouveau service doit être pleinement opérationnel le jour de la mise à jour de l’application : aucun retard ni dysfonctionnement ne sera toléré lors du déploiement. 

Vous devrez donc livrer une API fiable, bien structurée et documentée, qui respecte les exigences fonctionnelles et techniques décrites ci-dessous.
0.1 Rendu attendu
Respecter à la lettre les besoins fonctionnelles de la nouvelle API.
Définir des endpoints spécifiques pour la mise à disposition de certaine données.
Créer et mettez à jours la documentation de l’API avec postman.
Avec les urls de chaque services
Les explications fonctionnelles
Les données que vous allez retourner
Rendre un Repo Github ou Gitlab avec votre projet (code source, documentation postman) API qui inclut l’url de la publication de la documentation postman.
1 Cahier des Charges
1.1 Avant l’événement 
Chaque organisateur doit pouvoir créer un événement simplement et rapidement, en suivant un parcours guidé en trois étapes.
Étape 1 : Configuration de l’événement
Lors de cette première étape, l’utilisateur renseigne uniquement les informations essentielles à son événement. L’objectif est de rendre la saisie rapide et intuitive, sans surcharger l’organisateur de paramètres secondaires.

Les informations à renseigner sont les suivantes :
Nom : le titre de l’événement, tel qu’il apparaîtra aux participants.
Description : une présentation de l’événement (programme, objectif, informations pratiques, etc.).
Date de début : la date et l’heure auxquelles l’événement commence.
Date de fin : la date et l’heure auxquelles l’événement se termine.
Lieu : l’adresse ou l’endroit où se déroule l’événement.
Photo de couverture : une image qui illustre l’événement et le rend plus attractif.
Visibilité : le choix de rendre l’événement public, visible par tous, ou privé, accessible uniquement aux personnes invitées.
Organisateurs et membres : la liste des personnes qui gèrent l’événement et de celles qui y participent.
1.2 Les groupes 

Facebook permet de créer votre groupe secret, privé ou publique afin d’y créer des événements en invitant automatiquement l’ensemble des membres. 

En effet, dans un groupe, la création d’événements se veut simplifiée en permettant l’invitation de tous les membres en un clic. Au sein d’un groupe publique, les organisateurs d’événements pourront s’ils le souhaitent partager leurs événements sur les autres réseaux sociaux afin de les aider dans la communication des événements. 

Au sein de chaque groupe, un fil de discussion sera mis à disposition des utilisateurs afin de discuter entre eux. 

Paramètre d’un groupe : 
- Nom
- Description
- Icône
- Photo de couverture
- Choix du type de groupe (public, privé, secret)
- Choix d’autoriser les membres de publier dans le groupe
- Choix d’autoriser les membres à créer des événements dans le groupe 
2 Spécifications fonctionnelles et techniques (A faire)
2. 1 Utilisateurs (CRUDS)
Vous devez définir les attributs d’un utilisateur.
Il ne peut pas y avoir deux utilisateurs avec le même email.
2. 2 Événements (CRUDS)
Un événement peut avoir une multitude de participants. 
Un événement est géré par 1 ou plusieurs organisateurs. 
2.3 Groupes (CRUDS)
Un groupe possède 1 ou plusieurs membres. 
Un groupe est géré par 1 ou plusieurs administrateurs. 
2.4 Les fils de discussions (CRUDS)
Un fil de discussion peut être lié à 1 groupe ou 1 événement mais pas les deux. 
Un fil de discussion contient 0 ou plusieurs messages créés par un membre ou un administrateurs/organisateurs. 
Chaque membre/participant peut commenter un message. 
2.5 Albums photo (CRUDS)
Un album photo est associé à 1 événement. 
Chaque album photo contient 0 ou plusieurs photos postées par 1 participant de l’événement. 
Ces photos peuvent être commentées par 0 ou plusieurs particpant de l’événement.
2.6 Sondages (CRUDS)
Un événement peut avoir 0 ou plusieurs sondages créés par un organisateur. 
Un sondage comporte 1 ou plusieurs questions. 
Pour chaque question, il existe plusieurs réponses possibles mais uniquement 1 peut être choisie. 
Chaque participant de l’événement peut répondre aux différents sondages en choisissant pour chaque question sa réponse. 
2.7 Billetterie (CRUDS)
Certain événement publique possède une billetterie. 
Un organisateur peut décider de créer 1 ou plusieurs types de billets à sa convenance.  Un type de billet contient : 
- Un nom 
- Un montant 
- Une quantité limité de billet 
- Une personne extérieure peut obtenir 1 seul billet. 

Pour chaque billet acheté, on définira : 
- Un type de billet (ceux créés par l’organisateur) 
- Les données de la personne 
- Nom 
- Prénom 
- Adresse complète 
- Date d’achat 

2.8 Shopping list (CRUDS)
Lors d’un événement si la shopping list est activée, un utilisateur peut indiquer ce qu’il va apporter à l’événement. Pour cela il indique: 
- Un nom 
- Une quantité 
- Une heure d’arrivée à l’événement 
- Chaque chose apporté doit être unique par événement 
3 Covoiturage (CRUDS) (Bonus) 
Lors d’un événement si le covoiturage est activé, un utilisateur peut indiquer qu’il se rendra en voiture à l’événement. Pour cela il indiquera : 
- Un lieu de départ
- Une heure de départ
- Le prix proposé
- Le nombre de place disponible
- Le temps maximum d’écart (ex: sur un trajet de 2h30, 30min, ce qui donne un trajet max de 3H)


Notes Regarding AI use:
ChatGPT (Free Plan) was used to a limited extent to speed up the process. Insufficient time to go in further details given limited time alloted (And that about 1/3 was lost because I had more important things to take care of). For any questions regarding AI use, feel free to reach out via the school account.

Note: I think it's fair use if noted according to school, I never vibe code but not enough time otherwise.